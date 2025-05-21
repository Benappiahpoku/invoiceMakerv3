<template>
  <div class="min-h-screen bg-gray-50 pb-16">
    <!-- Network status indicator for Ghana's intermittent connectivity -->
    <OfflineIndicator v-if="!networkInfo.isOnline" />

    <!-- Navigation -->
    <nav class="bg-primary-600 shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <router-link to="/" class="flex items-center space-x-4">
                <StratoneaLogo white />
                <span class="text-xl font-semibold text-white border-l pl-4 border-white/30">Invoice Maker</span>
              </router-link>
            </div>
            <!-- Desktop Navigation -->
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link v-for="item in navItems" :key="item.path" :to="item.path"
                class="inline-flex items-center px-8 py-4 text-white relative group transition-colors duration-200 font-semibold">
                <span class="relative z-10">{{ item.name }}</span>
              </router-link>
            </div>
          </div>

          <!-- Mobile menu button -->
          <div class="sm:hidden flex items-center">
            <button 
              @click="isMobileMenuOpen = !isMobileMenuOpen" 
              class="text-white p-2"
              aria-label="Main menu"
            >
              <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path 
                  :class="{'hidden': isMobileMenuOpen, 'inline-flex': !isMobileMenuOpen }"
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path 
                  :class="{'hidden': !isMobileMenuOpen, 'inline-flex': isMobileMenuOpen }"
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div :class="{'block': isMobileMenuOpen, 'hidden': !isMobileMenuOpen}" class="sm:hidden">
        <div class="pt-2 pb-3 space-y-1">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="block px-3 py-2 text-white font-medium hover:bg-primary-700"
            @click="isMobileMenuOpen = false"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <router-view />
    </main>

    <!-- Action Hub -->
    <ActionHub />
  </div>
</template>

<script setup lang="ts">
import { useNetworkStatus } from '@/composables/useNetworkStatus'
import { ref } from 'vue'
import OfflineIndicator from '@/components/base/OfflineIndicator.vue'
import StratoneaLogo from '@/components/StratoneaLogo.vue'
import ActionHub from '@/components/ActionHub.vue'

const { networkInfo } = useNetworkStatus()
const isMobileMenuOpen = ref(false)

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'History', path: '/history' },
  { name: 'Settings', path: '/settings' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
]
</script>

<style>
/* Add any additional global styles here */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
