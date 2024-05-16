<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Bearbeiten Sie den Stapel</h1>
    <div v-if="loading" class="text-center">Laden...</div>
    <div v-else class="flex flex-col lg:flex-row">
      <div class="card-list-container relative flex-1 mb-4 lg:mb-0 lg:mr-4">
        <div class="card-list overflow-y-auto h-96 lg:h-full mt-4 mb-4 lg:mt-0 lg:mb-0">
          <div v-for="(card, index) in cards" :key="index" class="mb-4 p-4 border rounded-lg shadow-md flex items-center snap-start min-h-[3rem]">
            <div class="flex-1">
              <label for="front" class="block text-sm font-medium text-gray-700">Vorderseite</label>
              <textarea
                  id="front"
                  v-model="card.front"
                  rows="1"
                  @input="autoResize($event)"
                  class="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm resize-none overflow-hidden"
              ></textarea>
            </div>
            <div class="flex-1 ml-4">
              <label for="back" class="block text-sm font-medium text-gray-700">Rückseite</label>
              <textarea
                  id="back"
                  v-model="card.back"
                  rows="1"
                  @input="autoResize($event)"
                  class="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm resize-none overflow-hidden"
              ></textarea>
            </div>
            <button @click="deleteCard(index)" class="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Löschen</button>
          </div>
        </div>
      </div>
      <div class="fixed bottom-0 left-0 w-full lg:static lg:w-auto lg:flex lg:flex-col lg:space-y-4 p-4 lg:p-0 bg-white lg:bg-transparent z-10">
        <button @click="addCard" class="w-full lg:w-auto px-4 py-2 mb-2 lg:mb-0 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Neue Karte hinzufügen</button>
        <button @click="saveStack" class="w-full lg:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Stapel speichern</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Define the Card type
interface Card {
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
    const response = await fetch(`/api/stacks/${route.params.stackName}`);
    const data = await response.json();
    cards.value = data;
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

// Add a new card
const addCard = () => {
  cards.value.push({ front: '', back: '' });
};

// Delete a card
const deleteCard = (index: number) => {
  cards.value.splice(index, 1);
};

// Save the updated stack
const saveStack = async () => {
  try {
    const response = await fetch(`/api/stacks/${route.params.stackName}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cards.value),
    });

    if (response.ok) {
      alert('Stapel erfolgreich gespeichert');
      router.push('/'); // Redirect to the home page or another page
    } else {
      alert('Fehler beim Speichern des Stapels');
    }
  } catch (error) {
    console.error('Error saving data:', error);
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
