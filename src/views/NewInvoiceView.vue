<!--
  NewInvoiceView.vue
  - Invoice creation form with company logo upload, preview, and persistence.
  - Ghana mobile-first, offline-friendly, touch-optimized.
  - Follows Stratonea coding/documentation standards.
-->

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="w-full max-w-md mx-auto px-2 py-6 sm:max-w-lg sm:px-4 md:max-w-2xl lg:max-w-3xl">
      <!-- Invoice Form Section -->
      <section>
        <h1 class="text-3xl text-center font-bold text-primary mb-8">Create New Invoice</h1>
        <form @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow-lg p-6 space-y-8">
          <!-- Company Details Section -->
          <section>
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold text-primary">Company Details</h2>
              <button type="button" class="text-blue-600 hover:text-blue-800">Load Saved Details</button>
            </div>

            <div class="grid md:grid-cols-2 gap-6">

              
              <!-- Logo Upload & Preview -->
              <div class="space-y-2">
                <label for="companyLogo" class="block text-sm font-medium text-gray-700">
                  Company Logo
                </label>

                <!-- Company Logo Upload & Remove -->
<div class="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center relative bg-gray-50">
  <!-- Logo Preview -->
  <img
    v-if="companyLogo"
    :src="companyLogo"
    alt="Company Logo"
    class="object-contain w-full h-full rounded-lg"
  />
  <!-- Placeholder if no logo -->
  <span v-else class="text-gray-400 text-xs text-center px-2">
    Tap to upload
  </span>
  <!-- Remove Logo Button (z-20 so it's above the file input) -->
  <button
    v-if="companyLogo"
    type="button"
    @click.stop="removeLogo"
    class="absolute top-1 right-1 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center shadow hover:bg-red-700 z-20"
    aria-label="Remove Logo"
  >
    &times;
  </button>
  <!-- File input (z-10, does not cover remove button) -->
  <input
    id="companyLogo"
    type="file"
    accept="image/png,image/jpeg,image/jpg"
    class="absolute inset-0 opacity-0 cursor-pointer z-10"
    @change="handleLogoUpload"
    aria-label="Upload company logo"
  />
</div>


                <!-- Show error if file is too large or wrong type -->
                <p v-if="logoError" class="text-xs text-red-600 mt-1">{{ logoError }}</p>
              </div>

              <!-- Company Name & Phone -->
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
              <h3 class="text-2xl font-bold text-primary">Line Items</h3>
            </div>
            <div class="space-y-4">
              <!-- Table header for desktop -->
              <div class="hidden md:grid grid-cols-12 gap-4 items-center font-medium text-gray-700 mb-2">
                <div class="col-span-5">Description</div>
                <div class="col-span-2">Quantity</div>
                <div class="col-span-2">Price</div>
                <div class="col-span-2 text-right pr-12">Total</div>
                <div class="col-span-1"></div>
              </div>
              <!-- Line item rows -->
              <div
                v-for="(item, index) in invoice.lineItems"
                :key="index"
                :class="[
                  'md:grid md:grid-cols-12 md:gap-4 md:items-center',
                  'flex flex-col space-y-4 md:space-y-0 p-4 mb-4 md:mb-0 bg-gray-50 md:bg-transparent rounded-lg md:rounded-none'
                ]"
              >
                <div class="col-span-5">
                  <label :for="'description-' + index" class="block md:sr-only text-gray-600 mb-1">Description</label>
                  <input
                    type="text"
                    :id="'description-' + index"
                    v-model="item.description"
                    placeholder="Description"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
                <div class="col-span-2">
                  <label :for="'quantity-' + index" class="block md:sr-only text-gray-600 mb-1">Quantity</label>
                  <input
                    type="number"
                    :id="'quantity-' + index"
                    v-model="item.quantity"
                    placeholder="Qty"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
                <div class="col-span-2">
                  <label :for="'price-' + index" class="block md:sr-only text-gray-600 mb-1">Price</label>
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
              <!-- Add/Remove Item Buttons -->
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
                  <span class="font-medium">VAT (4%):</span>
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
      </section>

      <!-- Preview Section -->
      <section class="mt-16 pt-16 border-t border-gray-200">
        <h2 class="text-3xl font-bold text-center mb-12">Invoice Preview</h2>
        <div class="max-w-5xl mx-auto">
          <!-- Pass logo as prop to preview if needed -->
          <InvoicePreview :invoice="invoice" :companyLogo="companyLogo" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
