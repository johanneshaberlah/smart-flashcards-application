<template>
  <div class="container mx-auto max-w-screen-2xl p-4 mt-16">
    <div>
      <div>
        <nav @click="router.push({ path: `/dashboard` })" class="sm:hidden" aria-label="Zurück">
          <a href="#" class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
            <svg class="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
            </svg>
            Zurück
          </a>
        </nav>
        <nav class="hidden sm:flex" aria-label="Breadcrumb">
          <ol role="list" class="flex items-center space-x-4">
            <li>
              <div class="flex">
                <a @click="router.push({ path: `/dashboard` })" class="text-sm font-medium text-gray-500 hover:text-gray-700">Stapel</a>
              </div>
            </li>
            <li>
              <div class="flex items-center">
                <svg class="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                </svg>
                <a href="#" aria-current="page" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">{{ stack?.name }}</a>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div class="mt-2 md:flex md:items-center md:justify-between">
        <div class="min-w-0 flex-1">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">{{ stack?.name }}</h2>
        </div>
        <div class="mt-4 flex flex-shrink-0 md:ml-4 md:mt-0">
          <button @click="deleteStack" type="button" class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Löschen</button>
          <button @click="router.push({ path: `/stack/${route.params.stackId}/learn` })" type="button" class="ml-3 inline-flex items-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">Jetzt lernen</button>
          <button @click="router.push({ path: `/stack/${route.params.stackId}/magic` })" type="button" class="ml-3 inline-flex items-center rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">Magisch erstellen 🪄</button>
        </div>
      </div>
    </div>
    <div class="mt-16">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-base font-semibold leading-6 text-gray-900">Karteikarten</h1>
          <p class="mt-2 text-sm text-gray-700">Anbei eine Liste aller Karteikarten in diesem Stapel mit ihrem Fälligkeitsdatum.</p>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button @click="visitCardCreation" type="button" class="block rounded-md bg-emerald-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">Karte erstellen</button>
        </div>
      </div>
      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table class="min-w-full divide-y divide-gray-300">
              <thead>
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">ID</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Vorderseite</th>
                <th scope="col" class="hidden sm:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Rückseite</th>
                <th scope="col" class="hidden sm:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Fälligkeitsdatum</th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span class="sr-only">Bearbeiten</span>
                </th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
              <tr v-for="card in stack?.cards">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{{ card.uniqueId.slice(0, 6).toUpperCase() }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ card.question.slice(0, 32) }}</td>
                <td class="hidden sm:table-cell whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ card.answer.slice(0, 32) }}</td>
                <td class="hidden sm:table-cell whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ card.maturity == null ? '-' : new Date(card.maturity.maturity).toLocaleString() + ' Uhr'}} </td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <a @click="visitCardModification(card)" class="text-emerald-600 hover:text-emerald-900">Bearbeiten<span class="sr-only">, Lindsay Walton</span></a>
                </td>
              </tr>

              <!-- More people... -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading" class="text-center">Laden...</div>

  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, Ref} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axiosInstance from "@/router/axiosInstance";
import Stack from "@/views/stack/Stack.vue";

// Get route and router instances
const route = useRoute();
const router = useRouter();

// Define reactive properties
const stack = ref<Stack | null>(null);
const loading = ref(true);

const visitCardCreation = async () => {
  await router.push({ path: `/stack/${route.params.stackId}/card/create` });
};

const visitCardModification = async (card: Card) => {
  await router.push({ path: `/stack/${route.params.stackId}/card/${card.uniqueId}` });
};

const deleteStack = async () => {
  try {
    const response = await axiosInstance.delete(`/stack/${route.params.stackId}`);
    await router.push({ path: '/dashboard' });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Fetch stack data on mount
onMounted(async () => {
  try {
    const response = await axiosInstance.get(`/stack/${route.params.stackId}`);
    stack.value = response.data as Stack;
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loading.value = false;
  }
});
</script>

