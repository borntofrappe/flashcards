<script>
  // fire the finish event following the animationend directive
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  const dispatch = createEventDispatcher();

  function finish() {
    dispatch('finish');
  }
</script>

<style>
  /* container for the svg elements absolute positioning the elements in the center of the viewport
  this to avoid a pesky jump as the components are included _before_ the transition is complete
  */
  .loader {
    color: hsl(195, 100%, 60%);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  /* separate the loader from the progress underneath */
  svg#loader {
    width: 180px;
    height: auto;
    display: block;
    margin-bottom: 1.5rem;
  }
  svg#progress {
    width: 250px;
    height: auto;
    display: block;
  }

  /* main animation
  animate the group elements for the rocking animation
  ! the rotation  and translation need to occur simultaneously to move the shapes from one side to the other in an arc
  */
  .rotate {
    transform: rotate(0deg); /* 40 - -40 range */
    animation: rotate 7.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  #translate {
    transform: translateY(0px); /* 0 - 15 range */
    animation: translate 7.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  @keyframes rotate {
    5% {
      transform: rotate(60deg);
    }
    100% {
      transform: rotate(-60deg);
    }
  }
  @keyframes translate {
    5%,
    95% {
      transform: translateY(12px);
    }
    100% {
      transform: translateY(0);
    }
  }

  /* support animation
  animate the shapes inside the loader for the smiling animation
  */
  #face {
    transform: scaleY(1); /* 0.7 - 1 range */
    animation: scaleFace 7.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  #mouth,
  #cheek {
    transform: scale(1); /* 0.5 - 1 range */
    animation: scaleGrin 7.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  @keyframes scaleFace {
    5% {
      transform: scale(0.7);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes scaleGrin {
    5% {
      transform: scale(0.5);
    }
    100% {
      transform: scale(1);
    }
  }

  /* closing animation
  animate the use elements to briefly show the particles
  */
  .particle {
    transform: translateY(0px) scale(1); /* translate from 5px, scale from 0 */
    animation: sparkle 1.25s cubic-bezier(0.68, -0.55, 0.265, 1.55) both;
    animation-delay: 6.8s;
  }
  /* stagger the animation of the other two particles */
  #particles g:nth-of-type(1) .particle {
    animation-delay: 6.86s;
  }
  #particles g:nth-of-type(2) .particle {
    animation-delay: 6.92s;
  }

  @keyframes sparkle {
    0% {
      transform: translateY(15px) scale(0);
      opacity: 0;
    }
    20% {
      opacity: 0;
    }
    90% {
      opacity: 1;
      transform: translateY(-5px) scale(1);
    }
    100% {
      transform: translateY(0px) scale(1);
      opacity: 0;
    }
  }

  /* secondary animation
  animate the clipped bar to show the makeshift progress bar
  */
  #clip-bar {
    transform: translateX(-120px);
    animation: translateClip 7.5s cubic-bezier(0.445, 0.05, 0.55, 0.95) forwards;
  }
  @keyframes translateClip {
    100% {
      transform: translateX(0);
    }
  }

</style>

