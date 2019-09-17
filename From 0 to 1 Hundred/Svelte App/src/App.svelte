<script>
  import { randomNumber, frenchNumber } from './utils.js';

  import Deck from './Deck.svelte';
  import Controls from './Controls.svelte';

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

<Deck {cards} />
<Controls on:flip={handleFlip} on:newCard={handleNewCard} />