<template>
   <!-- Updated to use new design system with proper Vue structure -->
  <div class="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
     <!-- Enhanced header with better branding and navigation -->
    <header class="bg-white shadow-lg border-b border-neutral-200 sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
           <!-- Updated logo section with new branding -->
          <div class="flex items-center space-x-4">
            <img src="/logo.png" alt="Ferrepoco" class="w-12 h-12 rounded-lg object-cover" />
            <div>
              <h1 class="text-2xl font-heading font-bold text-cyan-800">Ferrepoco</h1>
              <p class="text-xs text-neutral-500 font-body">Tu ferretería de confianza</p>
            </div>
          </div>

           <!-- Enhanced search bar -->
          <div class="hidden md:flex flex-1 max-w-2xl mx-8">
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Buscar productos, marcas y más..." 
                class="pl-10 block w-full px-4 py-3 border border-neutral-300 rounded-lg shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 font-body"
              />
            </div>
          </div>

           <!-- Updated action buttons with new styling -->
          <div class="flex items-center space-x-4">
            <nav class="hidden md:flex space-x-6">
              <a href="#" class="text-neutral-700 hover:text-cyan-800 transition-colors font-medium font-body">Productos</a>
              <a href="#" class="text-neutral-700 hover:text-cyan-800 transition-colors font-medium font-body">Ofertas</a>
              <a href="#" class="text-neutral-700 hover:text-cyan-800 transition-colors font-medium font-body">Servicios</a>
            </nav>
            
            <div class="flex items-center space-x-2">
               <!-- Favorites button -->
              <button class="p-3 rounded-lg hover:bg-neutral-100 transition-colors relative group">
                <svg class="w-6 h-6 text-neutral-600 group-hover:text-cyan-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                <span class="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">3</span>
              </button>
              
               <!-- Cart button -->
              <button class="p-3 rounded-lg hover:bg-neutral-100 transition-colors relative group">
                <svg class="w-6 h-6 text-neutral-600 group-hover:text-cyan-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"></path>
                </svg>
                <span class="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">2</span>
              </button>
              
               <!-- User menu -->
              <details class="relative">
                <summary class="list-none cursor-pointer p-3 rounded-lg hover:bg-neutral-100 transition-colors">
                  <svg class="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </summary>
                <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 border border-neutral-200">
                  <a href="#" class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 font-body">Mi cuenta</a>
                  <a href="#" class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 font-body">Mis pedidos</a>
                  <hr class="my-2 border-neutral-200">
                  <a href="#" class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 font-body">Cerrar sesión</a>
                </div>
              </details>
            </div>
            
             <!-- Mobile menu button -->
            <button class="md:hidden p-3 rounded-lg hover:bg-neutral-100 transition-colors">
              <svg class="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
        
         <!-- Mobile search -->
        <div class="md:hidden py-3">
          <div class="relative w-full">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Buscar productos..." 
              class="pl-10 block w-full px-3 py-2 border border-neutral-300 rounded-lg shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors font-body"
            />
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       <!-- Enhanced hero section with better gradient and typography -->
      <section class="mb-12">
        <div class="relative rounded-xl overflow-hidden h-[300px] md:h-[400px] shadow-xl">
          <div class="absolute inset-0 bg-gradient-to-r from-cyan-800/90 to-cyan-600/70"></div>
          <img 
            src="/logo.png" 
            alt="Ferrepoco" 
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
            <h2 class="text-white text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 text-balance">
              Herramientas para profesionales
            </h2>
            <p class="text-white text-lg md:text-xl mb-6 max-w-md font-body text-pretty">
              Descubre nuestra selección especial con un 25% de descuento en herramientas eléctricas
            </p>
            <div>
              <a href="#" class="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 font-body">
                Ver ofertas
                <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

       <!-- Updated categories section with new icons and styling -->
      <section class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-heading font-bold text-neutral-900">Categorías populares</h2>
          <a href="#" class="text-cyan-800 hover:text-cyan-700 transition-colors flex items-center font-body font-medium">
            Ver todas
            <svg class="ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <a href="#" class="group">
            <div class="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-1 border border-neutral-200">
              <div class="h-40 bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-4">
                <svg class="w-12 h-12 text-neutral-600 group-hover:text-cyan-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <div class="p-3 text-center">
                <h3 class="font-medium text-neutral-900 font-body">Herramientas</h3>
              </div>
            </div>
          </a>
          <a href="#" class="group">
            <div class="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-1 border border-neutral-200">
              <div class="h-40 bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-4">
                <svg class="w-12 h-12 text-neutral-600 group-hover:text-cyan-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 4.75 7.5 4.75a12.742 12.742 0 00-2.269 9.92l-1.44-1.44m14.016 5.834a12.721 12.721 0 01-2.266-9.921l-1.442 1.443m1.442-1.443a12.748 12.748 0 005.864 2.595m-5.864-2.595a12.745 12.745 0 01-3.514-3.956l-1.441 1.441"></path>
                </svg>
              </div>
              <div class="p-3 text-center">
                <h3 class="font-medium text-neutral-900 font-body">Tornillería</h3>
              </div>
            </div>
          </a>
          <a href="#" class="group">
            <div class="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-1 border border-neutral-200">
              <div class="h-40 bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-4">
                <svg class="w-12 h-12 text-neutral-600 group-hover:text-cyan-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                </svg>
              </div>
              <div class="p-3 text-center">
                <h3 class="font-medium text-neutral-900 font-body">Eléctricos</h3>
              </div>
            </div>
          </a>
          <a href="#" class="group">
            <div class="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-1 border border-neutral-200">
              <div class="h-40 bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-4">
                <svg class="w-12 h-12 text-neutral-600 group-hover:text-cyan-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.114 5.636a9 9 0 010 12.728M16.463 5.636a9 9 0 010 12.728M3 12h.008v.008H3V12zM12 12h.008v.008H12V12zM16.5 12h.008v.008H16.5V12z"></path>
                </svg>
              </div>
              <div class="p-3 text-center">
                <h3 class="font-medium text-neutral-900 font-body">Plomería</h3>
              </div>
            </div>
          </a>
          <a href="#" class="group">
            <div class="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-1 border border-neutral-200">
              <div class="h-40 bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-4">
                <svg class="w-12 h-12 text-neutral-600 group-hover:text-cyan-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.362 5.214A8.252 8.252 0 0112 2.25c-1.345 0-2.67.284-3.963.89-1.013.491-1.907 1.187-2.678 2.081M9 12.73a3.75 3.75 0 116 0m-3-8.65a8.252 8.252 0 019.521 7.354"></path>
                </svg>
              </div>
              <div class="p-3 text-center">
                <h3 class="font-medium text-neutral-900 font-body">Pinturas</h3>
              </div>
            </div>
          </a>
          <a href="#" class="group">
            <div class="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-1 border border-neutral-200">
              <div class="h-40 bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-4">
                <svg class="w-12 h-12 text-neutral-600 group-hover:text-cyan-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"></path>
                </svg>
              </div>
              <div class="p-3 text-center">
                <h3 class="font-medium text-neutral-900 font-body">Ver todo</h3>
              </div>
            </div>
          </a>
        </div>
      </section>

       <!-- Enhanced products section with ProductCard component integration -->
      <section class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-heading font-bold text-neutral-900">Productos destacados</h2>
          <div class="flex space-x-2">
            <button class="p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors">
              <svg class="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button class="p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors">
              <svg class="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
           <!-- Product cards with enhanced styling -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 group border border-neutral-200">
            <div class="relative">
              <img 
                src="/placeholder.svg?height=200&width=300" 
                alt="Taladro eléctrico profesional" 
                class="w-full h-48 object-cover"
              />
              <div class="absolute top-3 right-3">
                <button class="p-2 rounded-full bg-white shadow-sm hover:bg-neutral-100 transition-colors">
                  <svg class="w-5 h-5 text-neutral-600 hover:text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </button>
              </div>
              <div class="absolute top-3 left-3">
                <span class="bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded font-body">-15%</span>
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-medium text-neutral-900 mb-1 font-body">Taladro Eléctrico Pro 750W</h3>
              <p class="text-sm text-neutral-500 mb-2 font-body">Marca Premium</p>
              <div class="flex items-center mb-2">
                <div class="flex text-yellow-400">
                   <!-- Star ratings -->
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                   <!-- Repeat for other stars -->
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
                <span class="text-xs text-neutral-500 ml-1 font-body">(124)</span>
              </div>
              <div class="flex items-baseline justify-between">
                <div>
                  <span class="text-neutral-400 text-sm line-through font-body">$189.99</span>
                  <span class="text-xl font-bold text-neutral-900 ml-1 font-heading">$159.99</span>
                </div>
                <button class="p-2 rounded-full bg-cyan-100 text-cyan-800 hover:bg-cyan-200 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 group border border-neutral-200">
            <div class="relative">
              <img 
                src="/placeholder.svg?height=200&width=300" 
                alt="Set de destornilladores" 
                class="w-full h-48 object-cover"
              />
              <div class="absolute top-3 right-3">
                <button class="p-2 rounded-full bg-white shadow-sm hover:bg-neutral-100 transition-colors">
                  <svg class="w-5 h-5 text-neutral-600 hover:text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-medium text-neutral-900 mb-1 font-body">Set 12 Destornilladores Precisión</h3>
              <p class="text-sm text-neutral-500 mb-2 font-body">ToolMaster</p>
              <div class="flex items-center mb-2">
                <div class="flex text-yellow-400">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
                <span class="text-xs text-neutral-500 ml-1 font-body">(89)</span>
              </div>
              <div class="flex items-baseline justify-between">
                <div>
                  <span class="text-xl font-bold text-neutral-900 font-heading">$45.99</span>
                </div>
                <button class="p-2 rounded-full bg-cyan-100 text-cyan-800 hover:bg-cyan-200 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 group border border-neutral-200">
            <div class="relative">
              <img 
                src="/placeholder.svg?height=200&width=300" 
                alt="Martillo profesional" 
                class="w-full h-48 object-cover"
              />
              <div class="absolute top-3 right-3">
                <button class="p-2 rounded-full bg-white shadow-sm hover:bg-neutral-100 transition-colors">
                  <svg class="w-5 h-5 text-neutral-600 hover:text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </button>
              </div>
              <div class="absolute top-3 left-3">
                <span class="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded font-body">Nuevo</span>
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-medium text-neutral-900 mb-1 font-body">Martillo Profesional 16oz</h3>
              <p class="text-sm text-neutral-500 mb-2 font-body">HammerForce</p>
              <div class="flex items-center mb-2">
                <div class="flex text-yellow-400">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15a1 1 0 100-2 1 1 0 000 2zm3-2.75a1 1 0 100-2 1 1 0 000 2zm-6 0a1 1 0 100-2 1 1 0 000 2zM16 9.5a1 1 0 100-2 1 1 0 000 2zm-12 0a1 1 0 100-2 1 1 0 000 2zm6-2.75a1 1 0 100-2 1 1 0 000 2z"/>
                  </svg>
                </div>
                <span class="text-xs text-neutral-500 ml-1 font-body">(42)</span>
              </div>
              <div class="flex items-baseline justify-between">
                <div>
                  <span class="text-xl font-bold text-neutral-900 font-heading">$28.50</span>
                </div>
                <button class="p-2 rounded-full bg-cyan-100 text-cyan-800 hover:bg-cyan-200 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 group border border-neutral-200">
            <div class="relative">
              <img 
                src="/placeholder.svg?height=200&width=300" 
                alt="Cinta métrica profesional" 
                class="w-full h-48 object-cover"
              />
              <div class="absolute top-3 right-3">
                <button class="p-2 rounded-full bg-white shadow-sm hover:bg-neutral-100 transition-colors">
                  <svg class="w-5 h-5 text-neutral-600 hover:text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-medium text-neutral-900 mb-1 font-body">Cinta Métrica 8m Autobloqueante</h3>
              <p class="text-sm text-neutral-500 mb-2 font-body">MeasurePro</p>
              <div class="flex items-center mb-2">
                <div class="flex text-yellow-400">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15a1 1 0 100-2 1 1 0 000 2zm3-2.75a1 1 0 100-2 1 1 0 000 2zm-6 0a1 1 0 100-2 1 1 0 000 2zm6-2.75a1 1 0 100-2 1 1 0 000 2zm3-2.75a1 1 0 100-2 1 1 0 000 2zm-12 0a1 1 0 100-2 1 1 0 000 2z"/>
                  </svg>
                </div>
                <span class="text-xs text-neutral-500 ml-1 font-body">(67)</span>
              </div>
              <div class="flex items-baseline justify-between">
                <div>
                  <span class="text-xl font-bold text-neutral-900 font-heading">$12.99</span>
                </div>
                <button class="p-2 rounded-full bg-cyan-100 text-cyan-800 hover:bg-cyan-200 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

       <!-- Updated promotional banners with new color scheme -->
      <section class="mb-12">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-xl overflow-hidden relative shadow-lg border border-cyan-200">
            <div class="p-6 md:p-8 relative z-10">
              <h3 class="text-2xl font-heading font-bold text-neutral-900 mb-2">Ahorra en tu próximo proyecto</h3>
              <p class="text-neutral-700 mb-4 font-body">Descuentos hasta del 30% en herramientas eléctricas</p>
              <a href="#" class="inline-flex items-center px-4 py-2 bg-cyan-800 hover:bg-cyan-700 text-white font-medium rounded-lg shadow-sm transition-all font-body">
                Ver ofertas
              </a>
            </div>
            <div class="absolute bottom-0 right-0 w-2/5 h-full">
              <img 
                src="/placeholder.svg?height=200&width=200" 
                alt="Herramientas en oferta" 
                class="h-full object-cover object-left"
              />
            </div>
          </div>
          
          <div class="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl overflow-hidden relative shadow-lg border border-orange-200">
            <div class="p-6 md:p-8 relative z-10">
              <h3 class="text-2xl font-heading font-bold text-neutral-900 mb-2">Programa de profesionales</h3>
              <p class="text-neutral-700 mb-4 font-body">Regístrate y obtén beneficios exclusivos para contratistas</p>
              <a href="#" class="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg shadow-sm transition-all font-body">
                Saber más
              </a>
            </div>
            <div class="absolute bottom-0 right-0 w-2/5 h-full">
              <img 
                src="/placeholder.svg?height=200&width=200" 
                alt="Profesional de la construcción" 
                class="h-full object-cover object-left"
              />
            </div>
          </div>
        </div>
      </section>

       <!-- existing code --> 
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Reactive data
const searchQuery = ref('')
const favoriteCount = ref(3)
const cartCount = ref(2)

// Methods
const handleSearch = () => {
  console.log('Searching for:', searchQuery.value)
}

const addToFavorites = (productId) => {
  favoriteCount.value++
  console.log('Added to favorites:', productId)
}

const addToCart = (productId) => {
  cartCount.value++
  console.log('Added to cart:', productId)
}

onMounted(() => {
  console.log('Client Dashboard mounted')
})
</script>

<style scoped>
/* Updated to use new design system variables */

.font-heading {
  font-family: 'Montserrat', sans-serif;
}

.font-body {
  font-family: 'Open Sans', sans-serif;
}

/* Custom scrollbar for better UX */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
