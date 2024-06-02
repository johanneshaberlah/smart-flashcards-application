<template>
  <div class="container mx-auto max-w-screen-2xl p-4 mt-2 lg:mt-8">
    <Header />

    <div v-if="loading" class="text-center">Deine Stapel werden geladen...</div>

    <div v-else>
      <div>
        <div>
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
                  <a href="#" aria-current="page" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Übersicht</a>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div class="mt-2 flex items-center justify-between">
          <div class="min-w-0 flex-1">
            <h2 class="text-3xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Deine
              Stapel</h2>
          </div>
          <div v-if="stacks.length != 0" class="flex flex-shrink-0 ml-4 md:mt-0">
            <button @click="router.push({ path: `/stack/create` })" type="button"
                    class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Erstellen
            </button>
          </div>
        </div>
      </div>

      <transition-group name="fade" tag="div">
        <div>
          <ul role="list" class="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            <li v-for="(stack, index) in stacks"
                :key="index" class="col-span-1 flex rounded-md shadow-sm">
              <div
                  class="flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white"
                  :style="{ backgroundColor: stack.color }">
                {{ stack.name.slice(0, 4).toUpperCase() }}
              </div>
              <div
                  class="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white"
                  @click="visitStack(stack.uniqueId)">
                <div class="flex-1 truncate px-4 py-2 text-sm">
                  <a href="#" class="font-medium text-gray-900 hover:text-gray-600">{{ stack.name }}</a>
                  <p class="text-gray-500">{{ stack.cards.length }} Karten</p>
                </div>
                <div class="flex-shrink-0 pr-2">
                  <button type="button"
                          class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                    <span class="sr-only">Optionen</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="h-5 w-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
                    </svg>

                  </button>
                </div>
              </div>
            </li>
            <button v-if="stacks.length == 0" @click="router.push({ path: `/stack/create` })" type="button" class="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6" />
              </svg>
              <span class="mt-2 block text-sm font-semibold text-gray-900">Erstelle deinen ersten Stapel</span>
            </button>
          </ul>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import axiosInstance from "@/router/axiosInstance";
import router from "@/router";
import Header from "@/views/Header.vue";

const stacks = ref<Stack[]>([]);
const loading = ref<boolean>(true);

const visitStack = (stackId: string) => router.push({path: `/stack/${stackId}`});

onMounted(async () => {
  try {
    const response = await axiosInstance.get('/stack');
    if (response.status == 200) {
      stacks.value = response.data.map((stack: Stack) => stack);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loading.value = false;
  }
});
</script>
