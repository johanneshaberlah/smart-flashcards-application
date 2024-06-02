<template>
  <div class="container mx-auto max-w-screen-2xl p-4 mt-2 lg:mt-8">
    <Header />
    <div>
      <div>
        <nav @click="visitStack" class="sm:hidden" aria-label="Zurück">
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
                <a @click="router.replace({ path: `/dashboard` })"
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
                <a href="#" aria-current="page" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Karte</a>
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
                <a href="#" aria-current="page" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Erstellen</a>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div class="mt-2 md:flex md:items-center md:justify-between">
        <div class="min-w-0 flex-1">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Karte erstellen</h2>
        </div>
        <div v-if="existingCard" @click="visitCardCreation" class="mt-4 flex flex-shrink-0 md:ml-4 md:mt-0">
          <button @click="deleteCard" type="button" class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Löschen</button>
          <button type="button"
                  class="ml-4 lg:ml-3 inline-flex items-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
            Neue Karte erstellen
          </button>
        </div>
      </div>
    </div>

    <transition-group name="fade" tag="div">
      <div class="lg:max-w-full mt-16 space-y-10 divide-y divide-gray-900/10">

        <div class="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">

          <div class="lg:px-4 sm:px-0">
            <h2 class="text-base font-semibold leading-7 text-gray-900">Neue Karteikarte anlegen</h2>
            <p class="mt-1 text-sm leading-6 text-gray-600">Lege eine neue Karteikarte an und beginne direkt mit dem Lernen. Achte darauf, dass sich die Vorderseiten nicht zu sehr ähneln für besseren Wiedererkennungswert.</p>
          </div>

          <form @submit.prevent="handleFormSubmit"
                class="bg-white shadow-sm sm:rounded-xl md:col-span-2">

            <div class="px-4 py-6 sm:p-8">
              <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div id="error-container" class="hidden col-span-full rounded-xl bg-red-50 p-4">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <div class="ml-3">
                      <h3 class="text-sm font-medium text-red-800">Beim Erstellen der Karte ist ein Fehler aufgetreten.</h3>
                      <div class="mt-2 text-sm text-red-700">
                        <ul role="list" class="list-disc space-y-1 pl-5">
                          <li>Bitte fülle die Vorder- und Rückseite deiner Karte korrekt aus.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="success-box" class="hidden col-span-full rounded-xl bg-green-50 p-4">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <div class="ml-3">
                      <h3 class="text-sm font-medium text-green-800">Karteikarte gespeichert</h3>
                      <div class="mt-2 text-sm text-green-700">
                        <p>Die Karteikarte wurde gespeichert und dem Stapel hinzugefügt. Du kannst nun anfangen zu lernen oder weitere Karteikarten erstellen.</p>
                      </div>
                      <div class="mt-4">
                        <div class="-mx-2 -my-1.5 flex">
                          <button @click="visitStack" type="button" class="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50">Stapel ansehen</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div class="col-span-full">
                  <label for="question" class="block text-sm font-medium leading-6 text-gray-900">Vorderseite *</label>
                  <div class="mt-2">
                    <input v-model="formData.question" id="question" name="question" class="block w-full pl-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"></input>
                  </div>
                </div>

                <div class="col-span-full">
                  <label for="answer" class="block text-sm font-medium leading-6 text-gray-900">Rückseite *</label>
                  <div class="mt-2">
                    <textarea v-model="formData.answer" id="answer" name="answer" rows="8" class="block w-full pl-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"></textarea>
                  </div>
                  <p class="mt-3 text-sm leading-6 text-gray-600">Schreibe Stichpunkte oder Fließtext auf die Rückseite deiner Karteikarte.</p>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-end gap-x-6 px-4 py-4 sm:px-8">
              <button @click="visitStack" type="button" class="text-sm font-semibold leading-6 text-gray-900">Zurück</button>
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

</template>
<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import axiosInstance from '@/router/axiosInstance.js';
import {CardContext} from "@/models/CardContext";
import Header from "@/views/Header.vue";

const formData = ref(new CardContext('', ''));
const existingCard = ref<Card>()
const router = useRouter();
const route = useRoute();

onMounted(async () => {
  if (route.params.cardId) {
    try {
      let response = await axiosInstance.get(`/stack/${route.params.stackId}/card/${route.params.cardId}`);
      formData.value = new CardContext(response.data.question, response.data.answer);
      existingCard.value = response.data as Card;
    } catch (err) {
      alert('There was an error submitting the form. Please try again.');
    }
  }
});

const visitStack = () => {
  router.push({path: `/stack/${route.params.stackId}`});
};

const visitCardCreation = () => {
  router.replace({ path: `/stack/${route.params.stackId}/card/create` });
  existingCard.value = undefined;
  formData.value = new CardContext('', '');
}

const deleteCard = async () => {
  try {
    const response = await axiosInstance.delete(`/stack/${route.params.stackId}/card/${route.params.cardId}`);
    await router.push({ path: `/stack/${route.params.stackId}` });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


const handleFormSubmit = async () => {
  if (!document.getElementById("error-container").classList.contains("hidden")) {
    document.getElementById("error-container").classList.add("hidden");
  }
  if (!document.getElementById("success-box").classList.contains("hidden")) {
    document.getElementById("success-box").classList.add("hidden");
  }
  try {
    const payload = {
      cardId: '',
      ...formData.value,
      stackId: route.params.stackId
    };
    if (existingCard.value) {
      payload.cardId = existingCard.value?.uniqueId ?? '';
      await axiosInstance.put(`/stack/${route.params.stackId}/card/${route.params.cardId}`, payload);
    } else {
      await axiosInstance.post('/card', payload);
      formData.value = new CardContext('', '');
    }
    if (document.getElementById("success-box").classList.contains("hidden")) {
      document.getElementById("success-box").classList.remove("hidden");
    }
  } catch (err) {
    if (document.getElementById("error-container").classList.contains("hidden")) {
      document.getElementById("error-container").classList.remove("hidden");
    }
  }
};
</script>
