import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useCarStore = defineStore('carStore', () => {
    const cars = ref([]);
    const selectedClassification = ref('all');
    const selectedSortOrder = ref('low-to-high');
    const currentPage = ref(1);
    const itemsPerPage = ref(10); 

    async function fetchCarData() {
        try {
            const response = await axios.get('https://m6zhmj6dggvrmepfanilteq4q40rlalu.lambda-url.eu-west-1.on.aws/vehicles');
            cars.value = response.data.data;
        } catch (error) {
            console.error('Error fetching car data:', error);
        }
    }

    const filteredCars = computed(() => {
        let result = cars.value;

        if (selectedClassification.value !== 'all') {
            result = result.filter(car => car.advert_classification.toLowerCase() === selectedClassification.value);
        }

        result = result.slice().sort((a, b) => {
            const priceA = parseFloat(a.price);
            const priceB = parseFloat(b.price);

            if (selectedSortOrder.value === 'low-to-high') {
                return priceA - priceB;
            } else {
                return priceB - priceA;
            }
        });

        return result;
    });

    const totalPages = computed(() => {
        return Math.ceil(filteredCars.value.length / itemsPerPage.value);
    });

    const paginatedCars = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage.value;
        const end = start + itemsPerPage.value;
        return filteredCars.value.slice(start, end);
    });

    const carCount = computed(() => filteredCars.value.length);

    function changePage(page) {
        if (page > 0 && page <= totalPages.value) {
            currentPage.value = page;
        }
    }

    function setClassification(classification) {
        selectedClassification.value = classification;
        currentPage.value = 1;
    }

    function setSortOrder(order) {
        selectedSortOrder.value = order;
        currentPage.value = 1; 
    }

    return {
        cars,
        selectedClassification,
        selectedSortOrder,
        currentPage,
        itemsPerPage,
        fetchCarData,
        filteredCars,
        paginatedCars,
        carCount,
        totalPages,
        changePage,
        setClassification,
        setSortOrder,
    };
});
