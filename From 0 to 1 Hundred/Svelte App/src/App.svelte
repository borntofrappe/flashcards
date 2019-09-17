<script>
  // import the necessary components and the utility functions used to create the card(s)
  import Loader from './Loader.svelte';
  import Deck from './Deck.svelte';
  import Controls from './Controls.svelte';

  import { randomNumber, frenchNumber } from './utils.js';

  // describe a boolean and a function to display/hide the loader component
  // as the component receives the finish event, the loader is removed in favor of the deck and controls
  let isLoading = true;
  const handleFinish = () => isLoading = false;

  /* function generating a card as an object with the following properties

  number        // content of the card
  french

  isFlipped     // boolean describing whether or not the card should be flipped

  id            // random value to add a key to the different cards
  */
  const newCard = () => {
    const number = randomNumber();
    const french = frenchNumber(number);
    let isFlipped = false;
    let id = Math.random();
    return { number, french, isFlipped, id };
  };

  /* array describing the card(s)
  the idea is to have the array describe only one object at a time
  as the existing one is removed in favor of the new one, the connected elements are swapped with a transition
  */
  let cards = [newCard()];

  // functions responding to the events received from the Controls component
  // to flip the card toggle the boolean of the only element described in the array
  const handleFlip = () => cards[0].isFlipped = !cards[0].isFlipped;
  // to add a new card remove the existing one in favor of a new object
  const handleNewCard = () => cards = [newCard()];
</script>

{#if isLoading}
  <Loader on:finish={handleFinish} />
{:else}
  <Deck {cards} />
  <Controls on:flip={handleFlip} on:newCard={handleNewCard} />
{/if}
