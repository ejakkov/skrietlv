<template>
    <div v-if="product">
      <h1>{{ product.name }}</h1>
      <img :src="product.imageUrl" alt="Product image" />
      <p>{{ product.description }}</p>
      <p>Price: {{ product.price }}</p>
      <button @click="addToCart(product)">Add to Cart</button>
    </div>
    <div v-else>
      <p>Loading product details...</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        product: null
      };
    },
    async created() {
      try {
        const response = await axios.get(`http://localhost:5000/api/items/${this.$route.params.id}`);
        this.product = response.data;
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    },
    methods: {
      addToCart(product) {

        console.log(`${product.name} added to cart`);
      }
    }
  };
  </script>