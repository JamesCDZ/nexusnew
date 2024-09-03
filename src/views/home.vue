<script setup>
import { onMounted } from 'vue';
import { useCarStore } from '@/stores/CarStore';
import valueYourCar from '../components/valueYourCar.vue';
import CarItem from "@/components/carItem/CarItem.vue";

const carStore = useCarStore();

onMounted(() => {
  carStore.fetchCarData();
});
</script>

<template>


    <div class="header">
      <div class="item item-1">   <div class="car-count">
        <div class="car-count-mobile">
          Showing {{ carStore.paginatedCars.length }} of {{ carStore.carCount }} cars
        </div>
        <!-- Desktop View: Showing Total Y cars -->
        <div class="car-count-desktop">
          Total {{ carStore.carCount }} cars
        </div>
      </div></div>
      <div class="item item-2">    <div class="filter-buttons">
        <button
            :class="{ active: carStore.selectedClassification === 'all' }"
            @click="carStore.selectedClassification = 'all'">
          All
        </button>
        <button
            :class="{ active: carStore.selectedClassification === 'used' }"
            @click="carStore.selectedClassification = 'used'">
          Used
        </button>
        <button
            :class="{ active: carStore.selectedClassification === 'new' }"
            @click="carStore.selectedClassification = 'new'">
          New
        </button>
      </div></div>
      <div class="item item-3">   <div class="sort-dropdown">
        <label for="sortOrder"></label>
        <select v-model="carStore.selectedSortOrder" id="sortOrder" @change="carStore.setSortOrder($event.target.value)">
          <option value="low-to-high">Lowest price</option>
          <option value="high-to-low">Highest price</option>
        </select>
      </div>
      </div>
    </div>


  <div class="container">
    <div class="cars">
      <template v-for="(car, index) in carStore.paginatedCars" :key="index">
        <template v-if="index == 4">
          <div class="information-container">
            <valueYourCar />
          </div>
        </template>
        <CarItem :car="car" :index="index"/>
      </template>
    </div>
    <!-- Pagination Controls: Only show if there's more than one page -->
    <div v-if="carStore.totalPages > 1" class="pagination">
      <button @click="carStore.changePage(1)" :disabled="carStore.currentPage === 1">
        &laquo;&laquo;
      </button>
      <button @click="carStore.changePage(carStore.currentPage - 1)" :disabled="carStore.currentPage === 1">
        &laquo;
      </button>
      <template v-for="page in carStore.totalPages" :key="page">
        <button
            :class="{ active: page === carStore.currentPage }"
            @click="carStore.changePage(page)">
          {{ page }}
        </button>
      </template>
      <button @click="carStore.changePage(carStore.currentPage + 1)" :disabled="carStore.currentPage === carStore.totalPages">
        &raquo;
      </button>
      <button @click="carStore.changePage(carStore.totalPages)" :disabled="carStore.currentPage === carStore.totalPages">
        &raquo;&raquo;
      </button>
    </div>
  </div>
</template>


<style lang="scss">
$breakpoint-desktop: 1500px;
$breakpoint-tablet: 670px;


@font-face {
  font-family: 'SF Pro Text';
  src: local('SF Pro Text');
}

body {
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.filter-buttons {
  display: flex;
  gap: 10px;
  justify-content: space-between;
}

.filter-buttons button {
  flex: 1;
  padding: 8px 0;
  font-size: 16px;
  cursor: pointer;
  background-color: #fff;
  border: none;
  border-bottom: 3px solid transparent;
  color: #000;
  text-align: center;
  font-weight: 400;
}

.filter-buttons button.active {
  border-bottom: 3px solid #7572FF;
}

@media (min-width: $breakpoint-tablet) {
  .filter-buttons button {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 12px;
    color: #606266;
    padding: 8px 25px;
    transition: background-color 0.3s, border-color 0.3s;
  }

  .filter-buttons button.active {
    background-color: #7572FF;
    color: white;
    border-color: #7572FF;
    border-radius: 12px;
    border-bottom: none;
  }
}

/* Pagination Styles */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 5px;

  button {
    padding: 8px 16px;
    font-size: 16px;
    cursor: pointer;
    border: 1px solid #dcdfe6;
    background-color: #fff;
    border-radius: 8px;
    color: #606266;
    transition: background-color 0.3s, color 0.3s;

    &:hover:not(:disabled) {
      background-color: #e4e7ed;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &.active {
      background-color: #7572ff;
      color: #fff;
      border-color: #7572ff;
    }
  }

  button:first-child,
  button:last-child {
    padding-left: 12px;
    padding-right: 12px;
  }
}

