<template>
  <div>
    <SubNavBar />
    <h1>Catalog</h1>

    <!-- <div>
      <label for="sort">Sort by: </label>
      <select id="sort" v-model="sortOption">
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
    </div> -->
    <div class="card flex justify-content-center">
      <Select v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a City" checkmark :highlightOnSelect="false" class="w-full md:w-56" />
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
    