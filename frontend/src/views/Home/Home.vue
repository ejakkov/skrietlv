<template>
  <div class="home">
    <SubNavbar />
    <div class="main-layout">
      <div class="main-content">
        <div class="content-area">
          <div class="banner shoes-banner">
            <div class="banner-content">
              <h1 class="banner-title">Mega Sale on Shoes!</h1>
              <p class="banner-subtitle">Up to 50% Off on Top Brands</p>
            </div>
          </div>
          <div class="card">

            <Carousel
            :value="shoes"
            :numVisible="3"
            :numScroll="1"
            :responsiveOptions="responsiveOptions"
            circular
            :autoplayInterval="3000"
          >
            <template #item="slotProps">
              <div class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4">
                <div class="mb-4">
                  <div class="relative mx-auto">
                    <img
                      :src="slotProps.data.imageUrl"
                      :alt="slotProps.data.name"
                      class="carousel-item"
                    />
                  </div>
                </div>
                <div class="mb-4 font-medium">{{ slotProps.data.name }}</div>
                <div class="flex justify-between items-center">
                  <div class="mt-0 font-semibold text-xl">${{ slotProps.data.price }}</div>
                  <span>
                    <Button
                        icon="pi pi-heart"
                        severity="secondary"
                        outlined
                        @click="toggleLike(slotProps.data)"  
                        :class="{'liked': isLiked(slotProps.data._id)}" 
                        />
                    <Button icon="pi pi-shopping-cart" class="ml-2" />
                  </span>
                </div>
              </div>
            </template>
          </Carousel>

          </div>
          <div class="banner accessories-banner">
            <div class="banner-content">
              <h1 class="banner-title">Mega Sale on Clothing !</h1>
              <p class="banner-subtitle">Up to 50% Off on Top Brands</p>
            </div>
          </div>

          <div class="card">
            <Carousel
              :value="accessories"
              :numVisible="3"
              :numScroll="1"
              :responsiveOptions="responsiveOptions"
              circular
              :autoplayInterval="3000"
            >
              <template #item="slotProps">
                <div class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4">
                  <div class="mb-4">
                    <div class="relative mx-auto">
                      <img
                        :src="slotProps.data.imageUrl"
                        :alt="slotProps.data.name"
                        class="carousel-item"
                      />
                    </div>
                  </div>
                  <div class="mb-4 font-medium">{{ slotProps.data.name }}</div>
                  <div class="flex justify-between items-center">
                    <div class="mt-0 font-semibold text-xl">${{ slotProps.data.price }}</div>
                    <span>
                      <Button
                        icon="pi pi-heart"
                        severity="secondary"
                        outlined
                        @click="toggleLike(slotProps.data)"  
                        :class="{'liked': isLiked(slotProps.data._id)}" 
                        />
                      <Button icon="pi pi-shopping-cart" class="ml-2" />
                    </span>
                  </div>
                </div>
              </template>
            </Carousel>
          </div>

          <div class="banner supplements-banner">
            <div class="banner-content">
              <h1 class="banner-title">Mega Sale on Supplements!</h1>
              <p class="banner-subtitle">Up to 50% Off on Top Brands</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script src="./Home.js"></script>
<style src="./Home.css"></style>
