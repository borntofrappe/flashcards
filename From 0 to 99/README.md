# From 0 to 99

## [SVG Loader](https://codepen.io/borntofrappe/full/RwbBywm)

Here you find the syntax used to create the loader introducing the application. It builds on a concept I [developed first with CSS](https://codepen.io/borntofrappe/pen/yxExMw) and [then refined with SVG](https://codepen.io/borntofrappe/pen/dybJxMv).

A couple of things I'd like to mention with regard to this loader:

- the details of the graphic are added through semi-transparent shapes. This means you can change the main color and still retain the eyes, brows, mouth and cheeks. Not every color is perfect match, but as long as you consider the lightness of the chosen color, this makes it possible to use multiple hues.

- the animation is built with keyframes and using only `transform` and `opacity`. Originally, I decided to use these two properties for performance reason, but truthfully, it became as much of a challenge to see what is possible with a very limited subset of properties.