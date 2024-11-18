<template>
    <div>
      <h1>Your Cart</h1>
      <div v-if="cartItems.length > 0">
        <div v-for="item in cartItems" :key="item._id" class="cart-item">
          <h2>{{ item.name }}</h2>
          <p>Price: {{ item.price }}</p>
          <p>Quantity: {{ item.quantity }}</p>
          <button @click="removeFromCart(item._id)">Remove</button>
        </div>
        <p>Total: {{ cartTotal }}</p>
      </div>
      <div v-else>
        <p>Your cart is empty.</p>
      </div>
    </div>
  </template>
  
  
<script src="./Cart.js"></script>
<style src="./Cart.css"></style>