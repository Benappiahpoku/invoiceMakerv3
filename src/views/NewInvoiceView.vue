<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Invoice Form Section -->
      <section>
        <h1 class="text-3xl font-bold text-primary mb-8">Create New Invoice</h1>
        <form @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow-lg p-6 space-y-8">
          <!-- Company Details Section -->
          <section>
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold text-primary">Company Details</h2>
              <button type="button" class="text-blue-600 hover:text-blue-800">Load Saved Details</button>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label for="companyLogo" class="block text-sm font-medium text-gray-700">Company Logo</label>
                <div class="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <span class="text-gray-500">Click to upload</span>
                </div>
              </div>

              <div class="space-y-4">
                <div>
                  <label for="companyName" class="block text-sm font-medium text-gray-700">Company Name</label>
                  <input
                    type="text"
                    id="companyName"
                    v-model="invoice.companyName"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>

                <div>
                  <label for="companyPhone" class="block text-sm font-medium text-gray-700">Company Phone</label>
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
            <h2 class="text-2xl font-bold text-primary mb-6">Customer Details</h2>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label for="customerName" class="block text-sm font-medium text-gray-700">Customer Name</label>
                <input
                  type="text"
                  id="customerName"
                  v-model="invoice.customerName"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>

              <div>
                <label for="customerPhone" class="block text-sm font-medium text-gray-700">Customer Phone</label>
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
            <h2 class="text-2xl font-bold text-primary mb-6">Invoice Details</h2>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label for="invoiceNumber" class="block text-sm font-medium text-gray-700">Invoice Number</label>
                <input
                  type="text"
                  id="invoiceNumber"
                  v-model="invoice.invoiceNumber"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>

              <div>
                <label for="invoiceDate" class="block text-sm font-medium text-gray-700">Invoice Date</label>
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
              <h2 class="text-2xl font-bold text-primary">Line Items</h2>
              <button
                type="button"
                @click="addLineItem"
                class="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition duration-300"
              >
                Add Item
              </button>
            </div>

            <div class="space-y-4">
              <div v-for="(item, index) in invoice.lineItems" :key="index" class="grid grid-cols-12 gap-4 items-center">
                <div class="col-span-5">
                  <label :for="'description-'+index" class="sr-only">Description</label>
                  <input
                    type="text"
                    :id="'description-'+index"
                    v-model="item.description"
                    placeholder="Description"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
                <div class="col-span-2">
                  <label :for="'quantity-'+index" class="sr-only">Quantity</label>
                  <input
                    type="number"
                    :id="'quantity-'+index"
                    v-model="item.quantity"
                    placeholder="Qty"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
                <div class="col-span-2">
                  <label :for="'price-'+index" class="sr-only">Price</label>
                  <input
                    type="number"
                    :id="'price-'+index"
                    v-model="item.price"
                    placeholder="Price"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
                <div class="col-span-2">
                  <p class="text-right font-medium">₵{{ (item.quantity * item.price).toFixed(2) }}</p>
                </div>
                <div class="col-span-1">
                  <button
                    type="button"
                    @click="removeLineItem(index)"
                    class="text-red-600 hover:text-red-800"
                    aria-label="Remove item"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
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

          <!-- Action Buttons (First Set) -->
          <div class="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              @click="previewInvoice"
              class="px-6 py-3 bg-secondary hover:bg-secondary-dark text-white rounded-md transition duration-300"
            >
              Preview Invoice
            </button>
            <button
              type="button"
              @click="shareWhatsApp"
              class="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
            >
              Share WhatsApp
            </button>
            <button
              type="submit"
              class="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-300"
            >
              Download PDF
            </button>
          </div>
        </form>
      </section>

      <!-- Preview Section -->
      <section class="mt-16 pt-16 border-t border-gray-200">
        <h2 class="text-3xl font-bold text-center mb-12">Invoice Preview</h2>
        <div class="max-w-5xl mx-auto">
          <InvoicePreview :invoice="invoice" />
          
          <!-- Action Buttons (Second Set) -->
          <div class="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              @click="shareWhatsApp"
              class="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
            >
              Share WhatsApp
            </button>
            <button
              type="button"
              @click="handleSubmit"
              class="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-300"
            >
              Download PDF
            </button>
          </div>
        </div>
      </section>
    </div>
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

const removeLineItem = (index: number) => {
  invoice.value.lineItems.splice(index, 1)
}

const subtotal = computed(() => {
  return invoice.value.lineItems.reduce((sum, item) => sum + (item.quantity * item.price), 0)
})

const vat = computed(() => subtotal.value * 0.15)
const total = computed(() => subtotal.value + vat.value)

// Function to preview invoice - will be implemented later
const previewInvoice = () => {
  // To be implemented
  console.log('Preview invoice')
}

const shareWhatsApp = () => {
  // To be implemented
  console.log('Share via WhatsApp')
}

const handleSubmit = () => {
  // To be implemented
  console.log('Download PDF')
}
</script>
