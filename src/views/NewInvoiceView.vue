<!--
  NewInvoiceView.vue
  - Invoice creation form with company logo upload, preview, and persistence.
  - Ghana mobile-first, offline-friendly, touch-optimized.
  - Follows Stratonea coding/documentation standards.
  - Now includes VAT mechanism with selectable VAT type and dynamic calculation.
  - Now includes Save/Load/Clear Defaults for company info.
  - Now connects ActionHub for PDF/WhatsApp sharing.
  - Now supports "Custom" VAT type: user can enter their own VAT percentage, which is used in calculations and persisted.
  - Now uses selected currency symbol everywhere subtotal, VAT, and total are shown.
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
            </div>
            <div class="grid md:grid-cols-2 gap-6">

              <!-- Logo Upload & Preview -->
              <div class="space-y-2">
                <label for="companyLogo" class="block text-sm font-medium text-gray-700">
                  Company Logo
                </label>
                <div
                  class="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center relative bg-gray-50">
                  <!-- Logo Preview -->
                  <img v-if="companyLogo" :src="companyLogo" alt="Company Logo"
                    class="object-contain w-full h-full rounded-lg" />
                  <!-- Placeholder if no logo -->
                  <span v-else class="text-gray-400 text-xs text-center px-2"> Tap to upload </span>
                  <!-- Remove Logo Button -->
                  <button v-if="companyLogo" type="button" @click.stop="removeLogo"
                    class="absolute top-1 right-1 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center shadow hover:bg-red-700 z-20"
                    aria-label="Remove Logo">
                    &times;
                  </button>
                  <!-- File input -->
                  <input id="companyLogo" type="file" accept="image/png,image/jpeg,image/jpg"
                    class="absolute inset-0 opacity-0 cursor-pointer z-10" @change="handleLogoUpload"
                    aria-label="Upload company logo" />
                </div>
                <!-- Show error if file is too large or wrong type -->
                <p v-if="logoError" class="text-xs text-red-600 mt-1">{{ logoError }}</p>
              </div>

              <!-- Company Name & Phone -->
              <div class="space-y-4">
                <div>
                  <label for="companyName" class="block text-sm font-medium text-gray-700">Company Name</label>
                  <input type="text" id="companyName" v-model="invoice.companyName"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
                </div>
                <div>
                  <label for="companyPhone" class="block text-sm font-medium text-gray-700">Company Phone</label>
                  <input type="tel" id="companyPhone" v-model="invoice.companyPhone"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
                </div>
                <!-- ===== [New Feature] START ===== -->
                <!-- Save/Load/Clear Defaults Buttons and Feedback -->
                <div class="flex gap-2 mt-2">
                  <button type="button" class="text-blue-600 hover:text-blue-800" @click="loadDefaults">
                    📥&nbsp;Load Info
                  </button>

                  <button type="button" class="text-green-600 hover:text-green-800" @click="saveDefaults">
                    💾&nbsp;Save Info
                  </button>
                  <button type="button" class="text-red-600 hover:text-red-800" @click="clearDefaults">
                    🧹&nbsp;Clear Info
                  </button>
                </div>
                <p v-if="defaultSavedMessage" class="text-green-600 text-sm mt-2">
                  {{ defaultSavedMessage }}
                </p>
                <p v-if="defaultErrorMessage" class="text-red-600 text-sm mt-2">
                  {{ defaultErrorMessage }}
                </p>
                <!-- ===== [New Feature] END ===== -->
              </div>
            </div>
          </section>

          <!-- Customer Details Section -->
          <section>
            <h2 class="text-2xl font-bold text-primary mb-6">Customer Details</h2>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label for="customerName" class="block text-sm font-medium text-gray-700">Customer Name</label>
                <input type="text" id="customerName" v-model="invoice.customerName"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
              </div>
              <div>
                <label for="customerPhone" class="block text-sm font-medium text-gray-700">Customer Phone</label>
                <input type="tel" id="customerPhone" v-model="invoice.customerPhone"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
              </div>
            </div>
          </section>

          <!-- Invoice Details Section -->
          <section>
            <h2 class="text-2xl font-bold text-primary mb-6">Invoice Details</h2>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label for="invoiceNumber" class="block text-sm font-medium text-gray-700">Invoice Number</label>
                <input type="text" id="invoiceNumber" v-model="invoice.invoiceNumber"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
              </div>
              <div>
                <label for="invoiceDate" class="block text-sm font-medium text-gray-700">Invoice Date</label>
                <input type="date" id="invoiceDate" v-model="invoice.invoiceDate"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
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
              <div v-for="(item, index) in invoice.lineItems" :key="index" :class="[
                'md:grid md:grid-cols-12 md:gap-4 md:items-center',
                'flex flex-col space-y-4 md:space-y-0 p-4 mb-4 md:mb-0 bg-gray-50 md:bg-transparent rounded-lg md:rounded-none'
              ]">
                <div class="col-span-5">
                  <label :for="'description-' + index" class="block md:sr-only text-gray-600 mb-1">Description</label>
                  <input type="text" :id="'description-' + index" v-model="item.description" placeholder="Description"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
                </div>
                <div class="col-span-2">
                  <label :for="'quantity-' + index" class="block md:sr-only text-gray-600 mb-1">Quantity</label>
                  <input type="number" :id="'quantity-' + index" v-model="item.quantity" placeholder="Qty"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
                </div>
                <div class="col-span-2">
                  <label :for="'price-' + index" class="block md:sr-only text-gray-600 mb-1">Price</label>
                  <input type="number" :id="'price-' + index" v-model="item.price" placeholder="Price"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
                </div>
                <div class="col-span-2">
                  <label class="block md:sr-only text-gray-600 mb-1">Total</label>
                  <p class="text-right font-medium pr-12">
                    {{ currencySymbol + " "}}{{ formatCurrency(item.quantity * item.price) }}
                  </p>
                </div>
              </div>
              <!-- Add/Remove Item Buttons -->
              <div class="flex flex-col md:flex-row justify-end gap-4 mt-4">
                <button type="button" @click="addLineItem"
                  class="w-full md:w-auto bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-lg transition duration-300 text-sm md:text-base">
                  Add Item
                </button>
                <button type="button" @click="removeLastItem" :disabled="invoice.lineItems.length <= 1"
                  class="w-full md:w-auto bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base">
                  Remove Item
                </button>
              </div>
            </div>
          </section>

          <!-- Currency Selector Section -->
          <section>
            <!--
              Pass modelValue and @update:modelValue for v-model compatibility.
              This ensures the component works with TypeScript strict prop checks.
            -->
            <CurrencySelector :modelValue="invoice.currency" @update:modelValue="val => invoice.currency = val" />
          </section>

          <!-- VAT Selection Section with Custom Option -->
          <section>
            <label for="vatType" class="block text-sm font-medium text-gray-700 mb-2">Choose Tax Type</label>
            <select id="vatType" v-model="invoice.vatType" @change="persistVatType"
              class="block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary">
              <option value="none">None (0%)</option>
              <option value="flat">Flat Rate (4%)</option>
              <option value="standard">Standard Rate (21.9%)</option>
              <option value="custom">Custom Tax Rate (%)</option>
            </select>
            <!-- Show custom VAT input if selected -->
            <div v-if="invoice.vatType === 'custom'" class="mt-3 flex items-center gap-2">
              <label for="customVat" class="text-sm text-gray-700">Custom Tax:</label>
              <input id="customVat" type="number" min="0" max="100" step="0.01" v-model.number="customVatPercent"
                @input="persistCustomVat"
                class="w-24 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                aria-label="Custom VAT percentage" />
              <span class="text-gray-700">%</span>
              <span v-if="customVatError" class="text-xs text-red-600 ml-2">{{ customVatError }}</span>
            </div>
          </section>



          <!-- Totals Section -->
          <section class="border-t pt-6">
            <div class="flex justify-end">
              <div class="w-64 space-y-3">
                <div class="flex justify-between">
                  <span class="font-medium">Subtotal:</span>
                  <span>{{ currencySymbol + " " }}{{ formatCurrency(subtotal) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">Tax ({{ vatLabel }}):</span>
                  <span>{{ currencySymbol + " " }}{{ formatCurrency(vatAmount) }}</span>
                </div>
                <div class="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>{{ currencySymbol + " " }}{{ formatCurrency(total) }}</span>
                </div>
              </div>
            </div>
          </section>
        </form>
      </section>

      <!-- Preview Section -->
      <section class="mt-16 pt-16 border-t border-gray-200">
        <h2 class="text-3xl font-bold text-center mb-12">Invoice Preview</h2>
        <div class="max-w-5xl mx-auto" id="invoice-preview-pdf">
          <!-- Pass logo as prop to preview if needed -->
          <InvoicePreview :invoice="invoice" :companyLogo="companyLogo"
            :customVatPercent="Number(customVatPercent) || 0" :currency="invoice.currency" />
        </div>
      </section>

      <section>
        <Divider />
      </section>

      <ActionButtons @download-pdf="handleDownloadPDF" @share-whatsapp="handleShareWhatsApp"
        @reset-invoice-counter="resetInvoiceCounted" />

      <section>
        <Divider />
      </section>

      <InvoiceCounter />

      <section>
        <Divider />
      </section>


      <section>
        <ToolKitPreview />
      </section>

      <section>
        <Divider />
      </section>

      <section>
        <AppSwitcher type="invoice" />
      </section>

      <!-- ===== [New Feature] START ===== -->
      <!-- ActionHub: Floating action bar for PDF/WhatsApp sharing -->

      <ActionHub :invoice="invoice" :companyLogo="companyLogo" @download-pdf="handleDownloadPDF"
        @share-whatsapp="handleShareWhatsApp" @reset-invoice-counter="resetInvoiceCounted" />

    </div>
  </div>
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
// This file implements the invoice creation form for Stratonea InvoiceMaker v3.
// - Allows uploading, previewing, and persisting a company logo (with localForage).
// - Mobile-first, touch-optimized, and Ghana-ready.
// - All logic is self-contained for learning and clarity.
// - Now includes VAT mechanism with selectable VAT type and dynamic calculation.
// - Now connects ActionHub for PDF/WhatsApp sharing.
// - <!-- ===== [New Feature] START ===== -->
// - Now supports "Custom" VAT type: user can enter their own VAT percentage, which is used in calculations and persisted.
// - <!-- ===== [New Feature] END ===== -->

// ===== Imports =====
import { ref, computed, onMounted, watch } from 'vue'
import localforage from 'localforage'
import InvoicePreview from '@/components/layout/InvoicePreview.vue'
import ActionHub from '@/components/layout/ActionHub.vue'
import html2pdf from 'html2pdf.js'
import AppSwitcher from '../components/layout/AppSwitcher.vue'
import Divider from '@/components/base/Divider.vue'
import ToolKitPreview from '@/components/layout/ToolKitPreview.vue'
import CurrencySelector from '@/components/layout/CurrencySelector.vue'
import InvoiceCounter from '@/components/layout/InvoiceCounter.vue'
import { useInvoiceCounter } from '@/composables/useInvoiceCounter.ts'
import ActionButtons from '@/components/layout/ActionButtons.vue'

import { useDefaultCurrency } from '@/utils/useDefaultCurrency'


const { incrementInvoiceCount} = useInvoiceCounter()

// ===== Types & Interfaces =====

/**
 * Supported VAT types for Ghanaian businesses.
 * Now includes 'custom' for user-defined VAT.
 */
type VatType = 'none' | 'flat' | 'standard' | 'custom'

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
  vatType: VatType // VAT type selection, now includes 'custom'
  currency: string
}

// ===== Reactive State =====

// Main invoice data, with VAT type defaulting to 'none'
const invoice = ref<Invoice>({
  companyName: '',
  companyPhone: '',
  customerName: '',
  customerPhone: '',
  invoiceNumber: '',
  invoiceDate: new Date().toISOString().split('T')[0],
  lineItems: [{ description: '', quantity: 1, price: 0 }],
  vatType: 'none' ,// Default VAT type is 'none',
  currency: 'GHS',
})

/**
 * On first load, auto-detect and set default currency using browser timezone.
 * - Only sets if user hasn't chosen before (first visit).
 * - User can override by changing currency in UI.
 * - Uses localStorage flag to remember if auto-detect has run.
 */
onMounted(() => {
  const hasSetCurrency = localStorage.getItem('currencyAutoSet')
  if (!hasSetCurrency) {
    const detected = useDefaultCurrency()
    invoice.value.currency = detected.code
    localStorage.setItem('currencyAutoSet', '1')
  }
})


// Holds the base64 logo string (or null)
const companyLogo = ref<string | null>(null)

// Error message for logo upload
const logoError = ref<string | null>(null)

// ===== [Save Defaults Feature] START =====
// Feedback state for Save/Load/Clear Defaults
const defaultSavedMessage = ref<string | null>(null)
const defaultErrorMessage = ref<string | null>(null)


// ===== Invoice Count State =====
/**
 * Tracks if the current invoice has already been counted for analytics.
 * This prevents double-counting when both download and share are triggered.
 */
const invoiceCounted = ref(false)
/**
 * Saves current company info as defaults in localforage.
 * Only saves companyName and companyPhone.
 * Shows a success or error message.
 */
async function saveDefaults() {
  if (!invoice.value.companyName || !invoice.value.companyPhone) {
    defaultErrorMessage.value = 'Please fill in company name and phone before saving.'
    defaultSavedMessage.value = null
    return
  }
  await localforage.setItem('defaultSettings', {
    companyName: invoice.value.companyName,
    companyPhone: invoice.value.companyPhone
  })
  defaultSavedMessage.value = 'Defaults saved!'
  defaultErrorMessage.value = null
}

/**
 * Loads saved defaults from localforage and pre-fills company info fields.
 * Does not trigger form submission or overwrite other fields.
 */
async function loadDefaults() {
  const defaults = await localforage.getItem<{ companyName: string; companyPhone: string }>(
    'defaultSettings'
  )
  if (defaults) {
    invoice.value.companyName = defaults.companyName
    invoice.value.companyPhone = defaults.companyPhone
    defaultSavedMessage.value = 'Defaults loaded.'
    defaultErrorMessage.value = null
  } else {
    defaultErrorMessage.value = 'No defaults found.'
    defaultSavedMessage.value = null
  }
}

/**
 * Clears saved defaults from localforage.
 * Shows a confirmation message.
 */
async function clearDefaults() {
  await localforage.removeItem('defaultSettings')
  defaultSavedMessage.value = 'Defaults cleared.'
  defaultErrorMessage.value = null
}
// ===== [Save Defaults Feature] END =====

// ===== [New Feature] START =====
// Custom VAT percentage state and validation
const customVatPercent = ref<number>(0)
const customVatError = ref<string | null>(null)

/**
 * Persists custom VAT percent to localForage and validates input.
 * Only allows 0-100%.
 */
async function persistCustomVat() {
  if (customVatPercent.value < 0 || customVatPercent.value > 100) {
    customVatError.value = 'Enter a value between 0 and 100.'
    return
  }
  customVatError.value = null
  await localforage.setItem('customVatPercent', customVatPercent.value)
}

// ===== [New Feature] START =====
/**
 * Returns the currency symbol for the selected currency code.
 * Used everywhere subtotal, VAT, and total are shown.
 */
const currencySymbol = computed(() => {
  // Map of currency codes to symbols
  const symbols: Record<string, string> = {
    GHS: 'GH₵',
    NGN: '₦',
    KES: 'KSh',
    ZAR: 'R',
    XOF: 'CFA ',
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£',
    CAD: 'CA$',
    AUD: 'A$'
  }
  // Default to code if not found
  return symbols[invoice.value.currency] || invoice.value.currency + ' '
})

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
 * Loads logo, VAT type, and custom VAT percent from localForage on mount.
 * If found, sets preview and VAT selection.
 */
onMounted(async () => {
  const storedLogo = await localforage.getItem<string>('companyLogo')
  if (storedLogo) {
    companyLogo.value = storedLogo
  }
  // Restore VAT type if previously saved
  const storedVatType = await localforage.getItem<VatType>('vatType')
  if (storedVatType) {
    invoice.value.vatType = storedVatType
  }
  // ===== [New Feature] START =====
  // Restore custom VAT percent if previously saved
  const storedCustomVat = await localforage.getItem<number>('customVatPercent')
  if (typeof storedCustomVat === 'number') {
    customVatPercent.value = storedCustomVat
  } else {
    customVatPercent.value = 0
  }
  // ===== [New Feature] END =====

  // ===== [Save Defaults Feature] START =====
  // Load company info defaults if present
  const defaults = await localforage.getItem<{ companyName: string; companyPhone: string }>(
    'defaultSettings'
  )
  if (defaults) {
    invoice.value.companyName = defaults.companyName
    invoice.value.companyPhone = defaults.companyPhone
  }
  // ===== [Save Defaults Feature] END =====
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

/**
 * Persists VAT type selection in localForage.
 * If switching to custom, also persist the custom percent.
 */
async function persistVatType() {
  await localforage.setItem('vatType', invoice.value.vatType)
  // ===== [New Feature] START =====
  if (invoice.value.vatType === 'custom') {
    await persistCustomVat()
  }
  // ===== [New Feature] END =====
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
  invoice.value.lineItems.reduce((sum, item) => sum + item.quantity * item.price, 0)
)

/**
 * Returns the VAT label for display based on selection.
 * Shows custom percent if selected.
 */
const vatLabel = computed(() => {
  switch (invoice.value.vatType) {
    case 'flat':
      return '4%'
    case 'standard':
      return '21.9%'
    // ===== [New Feature] START =====
    case 'custom':
      return `${customVatPercent.value || 0}%`
    // ===== [New Feature] END =====
    default:
      return '0%'
  }
})

/**
 * Calculates VAT amount based on selected VAT type.
 * - none: 0%
 * - flat: 4%
 * - standard: 21.9%
 * - custom: user-defined percent
 */
const vatAmount = computed(() => {
  switch (invoice.value.vatType) {
    case 'flat':
      return subtotal.value * 0.04
    case 'standard':
      return subtotal.value * 0.219
    // ===== [New Feature] START =====
    case 'custom':
      // Clamp to 0-100 for safety
      const percent = Math.max(0, Math.min(customVatPercent.value, 100))
      return subtotal.value * (percent / 100)
    // ===== [New Feature] END =====
    default:
      return 0
  }
})

/**
 * Calculates total (subtotal + VAT).
 */
const total = computed(() => subtotal.value + vatAmount.value)

// ===== Watchers =====

/**
 * Watch VAT type and persist to localForage whenever it changes.
 */
watch(
  () => invoice.value.vatType,
  async (newType) => {
    await localforage.setItem('vatType', newType)
    // ===== [New Feature] START =====
    if (newType === 'custom') {
      await persistCustomVat()
    }
    // ===== [New Feature] END =====
  }
)

// ===== [New Feature] START =====
/**
 * Watch customVatPercent and persist when changed, only if custom VAT is selected.
 */
watch(
  customVatPercent,
  async () => {
    if (invoice.value.vatType === 'custom') {
      await persistCustomVat()
    }
  }
)
// ===== [New Feature] END =====

// ===== Form Submission (stub) =====

/**
 * Handles form submission.
 * (To be implemented: save or download invoice)
 */
function handleSubmit() {
  // To be implemented
  console.log('Download PDF')
}

// ===== [New Feature] START =====
/**
 * Handles PDF download event from ActionHub.
 * Uses html2pdf.js to generate and download a PDF of the invoice preview.
 * Ghana-ready: simple, mobile-first, and works offline.
 */
function handleDownloadPDF() {
  // 1. Find the preview DOM node
  const previewEl = document.getElementById('invoice-preview-pdf')
  if (!previewEl) {
    alert('Could not find invoice preview to export. Please try again.')
    return
  }

  // 2. Configure html2pdf options for Ghana mobile users
  const fileName = `Invoice-${invoice.value.invoiceNumber
      ? `${invoice.value.invoiceNumber}${invoice.value.customerName ? '--' + invoice.value.customerName.trim() : ''}`
      : invoice.value.customerName?.trim() || 'Customer'
    }.pdf`

  const opt = {
    margin: [0.5, 0.8, 0.5, 0.8], // [top, right, bottom, left] margins in inches
    filename: fileName,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true // Better text rendering
    },
    jsPDF: {
      unit: 'in',
      format: 'a4',
      orientation: 'portrait',
      putOnlyUsedFonts: true,
      floatPrecision: 16 // Better text positioning
    },

  }

  // 3. Generate and save PDF
  html2pdf()
    .set(opt)
    .from(previewEl)
    .save()
    .catch(() => {
      alert('Could not generate PDF. Please try again or check your internet connection.')
    })

  

  if (!invoiceCounted.value) {
    incrementInvoiceCount()
    invoiceCounted.value = true
    console.log('[Invoice] Counter incremented!')
  } else {
    console.log('[Invoice] Counter NOT incremented (already counted for this invoice)')
  }
  resetInvoiceCounted()
}

/**
 * Handles WhatsApp share event from ActionHub.
 * Generates a WhatsApp message link with invoice summary and opens it.
 * Ghana-ready: uses simple text, no attachments (for bandwidth).
 */
function handleShareWhatsApp() {
  // 1. Build invoice summary message with improved formatting
  const lines = [
    `🧾 *INVOICE*`,
    `━━━━━━━━━━━━━━`,
    `*From:* ${invoice.value.companyName || 'My Company'}`,
    invoice.value.companyPhone ? `📞 ${invoice.value.companyPhone}` : '',
    ``,
    `📅 *Date:* ${invoice.value.invoiceDate}`,
    invoice.value.invoiceNumber ? `🔢 *Invoice #:* ${invoice.value.invoiceNumber}` : '',
    ``,
    `👤 *To:* ${invoice.value.customerName || 'Customer'}`,
    invoice.value.customerPhone ? `📱 ${invoice.value.customerPhone}` : '',
    ``,
    `📋 *ITEMS*`,
    `━━━━━━━━━━━━━━`,
    ...invoice.value.lineItems.map(
      (item, idx) => item.description &&
        `${idx + 1}. *${item.description}*\n` +
        `   • Qty: ${item.quantity}\n` +
        `   • Price: ₵${formatCurrency(item.price)}\n` +
        `   • Total: ₵${formatCurrency(item.quantity * item.price)}`
    ).filter(Boolean), // Remove empty items
    ``,
    `💰 *SUMMARY*`,
    `━━━━━━━━━━━━━━`,
    `Subtotal: ₵${formatCurrency(subtotal.value)}`,
    `VAT (${vatLabel.value}): ₵${formatCurrency(vatAmount.value)}`,
    `*TOTAL: ₵${formatCurrency(total.value)}*`,
    ``,
    `Generated with Stratonea Invoice Maker`
  ].filter(Boolean) // Remove empty lines

  const message = lines.join('\n')

  // 2. Format WhatsApp link
  const waUrl = `https://wa.me/?text=${encodeURIComponent(message)}`

  // 3. Open WhatsApp
  window.open(waUrl, '_blank')



  if (!invoiceCounted.value) {
    incrementInvoiceCount()
    invoiceCounted.value = true
    console.log('[Invoice] Counter incremented!')
  } else {
    console.log('[Invoice] Counter NOT incremented (already counted for this invoice)')
  }
  resetInvoiceCounted()
}

// ===== [New Feature] START =====
/**
 * Formats a number with commas for thousands and fixed 2 decimal places
 * Examples:
 * - 1000 -> "1,000.00"
 * - 20000 -> "20,000.00"
 * - 1234567.89 -> "1,234,567.89"
 */
function formatCurrency(amount: number): string {
  return amount.toLocaleString('en-GH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}


/**
 * Resets the invoice counted flag when starting a new invoice.
 */
function resetInvoiceCounted() {
  invoiceCounted.value = false
}


</script>