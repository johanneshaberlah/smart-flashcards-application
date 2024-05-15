<template>
  <div class="stack-container">
    <div v-if="cards.length === 0" class="text-center py-16">Keine Karten verfügbar</div>
    <div v-else class="stack">
      <transition-group name="stack" tag="div">
        <div
            v-for="(card, index) in visibleCards"
            :key="card.front"
            class="card"
            :style="getCardStyle(index)"
        >
          <div class="card-inner" @click="flipCard(card)">
            <div class="card-face card-front" v-if="!card.flipped">{{ card.front }}</div>
            <div class="card-face card-back" v-else>{{ card.back }}</div>
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
      { front: 'Lorem ipsum dolor sit amet', back: 'Consectetur adipiscing elit', flipped: true },
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
    transform: `translateY(-${index * 10}px) rotate(${index * 2.2}deg)`,
    zIndex: 3 - index
  };
};
</script>

<style scoped>
.stack-container {
  padding-top: 5rem;
  max-width: 400px;
  margin: 20px auto;
  perspective: 1000px;
}

.stack {
  position: relative;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
  padding: 10px;
}

.card {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.5s, box-shadow 1.0s;
}

.card-inner {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
}

.card-front {
  background-color: #d2d2d2;
}

.card-back {
  background-color: #3d3d3d;
  color: #ffffff;
}

.card.flipped .card-inner {
  transform: rotateY(180deg);
}

.stack-enter-active, .stack-leave-active {
  transition: all 0.5s;
}

.stack-enter, .stack-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>
