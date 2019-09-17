<script>
  import { randomNumber, frenchNumber } from './utils.js';

  import Card from './Card.svelte';

  let cards = Array(1).fill().map(() => {
    const number = randomNumber();
    const french = frenchNumber(number);
    let ref;
    let isFlipped = false;
    let id = Math.random()
    return { number, french, ref, isFlipped, id };
  })


  const flipCard = () => cards[0].isFlipped = !cards[0].isFlipped;

  const newCard = () => {
    const number = randomNumber();
    const french = frenchNumber(number);
    let ref;
    let isFlipped = false;
    let id = Math.random()
    cards = [...cards.slice(1), {
      number,
      french,
      ref,
      isFlipped,
      id
    }];
  };

  $: console.log(cards);
</script>

<style>
  /* display the elements in a column, centered in the viewport */
  .flashcards {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  /* add perspective to the deck, to allow 3d transform properties in the nested elements
  on top of the perspective style the .deck container to have a width width and height
  */
  .deck {
    perspective: 1000px;
    position: relative;
    height: 250px;
    width: 250px;
    border-radius: 20px;
  }

  /* display the buttons in a row with a minimum width close to the deck's own size */
  .controls {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    min-width: 200px;
  }
  .controls button + button {
    margin-top: 1rem;
  }
  button {
    box-shadow: 0 1px 5px -3px hsl(0, 0%, 25%);
    flex-grow: 1;
    background: none;
    border: none;
    padding: 0.75rem 1rem;
    border-radius: 20px;
    background: hsl(0, 0%, 100%);
    font-family: inherit;
  }


</style>

<div class="flashcards">
  <main class="deck">
    {#each cards as card (card.id)}
      <Card {...card} />
    {/each}
  </main>

  <section class="controls">
      <button on:click={flipCard}>Flip</button>
      <button on:click={newCard}>New Card</button>
  </section>
</div>