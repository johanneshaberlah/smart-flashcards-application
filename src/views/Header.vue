<!-- Header.vue -->
<template>
  <header>
    <nav class="flex items-center justify-between pt-6 pb-4 lg:pt-8 border-b mb-12">
      <div  class="flex lg:flex-1">
        <a href="/dashboard" class="-m-1.5 p-1.5">
          <span class="sr-only">Smart-Flashcards</span>
          <img class="h-8 w-auto" src="../../public/brain.svg" alt="">
        </a>
      </div>

      <div class="flex flex-1 justify-end">
        <a href="/login"
           class="inline-flex items-center text-sm font-semibold leading-6 text-gray-900">
          {{ username }}
          <span aria-hidden="true" class="ml-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                 class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"/>
            </svg>
          </span>
        </a>
      </div>
    </nav>
  </header>
</template>

<script>
import router from "@/router";
import Cookies from "js-cookie";

export default {
  name: 'Header',
  methods: {
    router() {
      return router
    }
  },
  computed: {
    username() {
      return Cookies.get("name");
    }
  }
}
</script>

<style scoped>
/* Add any scoped styles here */
</style>
