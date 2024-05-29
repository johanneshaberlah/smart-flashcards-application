<template>
  <div class="stack-container pt-20 mx-auto">
    <div v-if="cards.length === 0" class="text-center py-16">Keine Karten verfügbar</div>
    <div v-else class="stack relative w-full h-64 mb-5 p-2.5">
      <transition-group name="stack" tag="div">
        <div
            v-for="(card, index) in visibleCards"
            :key="card.front"
            class="card absolute w-full h-full rounded-lg shadow-lg"
            :style="getCardStyle(index)"
        >
          <div class="card-inner flex items-center justify-center w-full h-full cursor-pointer relative transition-transform duration-600" @click="flipCard(card)">
            <div class="card-face card-front flex items-center justify-center w-full h-full absolute text-2xl p-5 bg-gray-300" v-if="!card.flipped">{{ card.front }}</div>
            <div class="card-face card-back flex items-center justify-center w-full h-full absolute text-2xl p-5 bg-gray-800 text-white" v-else>{{ card.back }}</div>
          </div>
        </div>
      </transition-group>
    </div>
    <div class="controls mt-4 flex justify-center space-x-4">
      <button @click="prevCard" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Zurück</button>
      <button @click="nextCard" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Weiter</button>
    </div>
    <div v-if="currentCardIndex >= cards.length" class="text-center mt-4">
      <p class="mb-4">Der Stapel ist beendet!</p>
      <button @click="resetStack" class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Erneut starten</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from "axios";
import Cookies from "js-cookie";

// Define the Card type
interface Card {
  front: string;
  back: string;
  flipped: boolean;
}

// Define props
const props = defineProps<{ stackName: string }>();

const route = useRoute();
const cards = ref<Card[]>([]);
const currentCardIndex = ref(0);

const visibleCards = computed(() => {
  return cards.value.slice(currentCardIndex.value, currentCardIndex.value + 3);
});

onMounted(async () => {
  if (route.params.stackName === 'test') {
    // Placeholder data for testing
    cards.value = [
      { front: 'Lorem ipsum dolor sit amet', back: 'Consectetur adipiscing elit', flipped: false },
      { front: 'Sed do eiusmod tempor', back: 'Incididunt ut labore et dolore', flipped: false },
      { front: 'Magna aliqua', back: 'Ut enim ad minim veniam', flipped: false },
      { front: 'Quis nostrud exercitation', back: 'Ullamco laboris nisi ut aliquip', flipped: false },
      { front: 'Ex ea commodo consequat', back: 'Duis aute irure dolor in reprehenderit', flipped: false },
    ];
  } else {
    const response = await fetch(`/api/stacks/${props.stackName}`);
    const data = await response.json();
    cards.value = data.map((card: { front: string; back: string }) => ({ ...card, flipped: false }));
  }
});

const flipCard = (card: Card) => {
  card.flipped = !card.flipped;
};

const nextCard = () => {
  if (currentCardIndex.value < cards.value.length) {
    currentCardIndex.value++;
  }

};

/*const nextCard = async () => {
  if (currentCardIndex.value < cards.value.length) {
    currentCardIndex.value++;
    try {
      const response = await axios.get(`/api/cards/${cards.value[currentCardIndex.value].id}`);
      cards.value[currentCardIndex.value] = response.data;
    } catch (error) {
      console.error('Error fetching next card:', error);
    }
  }
};*/

const prevCard = () => {
  if (currentCardIndex.value > 0) {
    currentCardIndex.value--;
  }
};

const resetStack = () => {
  currentCardIndex.value = 0;
};

const getCardStyle = (index: number) => {
  return {
    transform: `translateY(-${index * 10}px) rotate(${index * 2}deg)`,
    zIndex: 3 - index
  };
};
</script>

<style scoped>
.stack-container {
  max-width: 400px;
  perspective: 1000px;
}

.card {
  transition: transform 0.5s, box-shadow 1.0s;
}

.card-inner {
  transform-style: preserve-3d;
}

.card-face {
  backface-visibility: hidden;
  border-radius: 10px;
  box-sizing: border-box;
}
</style>
