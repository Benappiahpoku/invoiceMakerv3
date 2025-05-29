<!--
  InvoicePreview.vue
  - Displays a responsive, printable invoice preview for both mobile and desktop.
  - Accepts all invoice data and logo as props.
  - Handles missing data gracefully with placeholders.
  - Uses only Tailwind utility classes for styling.
  - Prepares for PDF/WhatsApp export (PDF always uses desktop layout).
  - No external dependencies required for preview.
-->

<template>
  <!-- ===== [New Feature] START ===== -->
  <!-- Responsive container: mobile-first, desktop-friendly -->
  <div
    :id="previewId || ''"
    class="bg-white rounded-lg shadow-lg p-4 sm:p-8 max-w-full mx-auto"
  >
    <!-- Invoice Header: Logo + Company Info -->
    <div
      class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-8 gap-4"
    >
      <div class="flex flex-col items-center sm:items-start">
        <!-- Company Logo (if present) -->
        <div
          class="w-24 h-24 bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden"
        >
          <img
            v-if="companyLogo"
            :src="companyLogo"
            alt="Company Logo"
            class="object-contain w-full h-full"
          />
          <span v-else class="text-gray-400 text-xs text-center">No Logo</span>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 text-center sm:text-left">
          {{ invoice.companyName || 'Company Name' }}
        </h2>
        <p class="text-gray-600 text-center sm:text-left">
          {{ invoice.companyPhone || 'Phone Number' }}
        </p>
      </div>
      <div class="text-center sm:text-right mt-4 sm:mt-0">
        <h1 class="text-4xl font-bold text-primary mb-2">INVOICE</h1>
        <p class="text-gray-600">
         <span class="font-bold">Invoice #: </span> {{ invoice.invoiceNumber || 'Number' }}
        </p>
        <p class="text-gray-600">
          <span class="font-bold"> Date: </span> {{ invoice.invoiceDate || 'Date' }}
        </p>
      </div>
    </div>

    <!-- Bill To Section -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-gray-700 mb-2">Bill To:</h3>
      <p class="text-gray-900 font-medium">
        {{ invoice.customerName || 'Customer Name' }}
      </p>
      <p class="text-gray-600">
        {{ invoice.customerPhone || 'Phone Number' }}
      </p>
    </div>

    <!-- Items Table: Responsive for mobile/desktop -->
    <div class="mb-8">
      <!-- Desktop Table -->
      <table class="w-full hidden sm:table">
        <thead>
          <tr class="border-b-2 border-gray-200">
            <th class="text-left py-3 px-4 font-bold">   Description</th>
            <th class="text-center py-3 px-4 font-bold">Quantity</th>
            <th class="text-right py-3 px-4 font-bold">Price</th>
            <th class="text-right py-3 px-4 font-bold" >Total</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in invoice.lineItems"
            :key="index"
            class="border-b border-gray-100"
          >
            <td class="py-3 px-4">
              {{ item.description || 'Item description' }}
            </td>
            <td class="text-center py-3 px-4">
              {{ item.quantity || 0 }}
            </td>
            <td class="text-right py-3 px-4">
              ₵{{ item.price?.toFixed(2) || '0.00' }}
            </td>
            <td class="text-right py-3 px-4">
              ₵{{ ((item.quantity || 0) * (item.price || 0)).toFixed(2) }}
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Mobile Card List -->
      <div class="sm:hidden flex flex-col gap-4">
        <div
          v-for="(item, index) in invoice.lineItems"
          :key="index"
          class="bg-gray-50 rounded-lg p-4 flex flex-col"
        >
          <div class="flex justify-between">
            <span class="font-medium text-gray-700 ">Description:</span>
            <span>{{ item.description || 'Item' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-medium text-gray-700">Quantity:</span>
            <span>{{ item.quantity || 0 }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-medium text-gray-700">Price:</span>
            <span>₵{{ item.price?.toFixed(2) || '0.00' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-medium text-gray-700">Total:</span>
            <span>₵{{ ((item.quantity || 0) * (item.price || 0)).toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Totals Section -->
    <div class="flex justify-end">
      <div class="w-full sm:w-64 space-y-3">
        <div class="flex justify-between">
          <span class="font-medium">Subtotal:</span>
          <span>₵{{ subtotal.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-medium">
            VAT ({{ vatLabel }}):
          </span>
          <span>₵{{ vatAmount.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
          <span>Total:</span>
          <span>₵{{ total.toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </div>
  <!-- ===== [New Feature] END ===== -->
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
// InvoicePreview.vue: Responsive, printable invoice preview for mobile and desktop.
// Accepts all invoice data and logo as props. Handles missing data gracefully.
// Uses only Tailwind utility classes. Prepares for PDF/WhatsApp export.

// ===== Imports & Props =====
import { computed } from 'vue'

const props = defineProps<{
  invoice: {
    companyName: string
    companyPhone: string
    customerName: string
    customerPhone: string
    invoiceNumber: string
    invoiceDate: string
    lineItems: {
      description: string
      quantity: number
      price: number
    }[]
    vatType?: 'none' | 'flat' | 'standard'
  }
  companyLogo?: string | null
  previewId?: string // For PDF targeting
}>()

// ===== [New Feature] START =====
// Subtotal calculation
const subtotal = computed(() =>
  props.invoice.lineItems.reduce(
    (sum, item) => sum + (item.quantity || 0) * (item.price || 0),
    0
  )
)

// VAT label and amount based on invoice.vatType
const vatLabel = computed(() => {
  switch (props.invoice.vatType) {
    case 'flat':
      return '4%'
    case 'standard':
      return '21.5%'
    default:
      return '0%'
  }
})

const vatAmount = computed(() => {
  switch (props.invoice.vatType) {
    case 'flat':
      return subtotal.value * 0.04
    case 'standard':
      return subtotal.value * 0.215
    default:
      return 0
  }
})

const total = computed(() => subtotal.value + vatAmount.value)
// ===== [New Feature] END =====
</script>