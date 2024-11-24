<template>
  <div>
    <SubNavBar />
    <h1>Catalog</h1>
    <div class="card action-section">
      <Select
        v-model="sortOption"
        :options="sorting"
        optionLabel="name"
        placeholder="Sort"
        class="w-full md:w-56"
      />
      <Select
        v-model="selectedCategory"
        :options="categories"
        optionLabel="name"
        placeholder="Category"
        class="w-full md:w-56"
      />
      <Select
        v-model="selectedSize"
        :options="sizes"
        optionLabel="value"
        placeholder="Size"
        class="w-full md:w-56"
      />
    </div>
    <div v-if="loading">
      <p>Loading items...</p>
    </div>

    <div v-else class="catalog">
      <div class="grid-container">
        <div v-for="item in items" :key="item._id" class="item-card">
          <img :src="item.imageUrl" alt="" class="item-image" />
          <h2>{{ item.name }}</h2>
          <p>{{ item.price }}€</p>
        </div>
      </div>      
    </div>

  </div>
  <Footer />
</template>

<script src="./Catalog.js"></script>
<style src="./Catalog.css"></style>
    