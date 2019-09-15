# SVG Loader

## Design

Here you find the `svg` syntax drawing the elements of the loader. I developed the design using basic shapes like circles, ellipses and path elements with straightforward syntax. `<use>` elements and negative scales are used to create a copy of existing shapes and create a mirrored version (mirrored from the central point found in `(50, 50)`, thanks to the wrapping group element).