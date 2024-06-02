<template>
  <div class="container mx-auto max-w-screen-2xl p-4 mt-2 lg:mt-8">
    <Header />
    <div v-if="loading" class="text-center">Deine Stapel werden geladen...</div>

    <div v-else>
      <div>
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
                  <a href="#" aria-current="page" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Übersicht</a>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div class="mt-2 md:flex md:items-center md:justify-between">
          <div class="min-w-0 flex-1">
            <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Deine
              Stapel</h2>
          </div>
        </div>
      </div>

      <transition-group name="fade" tag="div">
        <!--
          This example requires some changes to your config:

          ```
          // tailwind.config.js
          module.exports = {
            // ...
            plugins: [
              // ...
              require('@tailwindcss/forms'),
            ],
          }
          ```
        -->
        <div class="lg:max-w-full mt-16 space-y-10 divide-y divide-gray-900/10">
          <div class="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
            <div class="lg:px-4 sm:px-0">
              <h2 class="text-base font-semibold leading-7 text-gray-900">Informationen</h2>
              <p class="mt-1 text-sm leading-6 text-gray-600">Um den Stapel später wieder zu finden, benenne ihn und
                weise eine Farbe zu.</p>
            </div>

            <form @submit.prevent="handleFormSubmit"
                  class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
              <div id="error-container" class="hidden rounded-md bg-red-50 p-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <h3 class="text-sm font-medium text-red-800">Beim Erstellen des Stapels ist ein Fehler aufgetreten.</h3>
                    <div class="mt-2 text-sm text-red-700">
                      <ul role="list" class="list-disc space-y-1 pl-5">
                        <li>Bitte wähle einen Namen und eine Farbe für deinen Stapel.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div class="px-4 py-6 sm:p-8">
                <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div class="sm:col-span-4">
                    <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name *</label>
                    <div class="mt-2">
                      <div
                          class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                        <input type="text" name="name" id="name"
                               v-model="formData.name"
                               class="block flex-1 border-0 bg-transparent py-1.5 pl-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                               placeholder="">
                      </div>
                    </div>
                  </div>

                  <div class="sm:col-span-4">
                    <label for="color" class="block text-sm font-medium leading-6 text-gray-900">Farbe *</label>
                    <div class="mt-2">
                      <div class="flex">
                        <span class="flex select-none items-center text-gray-500 sm:text-sm"></span>
                        <input type="color" name="color" id="color"
                               v-model="formData.color"
                               value="#000000"
                               class="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
                               placeholder="#000000">
                      </div>
                    </div>
                  </div>



                </div>
              </div>
              <div class="flex items-center justify-end gap-x-6 lg:border-t lg:border-gray-900/10 px-4 py-4 sm:px-8">
                <button @click="router.push({ path: '/dashboard'})" type="button" class="text-sm font-semibold leading-6 text-gray-900">Zurück</button>
                <button type="submit"
                        class="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
                  Speichern
                </button>
              </div>
            </form>
          </div>
        </div>

      </transition-group>
    </div>
  </div>

</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axiosInstance from '@/router/axiosInstance.js';
import { StackContext } from '@/models/StackContext';
import Header from "@/views/Header.vue";

const formData = ref(new StackContext('', ''));
const router = useRouter();

const handleFormSubmit = async () => {
  if (!document.getElementById("error-container").classList.contains("hidden")) {
    document.getElementById("error-container").classList.add("hidden");
  }
  try {
    await axiosInstance.post('/stack', formData.value);
    await router.push({path: '/dashboard'});
  } catch (err) {
    if (document.getElementById("error-container").classList.contains("hidden")) {
      document.getElementById("error-container").classList.remove("hidden");
    }
  }
};
</script>
