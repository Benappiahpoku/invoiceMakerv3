<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-8">
      <!-- Hero Section -->
      <section class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-primary mb-4">
          Simple, Fast & Free Invoicing for Your Business in Ghana
        </h1>
        <p class="text-xl text-gray-600 mb-8">No Internet? No Problem</p>
        <p class="text-lg text-gray-500 mb-8">Offline-Ready Anytime, Anywhere.</p>
        <router-link
          to="/new-invoice"
          class="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-lg transition duration-300"
        >
          Create Your Free Invoice
        </router-link>
      </section>

      <!-- How It Works Section -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center p-6 bg-white rounded-lg shadow-md">
            <div
              class="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4"
            >
              1
            </div>
            <h3 class="text-xl font-semibold mb-4">Fill Invoice Details</h3>
            <p class="text-gray-600">
              Enter your business information, client details, and invoice items quickly and easily.
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
              Review your invoice and generate a professional PDF document with a single click.
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
              Send your invoice via WhatsApp or download it for your records - works offline too!
            </p>
          </div>
        </div>
      </section>

      <!-- Key Features Section -->
      <section>
        <h2 class="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center p-6 bg-white rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-4">100% Free</h3>
            <p class="text-gray-600">No Hidden Costs</p>
          </div>
          <div class="text-center p-6 bg-white rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-4">Instant Access</h3>
            <p class="text-gray-600">No Sign-Up Required</p>
          </div>
          <div class="text-center p-6 bg-white rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-4">Works Offline</h3>
            <p class="text-gray-600">Beat Power & Internet Issues</p>
          </div>
        </div>
      </section>

      <!-- Invoice Form Section -->
      <section class="mt-16 pt-16 border-t border-gray-200">
        <h2 class="text-3xl font-bold text-center mb-12">Create Invoice Now</h2>
        <div class="max-w-5xl mx-auto">
          <form @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow-lg p-6 space-y-8">
            <!-- Company Details Section -->
            <section>
              <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold text-primary">Company Details</h3>
                <button type="button" class="text-blue-600 hover:text-blue-800">
                  Load Saved Details
                </button>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label for="companyLogo" class="block text-sm font-medium text-gray-700"
                    >Company Logo</label
                  >
                  <div
                    class="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center"
                  >
                    <span class="text-gray-500">Click to upload</span>
                  </div>
                </div>

                <div class="space-y-4">
                  <div>
                    <label for="companyName" class="block text-sm font-medium text-gray-700"
                      >Company Name</label
                    >
                    <input
                      type="text"
                      id="companyName"
                      v-model="invoice.companyName"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label for="companyPhone" class="block text-sm font-medium text-gray-700"
                      >Company Phone</label
                    >
                    <input
                      type="tel"
                      id="companyPhone"
                      v-model="invoice.companyPhone"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </section>

            <!-- Customer Details Section -->
            <section>
              <h3 class="text-2xl font-bold text-primary mb-6">Customer Details</h3>
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label for="customerName" class="block text-sm font-medium text-gray-700"
                    >Customer Name</label
                  >
                  <input
                    type="text"
                    id="customerName"
                    v-model="invoice.customerName"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>

                <div>
                  <label for="customerPhone" class="block text-sm font-medium text-gray-700"
                    >Customer Phone</label
                  >
                  <input
                    type="tel"
                    id="customerPhone"
                    v-model="invoice.customerPhone"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>
            </section>

            <!-- Invoice Details Section -->
            <section>
              <h3 class="text-2xl font-bold text-primary mb-6">Invoice Details</h3>
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label for="invoiceNumber" class="block text-sm font-medium text-gray-700"
                    >Invoice Number</label
                  >
                  <input
                    type="text"
                    id="invoiceNumber"
                    v-model="invoice.invoiceNumber"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>

                <div>
                  <label for="invoiceDate" class="block text-sm font-medium text-gray-700"
                    >Invoice Date</label
                  >
                  <input
                    type="date"
                    id="invoiceDate"
                    v-model="invoice.invoiceDate"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>
            </section>

            <!-- Line Items Section -->
            <section>
              <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold text-primary">Line Items</h3>
              </div>

              <div class="space-y-4">
                <!-- Add header row -->
                <div
                  class="hidden md:grid grid-cols-12 gap-4 items-center font-medium text-gray-700 mb-2"
                >
                  <div class="col-span-5">Description</div>
                  <div class="col-span-2">Quantity</div>
                  <div class="col-span-2">Price</div>
                  <div class="col-span-2 text-right pr-12">Total</div>
                  <div class="col-span-1"></div>
                </div>
                <div
                  v-for="(item, index) in invoice.lineItems"
                  :key="index"
                  :class="[
                    'md:grid md:grid-cols-12 md:gap-4 md:items-center',
                    'flex flex-col space-y-4 md:space-y-0 p-4 mb-4 md:mb-0 bg-gray-50 md:bg-transparent rounded-lg md:rounded-none'
                  ]"
                >
                  <!-- Mobile labels and inputs -->
                  <div class="col-span-5">
                    <label :for="'description-' + index" class="block md:sr-only text-gray-600 mb-1"
                      >Description</label
                    >
                    <input
                      type="text"
                      :id="'description-' + index"
                      v-model="item.description"
                      placeholder="Description"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    />
                  </div>

                  <div class="col-span-2">
                    <label :for="'quantity-' + index" class="block md:sr-only text-gray-600 mb-1"
                      >Quantity</label
                    >
                    <input
                      type="number"
                      :id="'quantity-' + index"
                      v-model="item.quantity"
                      placeholder="Qty"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    />
                  </div>

                  <div class="col-span-2">
                    <label :for="'price-' + index" class="block md:sr-only text-gray-600 mb-1"
                      >Price</label
                    >
                    <input
                      type="number"
                      :id="'price-' + index"
                      v-model="item.price"
                      placeholder="Price"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    />
                  </div>

                  <div class="col-span-2">
                    <label class="block md:sr-only text-gray-600 mb-1">Total</label>
                    <p class="text-right font-medium pr-12">
                      ₵{{ (item.quantity * item.price).toFixed(2) }}
                    </p>
                  </div>
                </div>
                <div class="flex flex-col md:flex-row justify-end gap-4 mt-4">
                  <button
                    type="button"
                    @click="addLineItem"
                    class="w-full md:w-auto bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-lg transition duration-300 text-sm md:text-base"
                  >
                    Add Item
                  </button>
                  <button
                    type="button"
                    @click="removeLastItem"
                    :disabled="invoice.lineItems.length <= 1"
                   class="w-full md:w-auto bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                  >
                    Remove Item
                  </button>
                </div>
              </div>
            </section>

            <!-- Totals Section -->
            <section class="border-t pt-6">
              <div class="flex justify-end">
                <div class="w-64 space-y-3">
                  <div class="flex justify-between">
                    <span class="font-medium">Subtotal:</span>
                    <span>₵{{ subtotal.toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="font-medium">VAT (15%):</span>
                    <span>₵{{ vat.toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>₵{{ total.toFixed(2) }}</span>
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>
      </section>

      <!-- Preview Section -->
      <section class="mt-16 pt-16 border-t border-gray-200">
        <h2 class="text-3xl font-bold text-center mb-12">Invoice Preview</h2>
        <div class="max-w-5xl mx-auto">
          <InvoicePreview :invoice="invoice" />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import InvoicePreview from '@/components/InvoicePreview.vue'

interface LineItem {
  description: string
  quantity: number
  price: number
}

interface Invoice {
  companyName: string
  companyPhone: string
  customerName: string
  customerPhone: string
  invoiceNumber: string
  invoiceDate: string
  lineItems: LineItem[]
}

const invoice = ref<Invoice>({
  companyName: '',
  companyPhone: '',
  customerName: '',
  customerPhone: '',
  invoiceNumber: '',
  invoiceDate: new Date().toISOString().split('T')[0],
  lineItems: [{ description: '', quantity: 1, price: 0 }]
})

const addLineItem = () => {
  invoice.value.lineItems.push({ description: '', quantity: 1, price: 0 })
}

const removeLastItem = () => {
  if (invoice.value.lineItems.length > 1) {
    invoice.value.lineItems.pop()
  }
}

const subtotal = computed(() => {
  return invoice.value.lineItems.reduce((sum, item) => sum + item.quantity * item.price, 0)
})

const vat = computed(() => subtotal.value * 0.15)
const total = computed(() => subtotal.value + vat.value)

const handleSubmit = () => {
  // To be implemented
  console.log('Download PDF')
}
</script>

<style scoped>
.router-link-active {
  font-weight: bold;
}
</style>
