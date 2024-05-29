<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Anki Stacks</h1>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else>
      <transition-group name="fade" tag="div" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        <div
            v-for="(item, index) in paginatedItems"
            :key="index"
            class="p-4 border rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
            style="height: 150px;"
        >
          <div class="text-lg font-semibold">{{ item }}</div>
        </div>
      </transition-group>
      <div class="flex justify-center space-x-2 mt-4">
        <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-gray-300 rounded-xl disabled:opacity-50 hover:bg-gray-400 transition-colors"
        >
          Previous
        </button>
        <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-gray-300 rounded-xl disabled:opacity-50 hover:bg-gray-400 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//TODO add stack karte
//TODO edit stack page
//stapel erstellen mit upload
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import Cookies from "js-cookie";
import axiosInstance from "@/router/axiosInstance";

const items = ref<string[]>([]);
const loading = ref<boolean>(true);
const currentPage = ref<number>(1);
const itemsPerPage = 8; // Adjust the number of items per page

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return items.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(items.value.length / itemsPerPage);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

onMounted(async () => {
  try {
    const response = await axiosInstance.get('/posts');
    items.value = response.data.map((post: { title: string }) => post.title);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
