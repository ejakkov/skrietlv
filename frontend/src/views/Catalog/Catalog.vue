<template>
  <div>
    <SubNavBar />
    <h1>Catalog</h1>
    <div v-if="loading">
      <p>Loading items...</p>
    </div>

    <div v-else class="grid-container">
      <div v-for="item in items" :key="item._id" class="item-card">
        <img :src="item.imageUrl" alt="" class="item-image" />
        <h2>{{ item.name }}</h2>
        <p>{{ item.description }}</p>
        <p>Price: {{ item.price }}</p>
        <router-link :to="{ name: 'Product', params: { id: item._id }}">View Product</router-link>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script src="./Catalog.js"></script>
<style src="./Catalog.css"></style>
