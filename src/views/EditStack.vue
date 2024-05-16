<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Bearbeiten Sie den Stapel</h1>
    <div v-if="loading" class="text-center">Laden...</div>
    <div v-else class="flex flex-col lg:flex-row">
      <div class="card-list-container relative flex-1 mb-4 lg:mb-0 lg:mr-4">
        <div class="card-list overflow-y-auto h-96 lg:h-full mt-4 mb-4 lg:mt-0 lg:mb-0">
          <div v-for="(card, index) in cards" :key="card.uuid" class="mb-3.5 p-4 border rounded-lg shadow-md flex items-center snap-start min-h-[3rem]">
            <div class="flex-1">
              <label for="front" class="block text-sm font-medium text-gray-700">Vorderseite</label>
              <textarea
                  :id="'front-' + card.uuid"
                  v-model="card.front"
                  rows="1"
                  @input="autoResize($event)"
                  @blur="updateCard(card)"
                  class="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm resize-none overflow-hidden"
              ></textarea>
            </div>
            <div class="flex-1 ml-4">
              <label for="back" class="block text-sm font-medium text-gray-700">Rückseite</label>
              <textarea
                  :id="'back-' + card.uuid"
                  v-model="card.back"
                  rows="1"
                  @input="autoResize($event)"
                  @blur="updateCard(card)"
                  class="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm resize-none overflow-hidden"
              ></textarea>
            </div>
            <button @click="deleteCard(card.uuid)" class="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Löschen</button>
          </div>
        </div>
      </div>
      <div class="fixed bottom-0 left-0 w-full lg:static lg:w-auto lg:flex lg:flex-col lg:space-y-4 p-4 lg:p-0 bg-white lg:bg-transparent z-10">
        <button @click="addCard" class="w-full lg:w-auto px-4 py-2 mb-2 lg:mb-0 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Neue Karte hinzufügen</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

// Define the Card type
interface Card {
  uuid: string;
  front: string;
  back: string;
}

// Get route and router instances
const route = useRoute();
const router = useRouter();

// Define reactive properties
const cards = ref<Card[]>([]);
const loading = ref(true);

// Fetch stack data on mount
onMounted(async () => {
  try {
    const response = await axios.get(`/api/stacks/${route.params.stackName}`);
    cards.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loading.value = false;
  }
});

// Auto-resize the textarea
const autoResize = (event: Event) => {
  const textarea = event.target as HTMLTextAreaElement;
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
};

// Update card on blur
const updateCard = async (card: Card) => {
  try {
    await axios.put(`/api/cards/${card.uuid}`, {
      front: card.front,
      back: card.back
    });
  } catch (error) {
    console.error('Error updating card:', error);
  }
};

// Add a new card
const addCard = async () => {
  try {
    const response = await axios.post(`/api/cards`, {
      stackName: route.params.stackName,
      front: '',
      back: ''
    });
    cards.value.push(response.data);
  } catch (error) {
    console.error('Error adding card:', error);
  }
};

// Delete a card
const deleteCard = async (uuid: string) => {
  try {
    await axios.delete(`/api/cards/${uuid}`);
    cards.value = cards.value.filter(card => card.uuid !== uuid);
  } catch (error) {
    console.error('Error deleting card:', error);
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
}

.card-list-container {
  max-height: calc(100vh - 200px);
}

.card-list {
  scrollbar-width: thin;
  scrollbar-color: #a0aec0 #edf2f7;
  scroll-snap-type: y mandatory;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.card-list::-webkit-scrollbar {
  width: 12px;
}

.card-list::-webkit-scrollbar-track {
  background: #edf2f7;
}

.card-list::-webkit-scrollbar-thumb {
  background-color: #a0aec0;
  border-radius: 6px;
  border: 3px solid #edf2f7;
}

.snap-start {
  scroll-snap-align: start;
}

button {
  white-space: nowrap;
}
</style>
