<template>
    <div>
      <SubNavBar />
      <h1>Liked Items</h1>
  
      <div v-if="!likedItems.length && !loading">
        <p>You haven't liked any items yet!</p>
      </div>

      <div v-if="loading">
        <p>Loading items...</p>
      </div>

      <div v-else class="card-container-likes">
        <div 
          v-for="item in likedItems" 
          :key="item._id" 
          class="card-likes"
        >
          <div class="border border-surface-200 dark:border-surface-700 rounded-likes m-2-likes p-4-likes">
            <div class="mb-4-likes">
              <div class="relative mx-auto">

                <img
                  :src="item.imageUrl"
                  :alt="item.name"
                  class="carousel-item-likes"
                />
              </div>
            </div>
  
            <!-- Product Name -->
            <div class="mb-4-likes font-medium">{{ item.name }}</div>
  
            <div class="flex justify-between items-center">
              <!-- Product Price -->
              <div class="mt-0-likes font-semibold-likes text-xl">${{ item.price }}</div>
  
              <div>
                <!-- Like Button -->
                <Button
                  icon="pi pi-heart"
                  severity="secondary"
                  outlined
                  class="unlike-btn-likes"
                  @click="unlikeItem(item._id)"
                />
                
                <!-- Add to Cart Button  -->
                <Button
                  icon="pi pi-shopping-cart"
                  class="ml-2-likes"
                  @click="addToCart(item)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <Footer />
    </div>
  </template>
  
<script scoped src="./Likes.js"></script>
<style src="./Likes.css"></style>