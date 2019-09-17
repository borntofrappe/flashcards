<script>
  import Loader from './Loader.svelte';
  import Deck from './Deck.svelte';
  import Controls from './Controls.svelte';

  import { randomNumber, frenchNumber } from './utils.js';


  let isLoading = true;
  const handleFinish = () => isLoading = false;

  const newCard = () => {
    const number = randomNumber();
    const french = frenchNumber(number);
    let ref;
    let isFlipped = false;
    let id = Math.random();
    return { number, french, ref, isFlipped, id };
  };

  let cards = Array(1).fill().map(() => newCard())

  const handleFlip = () => cards[0].isFlipped = !cards[0].isFlipped;
  const handleNewCard = () => cards = [...cards.slice(1), newCard()];
</script>

{#if isLoading}
  <Loader on:finish={handleFinish} />
{:else}
  <Deck {cards} />
  <Controls on:flip={handleFlip} on:newCard={handleNewCard} />
{/if}
