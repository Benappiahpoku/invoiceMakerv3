<!--
  InvoicePreview.vue
  - Displays a responsive, printable invoice preview for both mobile and desktop.
  - Accepts all invoice data and logo as props.
  - Handles missing data gracefully with placeholders.
  - Uses only Tailwind utility classes for styling.
  - Prepares for PDF/WhatsApp export (PDF always uses desktop layout).
  - No external dependencies required for preview.
 - Now supports "Custom" VAT type: receives customVatPercent as a prop and displays/calculates accordingly.
 - Now supports dynamic currency symbol everywhere (uses currency prop).
-->

<template>
  <!-- ===== [New Feature] START ===== -->
  <!-- Responsive container: mobile-first, desktop-friendly -->
  <div :id="previewId || ''" class="bg-white rounded-lg shadow-lg p-4 sm:p-8 max-w-full mx-auto">
    <!-- Invoice Header: Logo + Company Info -->
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-8 gap-4">
      <div class="flex flex-col items-center sm:items-start">
        <!-- Company Logo (if present) -->
        <div class="w-24 h-24 bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
          <img v-if="companyLogo" :src="companyLogo" alt="Company Logo" class="object-contain w-full h-full" />
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
          <span class="font-bold"> Date: </span> {{ formatDate(invoice.invoiceDate) || 'Date' }}
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
            <th class="text-left py-3 px-4 font-bold"> Description</th>
            <th class="text-center py-3 px-4 font-bold">Quantity</th>
            <th class="text-right py-3 px-4 font-bold">Price</th>
            <th class="text-right py-3 px-4 font-bold">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in invoice.lineItems" :key="index" class="border-b border-gray-100">
            <td class="py-3 px-4">
              {{ item.description || 'Item description' }}
            </td>
            <td class="text-center py-3 px-4">
              {{ item.quantity || 0 }}
            </td>
            <td class="text-right py-3 px-4">
              {{ currencySymbol+ " "}}{{ formatCurrency(item.price || 0) }}
            </td>
            <td class="text-right py-3 px-4">
              {{ currencySymbol + " " }}{{ formatCurrency((item.quantity || 0) * (item.price || 0)) }}
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Mobile Card List -->
      <div class="sm:hidden flex flex-col gap-4">
        <div v-for="(item, index) in invoice.lineItems" :key="index" class="bg-gray-50 rounded-lg p-4 flex flex-col">
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
            <span>{{ currencySymbol + " " }}{{ formatCurrency(item.price || 0) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-medium text-gray-700">Total:</span>
            <span>{{ currencySymbol + " " }}{{ formatCurrency((item.quantity || 0) * (item.price || 0)) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Totals Section -->
    <div class="flex justify-end">
      <div class="w-full sm:w-64 space-y-3">
        <div class="flex justify-between">
          <span class="font-medium">Subtotal:</span>
          <span>{{ currencySymbol + " " }}{{ formatCurrency(subtotal) }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-medium">
            Tax ({{ vatLabel }}):
          </span>
          <span>{{ currencySymbol + " " }}{{ formatCurrency(vatAmount) }}</span>
        </div>
        <div class="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
          <span>Total:</span>
          <span>{{ currencySymbol + " " }}{{ formatCurrency(total) }}</span>
        </div>
       
      </div>
      
    </div>
    <div class="border-b border-gray-200 pt-9 "> </div>
    <div class=" flex pt-3 justify-center gap-2 text-xs text-gray-600">
                <span>Software developed by TekLumin (+233 594093926)</span>
            </div>
  </div>
  <!-- ===== [New Feature] END ===== -->
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
// InvoicePreview.vue: Responsive, printable invoice preview for mobile and desktop.
// Accepts all invoice data and logo as props. Handles missing data gracefully.
// Uses only Tailwind utility classes. Prepares for PDF/WhatsApp export.
// <!-- ===== [New Feature] START ===== -->
// Now supports "Custom" VAT type: receives customVatPercent as a prop and displays/calculates accordingly.
// <!-- ===== [New Feature] END ===== -->

// ===== Imports & Props =====
import { computed } from 'vue'
import { useDefaultCurrency } from '@/utils/useDefaultCurrency'

/**
 * Props for InvoicePreview
 * - invoice: Invoice data object (required)
 * - companyLogo: base64 string or null (optional)
 * - previewId: string for targeting PDF export (optional)
 * - customVatPercent: number (optional, only used if vatType is 'custom')
 */
const props = withDefaults(defineProps<{
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
    vatType?: 'none' | 'flat' | 'standard' | 'custom'
  }
  companyLogo?: string | null
  previewId?: string // For PDF targeting
  customVatPercent?: number | string // Accept both for safety
  currency: string
}>(), {
  customVatPercent: 0 // Default to 0 if not provided
})

/**
  * Computes the currency symbol for the given currency code.
 * Used everywhere subtotal, VAT, and total are shown.
 */
const currencySymbol = computed(() => {
  // Try to get symbol from config
  const { symbol } = useDefaultCurrency()
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
  return symbols[props.currency] || symbol || props.currency + ' '
})


// ===== Totals Calculation =====

/**
 * Calculates subtotal of all line items.
 * Handles undefined/null values gracefully.
 */
const subtotal = computed(() =>
  props.invoice.lineItems.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.price) || 0),
    0
  )
)

/**
 * Returns the VAT label for display based on selection.
 * Shows custom percent if selected.
 */
const vatLabel = computed(() => {
  switch (props.invoice.vatType) {
    case 'flat':
      return '4%'
    case 'standard':
      return '21.9%'
    case 'custom':
      // Always show as number, fallback to 0
      return `${Number(props.customVatPercent) || 0}%`
    default:
      return '0%'
  }
})

/**
 * Calculates VAT amount based on selected VAT type.
 * - none: 0%
 * - flat: 4%
 * - standard: 21.9%
 * - custom: user-defined percent (from prop)
 */
const vatAmount = computed(() => {
  switch (props.invoice.vatType) {
    case 'flat':
      return subtotal.value * 0.04
    case 'standard':
      return subtotal.value * 0.219
    case 'custom':
      // Clamp to 0-100 for safety, always use Number()
      const percent = Math.max(0, Math.min(Number(props.customVatPercent) || 0, 100))
      return subtotal.value * (percent / 100)
    default:
      return 0
  }
})

/**
 * Calculates total (subtotal + VAT).
 */
const total = computed(() => subtotal.value + vatAmount.value)

// ===== [New Feature] START =====
/**
 * Formats a number with commas for thousands and fixed 2 decimal places
 * Safely handles undefined/null values by defaulting to 0
 */
function formatCurrency(amount: number | undefined | null): string {
  const safeAmount = Number(amount) || 0
  return safeAmount.toLocaleString('en-GH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}
// ===== [New Feature] END =====

/**
 * Formats a date string (YYYY-MM-DD) to DD-MM-YYYY for Ghanaian users.
 * Returns original string if parsing fails.
 */
function formatDate(dateString: string): string {
  try {
    const [year, month, day] = dateString.split('-')
    return `${day}-${month}-${year}`
  } catch (error) {
    // If parsing fails, return original string
    return dateString
  }
}
</script>