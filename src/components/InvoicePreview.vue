<template>
  <div class="bg-white rounded-lg shadow-lg p-8">
    <!-- Invoice Header -->
    <div class="flex justify-between items-start mb-8">
      <div>
        <div class="w-24 h-24 bg-gray-100 rounded-lg mb-4"></div>
        <h2 class="text-2xl font-bold text-gray-900">{{ invoice.companyName || 'Company Name' }}</h2>
        <p class="text-gray-600">{{ invoice.companyPhone || 'Phone Number' }}</p>
      </div>
      <div class="text-right">
        <h1 class="text-4xl font-bold text-primary mb-2">INVOICE</h1>
        <p class="text-gray-600">Invoice #: {{ invoice.invoiceNumber || 'Number' }}</p>
        <p class="text-gray-600">Date: {{ invoice.invoiceDate || 'Date' }}</p>
      </div>
    </div>

    <!-- Bill To Section -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-gray-700 mb-2">Bill To:</h3>
      <p class="text-gray-900 font-medium">{{ invoice.customerName || 'Customer Name' }}</p>
      <p class="text-gray-600">{{ invoice.customerPhone || 'Phone Number' }}</p>
    </div>

    <!-- Items Table -->
    <div class="mb-8">
      <table class="w-full">
        <thead>
          <tr class="border-b-2 border-gray-200">
            <th class="text-left py-3 px-4">Description</th>
            <th class="text-center py-3 px-4">Quantity</th>
            <th class="text-right py-3 px-4">Price</th>
            <th class="text-right py-3 px-4">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in invoice.lineItems" :key="index" class="border-b border-gray-100">
            <td class="py-3 px-4">{{ item.description || 'Item description' }}</td>
            <td class="text-center py-3 px-4">{{ item.quantity || 0 }}</td>
            <td class="text-right py-3 px-4">₵{{ item.price?.toFixed(2) || '0.00' }}</td>
            <td class="text-right py-3 px-4">₵{{ ((item.quantity || 0) * (item.price || 0)).toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Totals -->
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
        <div class="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
          <span>Total:</span>
          <span>₵{{ total.toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  }
}>()

const subtotal = computed(() => {
  return props.invoice.lineItems.reduce((sum, item) => sum + (item.quantity * item.price), 0)
})

const vat = computed(() => subtotal.value * 0.15)
const total = computed(() => subtotal.value + vat.value)
</script>
