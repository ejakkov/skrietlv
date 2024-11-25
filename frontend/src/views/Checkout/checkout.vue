<template>
  <div class="checkout-page">


    <div class="checkout-container">
      <div class="cart-items">
        <h2>Produkti</h2>
        <div v-for="item in cartItems" :key="item._id" class="cart-item">
          <img :src="item.imageUrl" alt="Item Image" class="cart-item-image" />
          <div class="cart-item-details">
            <h3>{{ item.name }}</h3>
            <p>{{ item.description }}</p>
            <div class="item-actions">
              <div class="gaysex">
                <div>
              <button @click="decrementQuantity(item)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="incrementQuantity(item)">+</button>
            </div>
            <button @click="removeItem(item)">Noņemt preci</button>

              </div>
              <span>{{ item.price }}€</span>
            </div>
          </div>
        </div>
        <button class="reset-cart" @click="resetCart">Atjaunot preces</button>
        <button class="continue-shopping" @click="continueShopping">Turpināt iepirkties</button>
      </div>

      <div class="checkout-summary">
        <h2>Kopā</h2>
        <div class="total-summary">
          <span>Summa</span>
          <span class="total-price">{{ totalPrice.toFixed(2) }}€</span>
        </div>
        <button @click="proceedToValidation">Noformēt pasūtījumu</button>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script src="./Checkout.js"></script>
<style src="./Checkout.css" ></style>
