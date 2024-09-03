<script setup>
import {ref} from "vue"

const props = defineProps({
    id:{
        value: Number
    }
})

addEventListener("resize", (event) => {
    currentSlide.value = 1
});

let currentSlide = ref(1)

function nextSlide(){
    if(currentSlide.value<3){
        currentSlide.value+=1
    }
}

function previousSlide(){
    if(currentSlide.value>1){
        currentSlide.value-=1
    }
}


</script>

<template>
    <div class="slide-controls">
      <div class="slide-text">
        <p> {{ currentSlide }} of 3 </p>
      </div>
      <div class="slide-buttons">
        <button class="previous-image" @click="$emit('previousSlide', props.id); previousSlide()">
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 11.0001L1.7071 6.70718C1.31658 6.31665 1.31658 5.68349 1.70711 5.29297L6 1.00012" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <button class="next-image" @click="$emit('nextSlide', props.id); nextSlide()">
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 0.999878L7.2929 5.29282C7.68342 5.68335 7.68342 6.31651 7.29289 6.70703L3 10.9999" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>
</template>

<style lang="scss">
.slide-controls {
  display: flex;
  gap: 10px;

  p {
    margin: 0.5rem;
  }

  .slide-buttons {
    display: flex;
  }

  button {
    height: 32px;
  }
}

.previous-image,
.next-image {
  display: block;
  background: #3f3a50;
  color: white;
  border-radius: 8px;
  z-index: 99;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 3px 13px 5px;
  font-size: 1em;
  font-weight: bold;
}
</style>