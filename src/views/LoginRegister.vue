<script setup lang="ts">
import {useRoute} from 'vue-router';
import { defineProps } from 'vue';

const props = defineProps({
  action: String
});
</script>

<template>


  <!--    <html class="h-full bg-white">-->
  <!--    <body class="h-full">-->

  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
           alt="Your Company"/>
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        {{ props.action === 'login' ? 'Anmelden' : 'Registrieren' }}</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-2" action="#" method="POST">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email-Adresse</label>
          <div class="mt-2">
            <input id="email" name="email" type="email" autocomplete="email" required="true"
                   class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Passwort</label>
          </div>
          <div class="mt-2">
            <input id="password" name="password" type="password" autocomplete="current-password" required="true"
                   class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

        <div>
          <button type="submit"
                  class="mt-4 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            {{ props.action === 'login' ? 'Anmelden' : 'Registrieren' }}
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        {{ action === 'login' ? 'Du hast noch keinen Account?' : 'Du hast bereits einen Account?' }}

        {{ ' ' }}
        <router-link :to="props.action === 'login' ? '/register' : '/login'"
                     class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          {{ props.action === 'login' ? 'Account erstellen' : 'Anmelden' }}
        </router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>