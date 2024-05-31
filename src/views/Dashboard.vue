<template>
  <div class="container mx-auto max-w-screen-2xl p-4 mt-4 lg:mt-16">
    <div v-if="loading" class="text-center">Deine Stapel werden geladen...</div>

    <div v-else>
      <div>
        <div>
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
                  <a href="#" aria-current="page" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Übersicht</a>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div class="mt-2 md:flex md:items-center md:justify-between">
          <div class="min-w-0 flex-1">
            <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Deine Stapel</h2>
          </div>
          <div class="mt-4 flex flex-shrink-0 md:ml-4 md:mt-0">
            <button @click="router.push({ path: `/stack/create` })" type="button" class="inline-flex items-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">Stapel erstellen</button>
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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>

                  </button>
                </div>
              </div>
            </li>
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

const stacks = ref<Stack[]>([]);
const loading = ref<boolean>(true);

const visitStack = (stackId: string) => router.push({ path: `/stack/${stackId}` });

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
