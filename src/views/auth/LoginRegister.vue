<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { defineProps } from 'vue';
import Cookies from 'js-cookie';
import axiosInstance from "@/router/axiosInstance";

const props = defineProps({
  action: String
});

const route = useRoute();
const router = useRouter();

const email = ref('');
const password = ref('');
const name = ref('');
const errors = reactive({
  email: '',
  password: '',
  name: '',
  api: ''
});
const showErrors = ref(false);

const validateForm = () => {
  let valid = true;
  if (props.action === 'register' && !name.value) {
    errors.name = 'Gebe deinen Namen ein';
    valid = false;
  } else {
    errors.name = '';
  }

  if (!email.value) {
    errors.email = 'Gebe deine E-Mail ein';
    valid = false;
  } else {
    errors.email = '';
  }

  if (!password.value) {
    errors.password = 'Gebe dein Passwort ein';
    valid = false;
  } else {
    errors.password = '';
  }

  return valid;
};

const handleSubmit = async (e: Event) => {
  e.preventDefault();

  if (!validateForm()) {
    showErrors.value = true;
    setTimeout(() => {
      showErrors.value = false;
    }, 3000);
    return;
  }

  try {
    if (props.action === 'register') {
      const response = await axiosInstance.post('/signup', {
        name: name.value,
        mail: email.value,
        password: password.value
      });

      Cookies.set('auth', response.data.token, { expires: 7 });
      Cookies.set("name", response.data.username);
      await router.push('/dashboard');
    } else {
      const response = await axiosInstance.post('/login', {
        mail: email.value,
        password: password.value
      });
      Cookies.set('auth', response.data.token, { expires: 7 });
      Cookies.set("name", response.data.username);
      await router.push('/dashboard');
    }
  } catch (error) {
    if (props.action === 'register') {
      errors.api = 'Registrierung fehlgeschlagen. Es existiert bereits ein Account mit dieser Mail.';
    } else {
      errors.api = 'Login fehlgeschlagen. Überprüfe deine Eingaben.';
    }
    setTimeout(() => {
      errors.api = '';
    }, 3000);
    console.error('Error during authentication:', error);
  }
};
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
      <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg]  bg-gradient-to-tr from-[#74eb34] to-[#079669] opacity-15 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
    </div>
    <div @click="router.push({ path: '/' })" class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-20 w-auto" src="../../../public/brain.svg" alt="Smart Flashcards logo"/>
      <h2 class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        {{ props.action === 'login' ? 'Anmelden' : 'Registrieren' }}
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-2" @submit="handleSubmit">
        <div v-if="props.action === 'register'">
          <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div class="mt-2">
            <input id="name" name="name" minlength="2" type="text" v-model="name" :class="{'border-red-500': errors.name && showErrors}" required
                   class="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"/>
            <p v-if="errors.name && showErrors" class="text-red-500 text-sm">{{ errors.name }}</p>
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email-Adresse</label>
          <div class="mt-2">
            <input id="email" name="email" type="email" v-model="email" :class="{'border-red-500': errors.email && showErrors}" required
                   class="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"/>
            <p v-if="errors.email && showErrors" class="text-red-500 text-sm">{{ errors.email }}</p>
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Passwort</label>
          <div class="mt-2">
            <input id="password" minlength="8" name="password" type="password" v-model="password" :class="{'border-red-500': errors.password && showErrors}" required
                   class="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"/>
            <p v-if="errors.password && showErrors" class="text-red-500 text-sm">{{ errors.password }}</p>
          </div>
        </div>

        <div>
          <button type="submit"
                  class="mt-4 flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
            {{ props.action === 'login' ? 'Anmelden' : 'Registrieren' }}
          </button>
        </div>

      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        {{ props.action === 'login' ? 'Du hast noch keinen Account?' : 'Du hast bereits einen Account?' }}
        <router-link :to="props.action === 'login' ? '/register' : '/login'" class="font-semibold leading-6 text-emerald-600 hover:text-emerald-500">
          {{ props.action === 'login' ? 'Account erstellen' : 'Anmelden' }}
        </router-link>
      </p>

      <transition name="fade" mode="out-in">
        <div v-if="errors.api" key="error" class="mt-4 rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">Fehler bei der Anmeldung</h3>
              <div class="mt-2 text-sm text-red-700">
                <ul role="list" class="list-disc space-y-1 pl-5">
                  <li>{{ errors.api }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#74eb34] to-[#079669] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
      </div>
    </div>

  </div>
</template>