.sort-dropdown {
  position: relative;
  display: inline-block;

  select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border-radius: 8px;
    padding: 10px 40px 10px 15px;
    font-size: 16px;
    color: #4A4A4A;
    cursor: pointer;
    height: 50px;
    width: 160px;
    border: 0;
  }

  @media (min-width: $breakpoint-tablet) {
    select {
      background-color: #f7f8fa;
      border: 1px solid #dcdfe6;
      padding: 10px 40px 10px 15px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
  }
  select:focus {
    outline: none;
    border-color: #a0a0a0;
  }

  &::after {
    content: '▾';
    font-size: 12px;
    color: #000;
    position: absolute;
    top: 50%;
    right: 15px;
    pointer-events: none;
    transform: translateY(-50%);
  }
}

body {
  margin: 0;
}

.car-count-desktop {
  display: none;
}

.car-count-mobile {
  display: block;
}

// Desktop styles
@media (min-width: $breakpoint-tablet) {
  .car-count-desktop {
    display: block;
  }
  .car-count-mobile {
    display: none;
  }
}

.header {
  display: flex;
  flex-wrap: wrap;
}

.item {
  flex: 1 1 30%;
  align-self: center;
}

.item-1 {
  order: 1;
}

.item-2 {
  order: 2;
}

.item-3 {
  order: 3;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

@media (max-width: $breakpoint-tablet) {
  .item-1 {
    order: 2;
    flex: 1 1 50%;
  }

  .item-2 {
    order: 1;
    flex: 1 1 100%;
  }

  .item-3 {
    order: 3;
    flex: 1 1 50%;
  }
}

@media (min-width: 1025px) {
  .container {
    justify-content: space-between;
  }

  .item-1,
  .item-2 {
    flex: 0 1 11%;
  }

  .item-3 {
    flex: 1 1 50%;
  }
}

.car-count {
  font-size: 18px;
  margin-right: 20px;
  display: inline-block;
  vertical-align: middle;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0px 10px 10px 0;
  li {
    float: left;
    padding: 2px 5px 2px 0px;
  }
  li + li:nth-child(even)::before {
    content: " | ";
  }
}

.image {
  position: relative;
}

.slide-controls {
  display: none;
}

h1,
h2,
h3,
h4,
h5 {
  margin: 0rem;
  font-family: "San Francisco";
  line-height: 1.3;
  font-weight: 400;
}

h1 {
  margin-top: 0;
  font-size: 1.383rem;
}

h2 {
  font-size: 1.067rem;
  font-weight: 700;

  span {
    font-weight: normal;
  }
}

h3 {
  font-size: 1.267rem;
  margin: 0;
  span {
    display: none;
  }
}

h4 {
  margin: 0;
}

p {
  font-size: 1rem;
}

.separator {
  font-size: 1rem;
}

.financeTagline {
  margin: 0.2rem 0;
}

.content-bottom,
.content-top {
  display: flex;
}

.car-details {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  .sub-title {
    color: rgb(85, 89, 93);
  }
}

.detail-pills {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  color: rgb(85, 89, 93);
  max-width: 50%;

  p {
    margin: 0;
  }
}

.cta-container {
  display: none;
}

.card {
  position: relative;
  font-family: "San Francisco";
}

.sideBar {
  display: none;
}

.car-container,
.information-container {
  margin: 0 0 0.1rem 0.3rem;
}

img {
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  width: 100%;
  border-radius: 9px;
}

.container {
  max-width: 1950px;
  margin-left: auto;
  margin-right: auto;
  overflow-x: hidden;
}

.image-container {
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  gap: 9px;
}

.image-container:after {
  content: "";
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: linear-gradient(
          to right,
          rgba(255, 255, 255, 0),
          rgb(255, 255, 255) 99rem
  );
  width: 100%;
  height: 100%;
}

.image-item {
  position: relative;
  min-width: 35%;
  box-sizing: border-box;
  left: 0;
}

.pill {
  background: #3f3a50;
  color: white;
  border-radius: 8px;
  z-index: 99;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1px 10px 1px 10px;
}

.bottomTabs {
  display: none;
}

.featured-information {
  position: relative;
  top: 0;

  .featured-pill {
    position: absolute;
    font-size: 12px;
    line-height: 18px;
    background: #3f3a50;
    color: white;
    border-radius: 8px;
    z-index: 99;
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 3px 10px 2px 10px;
    right: 3rem;
    margin-top: 0.6rem;
  }
}

.vehicle-information {
  padding: 8px 0px 0px 0px;
}

.content {
  position: relative;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  padding: 10px 0px 10px 0px;
  margin: 0 0.8rem;
}

@media (min-width: $breakpoint-tablet) {
  ul {
    display: flex;
    gap: 2px;

    li {
      background: #3f3a50;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 1px 5px 1px 5px;
      font-size: 12px;
    }
    li + li:nth-child(even)::before {
      content: "";
    }
  }

  h2 {
    font-size: 1.296rem;
  }

  h3 {
    span {
      display: block;
      white-space: pre-wrap;
      word-wrap: break-word;
      display: inline;
    }
  }

  .content {
    margin: 0;
    gap: 1rem;
  }

  .value-your-car {
    background: rgba(246, 247, 251, 1);
    border: 1px solid rgba(209, 214, 224, 1);
    display: block;
    text-align: center;

    .title {
      font-size: 32px;
    }
  }

  .featured-information {
    position: absolute;
    top: 0px;
    left: 10px;
    display: flex;

    .featured-pill {
      position: relative;
      font-size: 16px;
      line-height: 27px;
      right: 0rem;
      font-weight: 700;
    }
  }

  .bottomTabs {
    left: 10px;
    position: absolute;
    display: block;
    bottom: 0;
  }

  .detail-pills {
    display: block;
    top: -2.4rem;
    color: white;
    position: absolute;
    max-width: 100%;
  }

  .viewButton {
    background-color: #7572ff;
    border-radius: 16px;
    color: white;
    border: 0;
    line-height: 28px;
    font-family: "Overpass", sans-serif;
    height: 3rem;
    padding: 0px 0px 0px 0px;
    width: 6rem;
    margin: 0.9rem 0px;
    font-weight: 600;
    font-size: 16px;
  }

  .cta-container {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .image-container:after {
    content: none;
  }

  .image-container {
    position: relative;
    gap: 0px;
    overflow: hidden;
  }

  .cars {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    gap: 15px;
    justify-content: center;
  }

  .container {
    padding: 0 2% 0 2%;
  }

  .vehicle-information {
    padding: 0% 3% 0%;
  }

  img {
    border-radius: 16px 16px 0px 0px;
  }

  .image-item {
    position: relative;
    box-sizing: border-box;
    left: 0;
    min-width: 100%;
  }

  .car-container,
  .information-container {
    width: 45%;
    margin: 0;
    .card {
      width: 100%;
      position: relative;
      -webkit-box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.15);
      -moz-box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.15);
      box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.15);
      transition-duration: 0.1s;
      transition-property: box-shadow, transform;
      min-height: 100%;
      border-radius: 16px 16px 16px 16px;
    }

    .card:hover {
      -webkit-box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.3);
      -moz-box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.3);
      box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.3);
    }
  }
}

@media (min-width: $breakpoint-desktop) {
  ul {
    gap: 5px;
    margin: 0px 10px 10px 0;
    li {
      border-radius: 8px;
      padding: 2px 10px;
      font-size: 15px;
    }
  }

  .header {
    padding: 1% 2%;
    display: flex;
  }

  .image-container {
    gap: 0px;
  }

  .card:hover {
    cursor: pointer;

    .slide-controls {
      display: flex;
      position: absolute;
      color: white;
      right: 0;
      top: 0;
      margin: 16px;
    }

    .cta-container {
      display: block;
    }
  }

  .sideBar {
    width: 28%;
    display: block;
  }

  .car-container,
  .information-container {
    width: 32%;
    margin-right: 0;
    box-sizing: border-box;
  }

  .cars {
    justify-content: start;
  }
}
</style>
