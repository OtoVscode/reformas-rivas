/* Menú móvil del header */
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("menu-principal");
  var desktop = window.matchMedia("(min-width: 48rem)");

  if (!header || !toggle || !nav) {
    return;
  }

  function isOpen() {
    return header.getAttribute("data-menu") === "open";
  }

  function setMenu(open) {
    header.setAttribute("data-menu", open ? "open" : "closed");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  }

  toggle.addEventListener("click", function () {
    setMenu(!isOpen());
  });

  /* Al elegir un enlace, el menú se cierra */
  nav.addEventListener("click", function (event) {
    if (event.target.closest("a") && isOpen()) {
      setMenu(false);
    }
  });

  /* Clic o toque fuera del header */
  document.addEventListener("click", function (event) {
    if (isOpen() && !header.contains(event.target)) {
      setMenu(false);
    }
  });

  /* Tecla Escape: cierra y devuelve el foco al botón */
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && isOpen()) {
      setMenu(false);
      toggle.focus();
    }
  });

  /* Al pasar a escritorio, el panel móvil se cierra */
  function handleBreakpoint() {
    if (desktop.matches && isOpen()) {
      setMenu(false);
    }
  }

  if (typeof desktop.addEventListener === "function") {
    desktop.addEventListener("change", handleBreakpoint);
  } else if (typeof desktop.addListener === "function") {
    desktop.addListener(handleBreakpoint);
  }
})();

/* Formulario de contacto: envía los leads por email con Web3Forms.
   Sin JavaScript el formulario también funciona (envío normal a Web3Forms). */
(function () {
  "use strict";

  var form = document.querySelector(".contact-form[data-web3forms]");

  if (!form || typeof window.fetch !== "function" || typeof window.FormData !== "function") {
    return;
  }

  var status = form.querySelector(".contact-form__status");
  var submit = form.querySelector('button[type="submit"]');
  var submitLabel = submit ? submit.textContent : "";
  var accessKey = form.querySelector('input[name="access_key"]');

  function showStatus(message, isError) {
    if (!status) {
      return;
    }
    status.hidden = false;
    status.textContent = message;
    status.classList.toggle("is-error", Boolean(isError));
  }

  function setSending(sending) {
    if (!submit) {
      return;
    }
    submit.disabled = sending;
    submit.textContent = sending ? "Enviando…" : submitLabel;
    form.setAttribute("aria-busy", sending ? "true" : "false");
  }

  /* El navegador valida los campos obligatorios antes de llegar aquí */
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    /* Mientras no se pegue la clave real no se envía nada */
    if (!accessKey || !accessKey.value || accessKey.value.indexOf("TU_ACCESS_KEY") === 0) {
      showStatus("El formulario aún no está activado: falta poner la Access Key de Web3Forms. Mientras tanto, escríbenos por WhatsApp o llámanos.", true);
      return;
    }

    setSending(true);
    showStatus("Enviando tu solicitud…", false);

    fetch(form.action, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form)
    })
      .then(function (response) {
        return response.json().then(function (data) {
          return { ok: response.ok, data: data };
        });
      })
      .then(function (result) {
        if (result.ok && result.data && result.data.success) {
          form.reset();
          showStatus("¡Gracias! Hemos recibido tu solicitud y te llamaremos en menos de 24 horas.", false);
        } else {
          showStatus("No pudimos enviar tu solicitud. Inténtalo de nuevo o escríbenos por WhatsApp.", true);
        }
      })
      .catch(function () {
        showStatus("Parece que no hay conexión. Revisa tu internet e inténtalo de nuevo, o escríbenos por WhatsApp.", true);
      })
      .then(function () {
        setSending(false);
      });
  });
})();
