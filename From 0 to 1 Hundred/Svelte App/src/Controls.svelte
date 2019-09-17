<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function flip() {
    dispatch('flip');
  }
  function newCard() {
    dispatch('newCard');
  }
</script>

<style>
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

<section class="controls">
    <button on:click={flip}>Flip</button>
    <button on:click={newCard}>New Card</button>
</section>