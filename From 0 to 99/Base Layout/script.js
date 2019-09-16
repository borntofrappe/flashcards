// following a click event on the #flip button target the .card element and toggle the .flip class
// this allows to rotate the card found in the document
const buttonFlipCard = document.querySelector('button#flip');

const flipCard = () => {
  document.querySelector('.card').classList.toggle('flip');
};
buttonFlipCard.addEventListener('click', flipCard);


// following a click event on the #new-card button remove the existing card in favor of a new one
/* ! the flow is experimental and is based on the following classes
.new: hides the card atop the deck
.old: hides the card in the background

by removing .new or adding .old, it is possible to show the current and following card
*/
const buttonNewCard = document.querySelector('button#new-card');

const newCard = () => {
  const previous = document.querySelector('.card');
  previous.classList.add('card--old');

  // create a clone of the node **with** the .new class
  // the idea is to append such a clone and have it hidden by default, as the first card
  const next = document.querySelector('.card--new');
  const copy = next.cloneNode(true);
  next.classList.remove('card--new');

  previous.addEventListener('transitionend', () => {
    previous.parentElement.removeChild(previous);
    next.parentElement.appendChild(copy);
  }, { once: true });
};
buttonNewCard.addEventListener('click', newCard);
