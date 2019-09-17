<script>
  export let cards;

  import { cubicInOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';
  const options = {
    duration: 700,
    easing: cubicInOut,
  }
  function panOut(node, { duration = 700, depth = -200, isFlipped = false }) {
		return {
			duration,
			css: t => {
				return `
					transform: rotateY(${isFlipped ? '-180deg' : '0deg'}) translateZ(${isFlipped ? -depth * (1 - cubicInOut(t)) : depth * (1 - cubicInOut(t))}px);
				`
			}
		};
  }

  function slideIn(node, { duration = 700,  depth = 200 }) {
		return {
      duration,
			css: t => {
        return `
					opacity: ${cubicInOut(t)};
					transform: translateY(-${100 * (1 - cubicInOut(t))}%) translateZ(${depth * (1 - cubicInOut(t))}px);
				`
			}
		};
  }
</script>

<style>
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

  /* absolute position the cards to cover the entirety of the parent's width and height */
  .card {
    padding: 5rem;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    /* transition for the transform properties, to flip and translate the card */
    transition: transform 1s cubic-bezier(0.645, 0.045, 0.355, 1);
    /* preserve the 3d of the deck for the nested faces */
    transform-style: preserve-3d;
  }

  /* absolute position the faces to cover the same surface described by the card */
  .card__front,
  .card__back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* backface to hide the text when the faces are flipped */
    backface-visibility: hidden;

    /* display the content in the center of the card */
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0.25rem;
    border-radius: inherit;
    /* add the background to the faces to fade out the cards by changing the faces' opacity (see below for why the opacity is not changed on the parent card) */
    background: hsl(0, 0%, 100%);
    box-shadow: 0 0 10px -9px hsl(0, 0%, 25%), 0 0 3px -2px hsl(0, 0%, 25%);
  }
  .card__front h1 {
    font-size: 5rem;
  }
  .card__back h2 {
    font-size: 2.25rem;
  }
  /* by default rotate the back of the card */
  .card__back {
    transform: rotateY(180deg);
  }

  /* when the card has an additional class of .flip rotate the entire container (hence showing the back of the card) */
  .card.flip {
    transform: rotateY(-180deg);
  }

</style>

<main class="deck">
  {#each cards as card (card.id)}
    <article in:slideIn out:panOut={{isFlipped: card.isFlipped}} class={card.isFlipped ? 'card flip' : 'card'} bind:this={card.ref}>
        <div out:fly={options} class="card__front">
            <h1>{card.number}</h1>
        </div>
        <div out:fly={options} class="card__back">
            <h2>{card.french}</h2>
        </div>
    </article>
  {/each}
</main>