<!-- fade out the svg elements following a brief delay
larger delay for the first svg to have the graphic finish its animation (the dispatching function occurs following the first instance of the event)
-->
<section class="loader" on:animationend|once={finish}>
  <svg out:fly={{delay: 700}} id="loader" viewBox="0 0 100 100" width="180" height="180">
      <!-- define a path element for the individual particle
      this to have control of the individual particles through use elements
      -->
      <defs>
          <path id="particle" d="M -3 0 a 3 3 0 0 0 3 -3 a 3 3 0 0 0 3 3 a 3 3 0 0 0 -3 3 a 3 3 0 0 0 -3 -3" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
      </defs>
      <!-- center the shapes in the viewBox -->
      <g transform="translate(50 50)">
          <!-- particles -->
          <g fill="currentColor">
              <g id="particles" transform="translate(35 -30)">
                  <!-- translate and scale the particles from the center of the path element
                  ! since the scaling occurs through the transform property, wrap the particles in a group element to position/rescale the shapes (to have particles of different size)
                  -->
                  <use class="particle" href="#particle"></use>
                  <g transform="translate(-5 8) scale(0.6)">
                      <use class="particle" href="#particle"></use>
                  </g>
                  <g transform="translate(3 9) scale(0.8)">
                      <use class="particle" href="#particle"></use>
                  </g>
              </g>
              <!-- copy the three particles on the opposite (left) side of the graphic -->
              <use href="#particles" transform="scale(-1 1) translate(0 -10)"></use>
          </g>

          <circle cx="0" cy="0" r="35" fill="currentColor"></circle>

          <!-- wrap the details in group elements to achieve the rotation from one side to the other
          the idea is to
              1. rotate the group
              2. translate the element in the new direction
              3. rotate the group back

              to use the same rotation in step 1) and 3) use a group element which flips the graphic around the y axis
              you could add another group post-rotation to flip the graphic backwards, but it is unnecessary given the symmetry of the details
          -->
          <g class="rotate" transform="rotate(0)">
              <g id="translate" transform="translate(0 0)">
                  <g transform="scale(-1 1)">
                      <g class="rotate" transform="rotate(0)">
                          <!-- details with semi-transparent shapes
                          this allows for a variety of colors (the quality of the details depends on the lightness/darkness of the hue)
                          -->
                          <g opacity="0.3">
                              <!-- dark variants for the brows, eyes and mouth -->
                              <g fill="hsl(0, 0%, 0%)">
                                  <!-- scale the eyes and brows from a point below the shapes (to get them closer to the mouth underneath) -->
                                  <g transform="translate(0 10)">
                                      <g id="face">
                                          <path id="brow" d="M -10.5 -25 a 2.5 2.5 0 0 1 5 0 a 4 4 0 0 0 -5 0" stroke="hsl(0, 0%, 0%)" stroke-width="1" stroke-linejoin="round" stroke-linecap="round"></path>
                                          <use href="#brow" transform="scale(-1 1)"></use>
                                          <g>
                                              <ellipse id="eye" cx="-8" cy="-12" rx="4" ry="8"></ellipse>
                                              <use href="#eye" transform="scale(-1 1)"></use>
                                          </g>
                                      </g>
                                  </g>

                                  <!-- scale the mouth from the bottom center of the path -->
                                  <g transform="translate(0 18)">
                                      <path id="mouth" d="M 0 0 a 7 7 0 0 0 7 -7 h -14 a 7 7 0 0 0 7 7" stroke="hsl(0, 0%, 0%)" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"></path>
                                  </g>
                              </g>
                              <!-- light variants for the cheeks -->
                              <g fill="hsl(0, 0%, 100%)">
                                  <!-- scale the cheek from the bottom of the ellipse
                                  horizontally shift the shape to have the scale push the cheeks closer to the center of the face
                                      -->
                                  <g id="cheek-container" transform="translate(-7 10)">
                                      <ellipse id="cheek" cx="-10" cy="-4" rx="4" ry="3.5"></ellipse>
                                  </g>
                                  <use href="#cheek-container" transform="scale(-1 1)"></use>
                              </g>
                          </g>
                      </g>
                  </g>
              </g>
          </g>
      </g>
  </svg>

  <!-- svg fabricating a makeshift progress bar -->
  <svg out:fly={{delay: 200}} id="progress" viewBox="0 0 120 10" width="240" height="20">
      <defs>
          <!-- define a bar to re-use the shape in the clip and in multiple colors -->
          <rect id="bar" rx="5" x="0" y="0" width="120" height="10"></rect>
          <clipPath id="clip">
              <use  href="#bar"></use>
          </clipPath>
      </defs>
      <!-- include two copies of the progress bar, one of which clipped to be hidden by default -->
      <g fill="currentColor">
          <use href="#bar" opacity="0.3"></use>
          <!-- translate the use element to 0 to show the colored variant -->
          <g clip-path="url(#clip)">
              <use id="clip-bar" transform="translate(-120 0)" href="#bar"></use>
          </g>
      </g>
  </svg>
</section>