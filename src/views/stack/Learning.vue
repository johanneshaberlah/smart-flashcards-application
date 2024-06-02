<template>
  <div class="container mx-auto max-w-screen-2xl p-4 mt-2 lg:mt-8">
    <Header />

    <div>
      <div id="completed-modal" class="hidden relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
              <div>
                <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:mt-5">
                  <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Toll gemacht!</h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">Du bist für heute fertig, da das Fälligkeitsdatum aller Karten erst frühestens morgen ist.</p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 pb-6 border-b-1">
                <button @click="router.push({ path: '/dashboard'})" type="button" class="inline-flex w-full justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">Zurück zum Dashboard</button>
              </div>
              <div class="pt-8 border-t-2">
                <div class="flex items-center space-x-2">
                  <label for="username" class="text-sm font-medium leading-6 text-gray-900">Für</label>
                  <div class="flex items-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input type="number" min="1" name="days-ahead" id="days-ahead" autocomplete="username" class="block w-8 border-0 bg-transparent py-1.5 pl-1 text-center text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="1" maxlength="2">
                  </div>
                  <label for="username" class="text-sm font-medium leading-6 text-gray-900">Tage vorrauslernen</label>
                  <button @click="learnAhead" type="button" class="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm ring-1 bg-white ring-inset ring-gray-300" style="margin-left: 2.8rem !important;">
                    Los gehts!</button>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>

      <div>
        <nav @click="router.push({ path: `/dashboard` })" class="sm:hidden" aria-label="Zurück">
          <a href="#" class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
            <svg class="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor"
                 aria-hidden="true">
              <path fill-rule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clip-rule="evenodd"/>
            </svg>
            Zurück
          </a>
        </nav>
        <nav class="hidden sm:flex" aria-label="Breadcrumb">
          <ol role="list" class="flex items-center space-x-4">
            <li>
              <div class="flex">
                <a @click="router.push({ path: `/dashboard` })"
                   class="text-sm font-medium text-gray-500 hover:text-gray-700">Stapel</a>
              </div>
            </li>
            <li>
              <div class="flex items-center">
                <svg class="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor"
                     aria-hidden="true">
                  <path fill-rule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clip-rule="evenodd"/>
                </svg>
                <a href="#" aria-current="page"
                   class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">{{ stack?.name }}</a>
              </div>
            </li>
            <li>
              <div class="flex items-center">
                <svg class="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor"
                     aria-hidden="true">
                  <path fill-rule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clip-rule="evenodd"/>
                </svg>
                <a href="#" aria-current="page" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Lernen</a>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div class="mt-2 md:flex md:items-center md:justify-between">
        <div class="min-w-0 flex-1">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {{ stack?.name }}</h2>
        </div>
        <div class="mt-4 flex flex-shrink-0 md:ml-4 md:mt-0">
          <button @click="router.push({ path: `/stack/${route.params.stackId}`})" type="button"
                  class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Zurück zum Stapel
          </button>
        </div>
      </div>
    </div>
    <div class="mt-16 mx-auto max-w-2xl">
      <div class="overflow-hidden bg-white sm:rounded-lg sm:shadow">

        <div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
          <h3 class="text-base font-semibold leading-6 text-gray-900">{{ currentCard?.question }}</h3>
        </div>

        <div class="relative px-4 py-5" @click="flipCard">
          <p id="card-body" class="divide-y divide-gray-200">
            {{ currentCard?.answer }}
          </p>
          <div id="flip-container" class="absolute inset-0 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="size-12">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"/>
            </svg>
          </div>
        </div>
        <div id="difficulty-buttons" class="hidden py-8 border-t-2 flex items-center justify-center">
          <button v-for="difficulty in currentCard?.difficultyAndDurations" @click="submitCardRating(difficulty.difficulty)" :style="{ backgroundColor: difficulty.difficulty.color }" type="button" class="mr-3 inline-flex items-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-emerald-500">
            {{ difficulty.difficulty.name }} ({{ difficulty.duration.displayName }})</button>
        </div>
      </div>
    </div>

    <div v-if="loading" class="text-center">Laden...</div>

  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, Ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import axiosInstance from "@/router/axiosInstance";
import {CardRating} from "@/models/CardRating";
import Header from "@/views/Header.vue";

// Get route and router instances
const route = useRoute();
const router = useRouter();

// Define reactive properties
const learnAheadDays = ref<number>(0);
const stack = ref<Stack>();
const currentCard = ref<Card>();
const loading = ref(true);

const flipCard = () => {
  if (document.getElementById("card-body").classList.contains("blur-md")) {
    document.getElementById("card-body").classList.remove("blur-md");
    document.getElementById("flip-container").classList.add("hidden");
    document.getElementById("difficulty-buttons").classList.remove("hidden");
  } else {
    document.getElementById("card-body").classList.add("blur-md");
    document.getElementById("flip-container").classList.remove("hidden");
    document.getElementById("difficulty-buttons").classList.add("hidden");

  }
};

const learnAhead = () => {
  document.getElementById("completed-modal").classList.add("hidden")
  learnAheadDays.value =  parseInt(document.getElementById("days-ahead").value);
  nextCard();
}

const submitCardRating = async (difficulty: Difficulty) => {
  try {
    const rating = new CardRating(stack.value?.uniqueId ?? '', currentCard.value?.uniqueId ?? '', difficulty.id);
    await axiosInstance.post(`/stack/rating`, rating).then(response => {
        nextCard();
    });

  } catch (error) {
    console.error('Error submitting rating:', error);
  }
}

const nextCard = async () => {
  try {
    const response = await axiosInstance.get(`/stack/${route.params.stackId}/card/next` + (learnAheadDays.value > 0 ? `?days-ahead=${learnAheadDays.value}` : ''));
    flipCard();
    currentCard.value = response.data as Card;
  } catch (error) {
    flipCard();
    currentCard.value = undefined;
    document.getElementById("flip-container").classList.add("hidden");
    document.getElementById("completed-modal").classList.remove("hidden")
  } finally {
    loading.value = false;
  }
}

// Fetch stack data on mount
onMounted(async () => {
  try {
    const response = await axiosInstance.get(`/stack/${route.params.stackId}`);
    stack.value = response.data as Stack;
    await nextCard();
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loading.value = false;
  }
});
</script>

