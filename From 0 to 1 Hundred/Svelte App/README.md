# Svelte App

## Setup

The folder is set up with the following series of commands:

1. clone the template repo.

  ```code
  npx degit sveltejs/template "Svelte App"
  ```

1. move to the folder and install the necessary package.

  ```code
  cd "Svalte App"
  npm install
  ```

1. run the development environment.

  ```code
  npm run dev
  ```

The application is developed in the **src** folder, but the **public** folder is also modified, to change the global stylesheet and document title.

## Utils

In `utils.js` I created a utility function to translate numbers into French. I am positive there is a much better way to provide a translation, especially for such a limited range, but the function was an excellent excuse to practice with vanilla JavaScript.

In addition to this function, there exist another method to return a random number in the selected range. This is a trivial addition, but is included to separate the concerns of the application: in `utils.js` you retrieve the numbers and their French translation, whilst in `App.svelte` you highlight the data through a series of elements.

## Svelte Components

The state, or better yet logic of the application is included in the script for `App.svelte`, but the project is divvied up in the following components.

- `Loader.svelte`, responsible for the animation introducing the application.

- `Deck.svelte`, responsible for the card(s) describing a number and the French word matching said number.

- `Controls.svelte`, responsible for the buttons allowing to flip the existing card or add a new one.

