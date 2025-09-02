<template>
  <div class="relative" v-if="isAuthenticated">
    <details class="group">
      <summary class="list-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring rounded-lg">
        <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
          <div class="relative">
            <img v-if="avatarUrl" :src="avatarUrl" alt="avatar" class="h-10 w-10 rounded-full object-cover border-2 border-primary/20"/>
            <div v-else class="h-10 w-10 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
              <span class="text-sm font-bold text-primary">{{ roleLetter }}</span>
            </div>
            <div class="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-background rounded-full"></div>
          </div>
          <div class="hidden md:block flex-1 min-w-0">
            <p class="text-sm font-medium text-foreground truncate">{{ displayName }}</p>
            <p class="text-xs text-muted-foreground capitalize">{{ userRole }}</p>
          </div>
          <svg class="h-4 w-4 text-muted-foreground group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </summary>
      
      <div class="absolute right-0 mt-2 w-64 bg-popover border border-border rounded-lg shadow-lg z-50 overflow-hidden">
        <div class="p-4 border-b border-border bg-muted/30">
          <div class="flex items-center gap-3">
            <img v-if="avatarUrl" :src="avatarUrl" alt="avatar" class="h-12 w-12 rounded-full object-cover border-2 border-primary/20"/>
            <div v-else class="h-12 w-12 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
              <span class="text-lg font-bold text-primary">{{ roleLetter }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-medium text-popover-foreground truncate">{{ displayName }}</p>
              <p class="text-sm text-muted-foreground capitalize">{{ userRole }}</p>
            </div>
          </div>
        </div>
        
        <div class="py-2">
          <router-link 
            v-if="userRole === 'client'" 
            to="/me" 
            class="flex items-center gap-3 px-4 py-3 text-sm text-popover-foreground hover:bg-muted/50 transition-colors"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            Mi Panel
          </router-link>
          
          <router-link 
            v-if="userRole === 'employee'" 
            to="/employee" 
            class="flex items-center gap-3 px-4 py-3 text-sm text-popover-foreground hover:bg-muted/50 transition-colors"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0v6a2 2 0 01-2 2H10a2 2 0 01-2-2V6"/>
            </svg>
            Panel Empleado
          </router-link>
          
          <router-link 
            v-if="userRole === 'admin'" 
            to="/admin" 
            class="flex items-center gap-3 px-4 py-3 text-sm text-popover-foreground hover:bg-muted/50 transition-colors"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-2.573 1.066c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            Panel Admin
          </router-link>
          
          <div class="border-t border-border my-2"></div>
          
          <button 
            @click="logout" 
            class="flex items-center gap-3 w-full px-4 py-3 text-sm text-destructive hover:bg-destructive/10 transition-colors"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            Cerrar sesión
          </button>
        </div>
      </div>
    </details>
  </div>
  
  <div v-else>
    <router-link 
      to="/" 
      class="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
    >
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
      </svg>
      Iniciar sesión
    </router-link>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const auth = useAuthStore();
const router = useRouter();
const { isAuthenticated, displayName, userRole, roleLetter, avatarUrl } = storeToRefs(auth);

auth.initializeAuth();

function logout() {
  auth.logout();
  router.push('/');
}
</script>