// This file implements the invoice creation form for Stratonea InvoiceMaker v3.
// - Allows uploading, previewing, and persisting a company logo (with localForage).
// - Mobile-first, touch-optimized, and Ghana-ready.
// - All logic is self-contained for learning and clarity.

// ===== Imports =====
import { ref, computed, onMounted } from 'vue'
import localforage from 'localforage'
import InvoicePreview from '@/components/InvoicePreview.vue'

// ===== Types & Interfaces =====
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

// ===== Reactive State =====

// Main invoice data
const invoice = ref<Invoice>({
  companyName: '',
  companyPhone: '',
  customerName: '',
  customerPhone: '',
  invoiceNumber: '',
  invoiceDate: new Date().toISOString().split('T')[0],
  lineItems: [{ description: '', quantity: 1, price: 0 }]
})

// Holds the base64 logo string (or null)
const companyLogo = ref<string | null>(null)

// Error message for logo upload
const logoError = ref<string | null>(null)

// ===== Helper Functions =====

/**
 * Handles logo file upload:
 * - Accepts only images (png, jpg, jpeg)
 * - Checks file size (max 500KB)
 * - Converts to base64 and saves to localForage
 * - Shows preview immediately
 * - Shows error if invalid
 */
async function handleLogoUpload(event: Event) {
  logoError.value = null // Reset error
  const input = event.target as HTMLInputElement
  if (!input.files || input.files.length === 0) return

  const file = input.files[0]
  // Check file type
  if (!file.type.startsWith('image/')) {
    logoError.value = 'Only image files are allowed.'
    return
  }
  // Check file size (max 500KB)
  if (file.size > 500 * 1024) {
    logoError.value = 'File too large. Please upload a smaller logo.'
    return
  }
  // Convert to base64 for preview and storage
  const reader = new FileReader()
  reader.onload = async () => {
    const base64 = reader.result as string
    companyLogo.value = base64
    // Save to localForage for persistence
    await localforage.setItem('companyLogo', base64)
  }
  reader.readAsDataURL(file)
}

/**
 * Loads logo from localForage on mount.
 * If found, sets preview.
 */
onMounted(async () => {
  const storedLogo = await localforage.getItem<string>('companyLogo')
  if (storedLogo) {
    companyLogo.value = storedLogo
  }
})

/**
 * Removes the logo from UI and storage.
 * Shows a toast (simple alert for now).
 */
async function removeLogo() {
  await localforage.removeItem('companyLogo')
  companyLogo.value = null
  alert('Logo removed.') // Replace with toast if you have one
}

// ===== Line Items Logic =====

/**
 * Adds a new blank line item.
 */
function addLineItem() {
  invoice.value.lineItems.push({ description: '', quantity: 1, price: 0 })
}

/**
 * Removes the last line item if more than one exists.
 */
function removeLastItem() {
  if (invoice.value.lineItems.length > 1) {
    invoice.value.lineItems.pop()
  }
}

// ===== Totals Calculation =====

/**
 * Calculates subtotal of all line items.
 */
const subtotal = computed(() =>
  invoice.value.lineItems.reduce((sum, item) => sum + (item.quantity * item.price), 0)
)

/**
 * Calculates VAT (4%).
 */
const vat = computed(() => subtotal.value * 0.04)

/**
 * Calculates total (subtotal + VAT).
 */
const total = computed(() => subtotal.value + vat.value)

// ===== Form Submission (stub) =====

/**
 * Handles form submission.
 * (To be implemented: save or download invoice)
 */
function handleSubmit() {
  // To be implemented
  console.log('Download PDF')
}

</script>