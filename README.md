# Reformas Rivas — Landing page

Landing page de una empresa de remodelación (cocinas, baños y reformas integrales). Está hecha con HTML, CSS y JavaScript sin frameworks.

## Secciones

1. Header fijo con menú para móvil.
2. Hero con foto.
3. Métricas de confianza.
4. Servicios.
5. Galería de trabajos.
6. Proceso de 4 pasos.
7. Opiniones (pendiente).
8. Contacto con WhatsApp, teléfono y formulario.
9. Footer.

## Archivos

- `index.html`: estructura, textos, SEO y etiquetas OpenGraph.
- `styles.css`: estilos. Los colores y espacios están en las variables de `:root`.
- `script.js`: menú móvil y envío del formulario con Web3Forms.

## Antes de publicar con el cliente

1. **Formulario:** crea una Access Key gratis en [web3forms.com](https://web3forms.com) con el email del cliente y pégala en lugar de `TU_ACCESS_KEY_DE_WEB3FORMS` en `index.html`.
2. **Teléfono y WhatsApp:** cambia `1234567890` por el número real. En los enlaces va con el código de país, sin espacios ni `+` (por ejemplo `34612345678`). Cambia también el número que se ve en el footer.
3. **Datos de ejemplo:** revisa las zonas de servicio, el horario y las cifras de las métricas.
4. **Fotos:** ahora son fotos de muestra de Unsplash. Sustitúyelas por fotos reales de obras del cliente.
5. **Dominio:** cuando exista, añade `og:url` y `<link rel="canonical">` en el `<head>`.

## Ver en local

```bash
python -m http.server 8772
```

Luego abre http://localhost:8772.
