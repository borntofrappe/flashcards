<script>
import { translateNumber } from './utils.js';

let number = 10;
let translation;

const addNumber = () => number = Math.floor(Math.random() * 101);
const translate = () => translation = translateNumber(number);
</script>

<button on:click={addNumber}>New number</button>
{#if number}
  <p>{number}</p>
{/if}
<button on:click={translate}>Translate</button>
{#if translation}
  <p>{translation}</p>
{/if}