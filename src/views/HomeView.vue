<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Main Content -->
    <main class="w-full max-w-md mx-auto px-2 py-6 sm:max-w-lg sm:px-4 md:max-w-2xl lg:max-w-3xl">
   
<HeroSection />
      <!-- How It Works Section -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold text-center mb-12">Create Invoices in Minutes</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center p-6 bg-white rounded-lg shadow-md">
            <div
              class="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4"
            >
              1
            </div>
            <h3 class="text-xl font-semibold mb-4">Fill Invoice Details</h3>
            <p class="text-gray-600">
              Use our smart free tool to enter your business information, client details, and invoice items. 
              Our invoice generator makes it easy for SMEs to create professional invoices quickly.
            </p>
          </div>
          <div class="text-center p-6 bg-white rounded-lg shadow-md">
            <div
              class="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4"
            >
              2
            </div>
            <h3 class="text-xl font-semibold mb-4">Preview & Generate PDF</h3>
            <p class="text-gray-600">
              Review your invoice and generate a professional PDF document with a single click using our free invoice maker online.
            </p>
          </div>
          <div class="text-center p-6 bg-white rounded-lg shadow-md">
            <div
              class="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4"
            >
              3
            </div>
            <h3 class="text-xl font-semibold mb-4">Share or Download</h3>
            <p class="text-gray-600">
              Send your invoice via WhatsApp or download it for your records - our invoice maker for SMEs works offline too!
            </p>
          </div>
        </div>
      </section>

      <!-- Key Features Section -->
      <section>
        <h2 class="text-3xl font-bold text-center mb-12">Simple, Reliable, and Offline-Friendly</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center p-6 bg-white rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-4">100% Free</h3>
            <p class="text-gray-600">No Hidden Costs - Our smart free tool is completely free for SMEs</p>
          </div>
          <div class="text-center p-6 bg-white rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-4">Instant Access</h3>
            <p class="text-gray-600">No Sign-Up Required - Start using our free invoice maker online immediately</p>
          </div>
          <div class="text-center p-6 bg-white rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-4">Works Offline</h3>
            <p class="text-gray-600">Beat Power & Internet Issues - Perfect invoice generator for SMEs in Ghana, Nigeria, and Kenya</p>
          </div>
        </div>
      </section>


      <!-- New Invoice View Section -->
      <section class="mt-16 pt-16 border-t border-gray-200">
        <div class="max-w-5xl mx-auto">
          <NewInvoiceView />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import HeroSection from '@/components/layout/HeroSection.vue';
import NewInvoiceView from './NewInvoiceView.vue'
</script>

<style scoped>
.router-link-active {
  font-weight: bold;
}
</style>
