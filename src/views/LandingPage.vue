<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
      <div class="container mx-auto px-6 py-16 text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-4">Willkommen bei Smart Flashcards</h1>
        <p class="text-lg md:text-xl mb-8">Schneller Lernen mit unserem effizienten und responsiven KI-Flashcard-System</p>
        <button @click="scrollToFeatures" class="px-8 py-3 bg-white text-blue-500 rounded-full font-semibold hover:bg-gray-100 transition-colors">Erfahren Sie mehr</button>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="bg-white py-16">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-12">Funktionen</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="p-6 border rounded-xl shadow-lg">
            <svg class="w-16 h-16 mx-auto mb-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3a1 1 0 002 0V7zm-1 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
            <h3 class="text-2xl font-semibold mb-2">Benutzerfreundlich</h3>
            <p class="text-gray-600">Unser intuitives Design macht es einfach, Flashcards zu erstellen, zu verwalten und zu überprüfen.</p>
          </div>
          <div class="p-6 border rounded-xl shadow-lg">
            <svg class="w-16 h-16 mx-auto mb-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 3a1 1 0 00-.894.553L1.382 9H3.618l1.276-2.553a1 1 0 00-.894-1.447H5V3zM15 3a1 1 0 00-.894.553L11.382 9H13.618l1.276-2.553a1 1 0 00-.894-1.447H15V3zM5 7a1 1 0 00-.894.553L1.382 13H3.618l1.276-2.553a1 1 0 00-.894-1.447H5V7zm10 0a1 1 0 00-.894.553L11.382 13H13.618l1.276-2.553a1 1 0 00-.894-1.447H15V7zm-5 5a1 1 0 00-.894.553L6.382 17H8.618l1.276-2.553a1 1 0 00-.894-1.447H10V12zM5 11a1 1 0 00-.894.553L1.382 17H3.618l1.276-2.553a1 1 0 00-.894-1.447H5V11zm10 0a1 1 0 00-.894.553L11.382 17H13.618l1.276-2.553a1 1 0 00-.894-1.447H15V11z" clip-rule="evenodd"></path></svg>
            <h3 class="text-2xl font-semibold mb-2">Anpassbar</h3>
            <p class="text-gray-600">Passen Sie Ihre Flashcards mit verschiedenen Anpassungsoptionen an Ihre Lernbedürfnisse an.</p>
          </div>
          <div class="p-6 border rounded-xl shadow-lg">
            <svg class="w-16 h-16 mx-auto mb-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414L11.414 13l2.293 2.293a1 1 0 01-1.414 1.414L10 14.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 13l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <h3 class="text-2xl font-semibold mb-2">Effizient</h3>
            <p class="text-gray-600">Steigern Sie Ihre Lerneffizienz mit unserem intelligenten Überprüfungsplaner.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="bg-teal-500 text-white py-16">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Starten Sie noch heute mit Smart Flashcards</h2>
        <p class="text-lg md:text-xl mb-8">Melden Sie sich jetzt an und machen Sie den ersten Schritt zu effizienterem Lernen.</p>
        <button class="px-8 py-3 bg-blue-500 rounded-full font-semibold hover:bg-blue-600 transition-colors">Jetzt anmelden</button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">

const scrollToFeatures = () => {
  const featuresSection = document.getElementById('features');
  if (featuresSection) {
    featuresSection.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
