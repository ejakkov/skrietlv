

<template>
    <div>
      <h1>Grozs</h1>
      <div v-if="cartItems.length > 0" class = "cartItems">

        <div class = "column1">
            <div v-for="item in cartItems" :key="item._id" class="cart-item">
              <img :src="item.imageUrl" alt="" class="item-image" />
              <h2>{{ item.name }}</h2>
              <p class="priceParagraph">{{ item.price }}€</p>
              <div class = 'quantity'>
                <button class='subtract-product' @click="decrementItem(item._id, item.quantity)">-</button>
                <p class="quantityParagraph"> {{ item.quantity }}</p>
                <button class='add-product' @click="incrementItem(item._id, item.quantity)">+</button>
              </div>
             
              <button class = "remove-item" @click="removeFromCart(item._id)">Noņemt</button>
            </div>
        </div>

        <div class = "column2">
          <div class = "sumContainer">
            <h2>Kopā:</h2>
            <p>Summa: {{ cartTotal }} € </p>
            <button class = "proceed-to-payment" >Noformēt pasūtījumu</button>
          </div>
        </div>

      </div>
      <div v-else>
        <p>Jūsu grozs ir tukšs.</p>
      </div>

    </div>
  </template>
  
  
<script src="./Cart.js"></script>
<style src="./Cart.css"></style>