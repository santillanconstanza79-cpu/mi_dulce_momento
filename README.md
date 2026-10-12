# Mi Dulce Momento — sitio web

Sitio estático hecho con HTML, CSS y JavaScript. Está preparado para publicarse en GitHub Pages.

## 1. Abrir en Visual Studio Code

1. Descomprimí `mi_dulce_momento.zip`.
2. Abrí la carpeta `mi_dulce_momento` en Visual Studio Code.
3. Abrí `index.html` en el navegador. También podés usar la extensión Live Server.

## 2. Agregar tus fotos

Reemplazá las imágenes de ejemplo con tus propias fotos. Conservá los nombres para que se muestren automáticamente.

### Imágenes de portada y secciones

Guardalas en `img/`:
- `portada.jpg`
- `alfajor-chocolate-cafe.jpg`
- `nosotros.jpg`

### Imágenes del catálogo

Guardalas en `img/productos/`:
- `alfajor-chocolate-cafe.jpg`
- `alfajor-clasico.jpg`
- `torta-personalizada.jpg`
- `selva-negra.jpg`
- `porcion-dulce.jpg`
- `bizcochuelo.jpg`
- `caja-alfajores.jpg`
- `porcion-torta.jpg`

Si tus imágenes tienen otros nombres, cambiá la ruta correspondiente en `js/script.js` y en `index.html`. Podés usar JPG, PNG o WEBP, pero la extensión del archivo debe coincidir con la ruta del código.

## 3. Personalizar productos y precios

Abrí `js/script.js` y buscá el arreglo `products`. Para cambiar un precio, reemplazá `price: 0` por el precio real, por ejemplo `price: 18000`. Mientras el precio sea 0, el sitio muestra “Consultar precio”.

Podés cambiar nombres, descripciones, categorías e imágenes en el mismo bloque.

## 4. Configurar WhatsApp, Instagram y email

En la parte superior de `js/script.js`, reemplazá:
- `WHATSAPP_NUMBER`: número internacional sin `+`, espacios ni guiones (Argentina suele comenzar con `549`).
- `INSTAGRAM_URL`: enlace de tu perfil.
- `EMAIL_ADDRESS`: correo real del emprendimiento.

Hasta que configures el WhatsApp, el sitio mostrará un aviso al intentar enviar un pedido. El formulario abre WhatsApp con el mensaje preparado; no guarda ni envía datos a un servidor.

## 5. Publicar con GitHub Pages

1. Creá un repositorio en GitHub, por ejemplo `mi-dulce-momento`.
2. Subí **el contenido de esta carpeta**, no el ZIP. `index.html` debe quedar en la raíz del repositorio.
3. Entrá a **Settings → Pages**.
4. En **Build and deployment**, elegí **Deploy from a branch**.
5. Seleccioná la rama `main` y la carpeta `/ (root)`, y guardá.
6. Esperá a que GitHub publique el sitio y usá la URL que aparece en la sección Pages.

GitHub Pages puede tardar varios minutos en publicar los cambios. Todo lo que publiques en el sitio será visible en internet, así que no subas datos privados ni contraseñas.

## Nota

Esta es una primera versión funcional con contenido de ejemplo y espacios para tus fotos reales. Antes de publicar, revisá los textos, precios, imágenes y datos de contacto.
