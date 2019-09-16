<script>
  import Card from './Card.svelte';

  export let number;
  export let french;
  export let card;
</script>

<style>
  .deck {
    perspective: 1000px;
    position: relative;
    height: 250px;
    width: 250px;
    border-radius: 20px;
  }
</style>

<main class="deck">
  <Card {card} {number} {french} />
</main>