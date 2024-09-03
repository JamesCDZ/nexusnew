<script setup>

import slideControls from './slideControls.vue';

const props = defineProps({
      car:{
        value: Array
      },
      index:{
        value: Number
      }
    })

// Functions for card slideshows
function nextSlide(index) {
  const scrollableElement = document.getElementById("scrollable-" + index);
  const imageWidth = scrollableElement.clientWidth;
  scrollableElement.scrollLeft += imageWidth;
}

function previousSlide(index) {
  const scrollableElement = document.getElementById("scrollable-" + index);
  const imageWidth = scrollableElement.offsetWidth;
  scrollableElement.scrollLeft -= imageWidth;
}

// Reset slideshows when page is resized
addEventListener("resize", () => {
  let slideShows = document.getElementsByClassName("image-container");
  for (const SlideShow of slideShows) {
    SlideShow.scrollLeft = 0;
  }
});
</script>

<template>
  <div class="car-container">
  <article class="card">
    <!-- Image section -->
    <div class="image">
      <a :href="`#${car.make}`" :title="`View this ${car.advert_classification} ${car.plate } ${ car.make }. £550 per month`">
        <div class="image-container" :id="`scrollable-${index}`">
          <template v-for="(image, id) in car.media_urls" :key="image">
            <template v-if="id < 3">
              <div class="image-item" :id="`${index}-${id}`">
                <img :src="image.large" width="200" height="100" loading="eager">
              </div>
            </template>
          </template>
        </div>
      </a>
      <!-- Imports the slideshow controls -->
      <slideControls @next-slide="nextSlide" @previous-slide="previousSlide" :id="index" />
    </div>
    <!-- Featured pill : Main pill displayed at the top left of card on desktop -->
    <div class="vehicle-information">
      <div class="featured-information">
        <p class="featured-pill">{{ $filters.capitalise(car.advert_classification) }} </p>
      </div>
      <!-- Car information section -->
      <div class="content">
        <!-- Top half of the content box -->
        <div class="content-top">
          <div class="car-details">
            <h3>{{ car.plate }} {{ car.make }}</h3>
            <h4 class="sub-title">{{ car.derivative }}</h4>
          </div>
          <!-- Importing the star icon -->
          <div>
            <favouriteIcon />
          </div>
        </div>
        <!-- Bottom half of the content box -->
        <div class="content-bottom">
          <div class="detail-pills">
            <ul>
              <li>{{Math.round(car.odometer_value/1000)}}k {{ car.odometer_units }}</li>
              <li>{{ car.fuel_type }}</li>
              <li>{{ $filters.capitalise(car.transmission) }}</li>
              <li>{{ car.body_type }}</li>
            </ul>
          </div>
          <div class="price-container">
            <h2>£550.90 <span> /mo (PCP)</span>
            </h2>
            <h4 class="financeTagline">£{{car.price}} <span> Calculate</span>
            </h4>
          </div>
          <div class="cta-container">
            <button class="viewButton">View</button>
          </div>
        </div>
      </div>
    </div>
    </article>
</div>
</template>

