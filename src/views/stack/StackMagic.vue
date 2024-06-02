<template>
  <div class="container mx-auto max-w-screen-2xl p-4 mt-2 lg:mt-8">
    <Header />

    <div v-if="loading" class="text-center">Deine Stapel werden geladen...</div>

    <div v-else>
      <div id="loading-modal" class="hidden relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
              <div>
                <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                  </svg>

                </div>
                <div class="mt-3 text-center sm:mt-5">
                  <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Die Karten werden importiert...</h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">Mithilfe von künstlicher Intelligenz werden nun Karten basierend auf dem Dokument erstellt. Dies kann einige Minuten dauern.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

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
                  <a href="#" aria-current="page" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Magie</a>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div class="mt-2 md:flex md:items-center md:justify-between">
          <div class="min-w-0 flex-1">
            <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">✨ Magie ✨</h2>
          </div>
        </div>
      </div>

      <transition-group name="fade" tag="div">
        <div class="lg:max-w-full mt-16 space-y-10 divide-y divide-gray-900/10">
          <div class="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
            <div class="lg:px-4 sm:px-0">
              <h2 class="text-base font-semibold leading-7 text-gray-900">Automatisch Karten erstellen.</h2>
              <p class="mt-1 text-sm leading-6 text-gray-600">Lade hier deine Datei hoch. Eine künstliche Intelligenz wird basierend auf diesem Karteikarten für dich erstellen.</p>
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
                    <h3 class="text-sm font-medium text-red-800">Beim magischen Erstellen der Karten ist ein Fehler aufgetreten.</h3>
                    <div class="mt-2 text-sm text-red-700">
                      <ul role="list" class="list-disc space-y-1 pl-5">
                        <li>Wähle eine andere Datei, passe deine Anweisungen an oder versuche es später erneut.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div id="error-container-file" class="hidden rounded-md bg-red-50 p-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <h3 class="text-sm font-medium text-red-800">Beim magischen Erstellen der Karten ist ein Fehler aufgetreten.</h3>
                    <div class="mt-2 text-sm text-red-700">
                      <ul role="list" class="list-disc space-y-1 pl-5">
                        <li>Bitte wähle eine Datei aus, bevor du fortfährst.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div class="px-4 py-6 sm:p-8">
                <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div class="col-span-full">
                    <label for="custom-instructions" class="block text-sm font-medium leading-6 text-gray-900">Eigene Anweisungen (optional)</label>
                    <div class="mt-2">
                      <textarea id="custom-instructions" placeholder="Formuliere alle Karteikarten in Stichpunkten." name="custom-instructions" rows="3" class="block w-full pl-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"></textarea>
                    </div>
                  </div>

                  <div class="col-span-full">
                    <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Datei *</label>
                    <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div class="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-auto h-12 w-12 text-gray-300">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                        <div id="upload-instructions">
                          <div class="mt-4 flex text-sm leading-6 text-gray-600">
                            <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-emerald-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-600 focus-within:ring-offset-2 hover:text-emerald-500">
                              <span>Klicke hier, um deine Datei hochzuladen</span>
                              <input @change="handleFileUpload" id="file-upload" accept="application/pdf" name="file-upload" type="file" class="sr-only">
                            </label>
                          </div>
                          <p class="text-xs leading-5 text-gray-600">Es werden ausschließlich PDF Dateien bis 10MB angenommen.</p>
                        </div>
                        <p id="file-name" class="mt-3 text-xs font-semibold leading-5 text-gray-600"></p>
                      </div>
                    </div>
                    <p class="mt-3 text-sm leading-6 text-gray-600">Lade eine Datei hoch und lasse von einer künstlichen Intelligenz automatisch Karteikarten erstellen.</p>
                  </div>



                </div>
              </div>
              <div class="flex items-center justify-end gap-x-6 lg:border-t lg:border-gray-900/10 px-4 py-4 sm:px-8">
                <button @click="router().push({ path: '/dashboard'})" type="button" class="text-sm font-semibold leading-6 text-gray-900">Zurück</button>
                <button type="submit"
                        @click="submitFile"
                        class="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
                  Los geht's!
                </button>
              </div>
            </form>
          </div>
        </div>

      </transition-group>
    </div>
  </div>

</template>
<script>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axiosInstance from "@/router/axiosInstance.ts";
import Header from "@/views/Header.vue";
import router from "@/router/";

export default {
  methods: {
    router() {
      return router
    }
  },
  components: {Header},
  setup() {

    const file = ref(null);
    const route = useRoute();
    const router = useRouter();

    const handleFileUpload = (event) => {
      file.value = event.target.files[0];
      document.getElementById("upload-instructions").classList.add("hidden");
      document.getElementById("file-name").innerText = event.target.files[0].name;
      if (!document.getElementById("error-container-file").classList.contains("hidden")) {
        document.getElementById("error-container-file").classList.add("hidden");
      }
    };

    const submitFile = async () => {
      if (!file.value) {
        if (document.getElementById("error-container-file").classList.contains("hidden")) {
          document.getElementById("error-container-file").classList.remove("hidden");
        }
        return;
      }
      if (!document.getElementById("error-container").classList.contains("hidden")) {
        document.getElementById("error-container").classList.add("hidden");
      }
      if (!document.getElementById("error-container-file").classList.contains("hidden")) {
        document.getElementById("error-container-file").classList.add("hidden");
      }

      const formData = new FormData();
      formData.append("file", file.value);
      formData.append("custom-instructions", document.getElementById("custom-instructions").value);

      try {
        document.getElementById("loading-modal").classList.remove("hidden");
        const response = await axiosInstance.post(`/stack/${route.params.stackId}/createFromFile`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.status === 200) {
          router.push({ path: `/stack/${route.params.stackId}` });
        }
      } catch (error) {
        document.getElementById("loading-modal").classList.add("hidden");
        if (document.getElementById("error-container").classList.contains("hidden")) {
          document.getElementById("error-container").classList.remove("hidden");
        }
      }
    };

    return {
      file,
      handleFileUpload,
      submitFile
    };
  }
};
</script>

