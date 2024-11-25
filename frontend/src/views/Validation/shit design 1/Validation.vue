<template>
  <div class="validation-page">
    <div class="validation-container">
      <div class="left-column"> 
        <h2>Piegāde</h2>

        <div class="delivery-options">
          <div class="option" :class="{ active: deliveryMethod === 'pakomats' }" @click="deliveryMethod = 'pakomats'">
            Izņemšana pakomātā
          </div>
          <div class="option" :class="{ active: deliveryMethod === 'majas' }" @click="deliveryMethod = 'majas'">
            Piegāde uz mājām
          </div>
        </div>

        <div v-if="deliveryMethod === 'pakomats'" class="pakomats-selection">
          <div class="provider">
            <img src="https://seeklogo.com/images/O/omniva-logo-41B019A1E9-seeklogo.com.png" alt="Omniva"
              :class="{ selected: selectedPakomats === 'omniva' }" @click="selectPakomats('omniva')">
            <img src="https://static.cdnlogo.com/logos/d/42/dpd-thumb.png" alt="Smartpost"
              :class="{ selected: selectedPakomats === 'smartpost' }" @click="selectPakomats('smartpost')">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Itella_logo.svg" alt="Itella"
              :class="{ selected: selectedPakomats === 'itella' }" @click="selectPakomats('itella')">
          </div>
          <span v-if="selectedPakomats" class="selected-pakomats">Izvēlēts pakomāts:
            {{ selectedPakomats }}</span>
        </div>

        <div class="user-details"> 
          <h3>Saņēmēja dati</h3>
          <p v-if="isLoggedIn">{{ userName }}</p>  
          <p v-if="isLoggedIn">+371 9999999</p>  
        </div>

        <input type="text" v-model="discountCode" placeholder="Atlaižu kods" @blur="applyDiscount"
          @keyup.enter="applyDiscount">

        <div class="order-summary">
          <div class="summary-item">
            <span>Pasūtījums</span>
            <span v-if="totalPrice !== undefined">{{ totalPrice.toFixed(2) }}€</span>
            <span v-else>0.00€</span>
          </div>
          <div class="summary-item">
            <span>Piegādes izmaksas</span>
            <span>{{ calculateDeliveryCost.toFixed(2) }}€</span>
          </div>
          <div class="summary-item" v-if="discountAmount > 0">
            <span>Atlaide (24%)</span>
            <span>-{{ discountAmount.toFixed(2) }}€</span>
          </div>
          <div class="summary-item total">
            <span>Kopā</span>
            <span>{{ (totalPrice + calculateDeliveryCost - discountAmount).toFixed(2) }}€</span>
          </div>
        </div>
      </div> 

      <div class="right-column">
        <div class="recipient-details"> 
          <h3>Piegādes dati</h3>
          <input type="text" v-model="recipientName" placeholder="Vārds" :class="{ error: !recipientName }"
            :disabled="isLoggedIn"> 
          <input type="text" v-model="recipientSurname" placeholder="Uzvārds" :class="{ error: !recipientSurname }"
            :disabled="isLoggedIn"> 
          <input type="tel" v-model="recipientPhone" placeholder="Tālrunis" :class="{ error: !recipientPhone }"
            @input="restrictToNumbers($event, 'recipientPhone')" :disabled="isLoggedIn"> 
          <input v-if="!isLoggedIn" type="text" v-model="recipientCity" placeholder="Pilsēta"
            :class="{ error: deliveryMethod === 'majas' && !recipientCity }"> 
          <input v-if="!isLoggedIn" type="text" v-model="recipientAddress" placeholder="Adrese"
            :class="{ error: deliveryMethod === 'majas' && !recipientAddress }"> 
          <input v-if="!isLoggedIn" type="text" v-model="recipientPostalCode" placeholder="Pasta indekss"
            :class="{ error: deliveryMethod === 'majas' && !recipientPostalCode }"
            @input="restrictToNumbers($event, 'recipientPostalCode')"> 
        </div>

        <button @click="submitOrder">
          Maksāt izmantojot Trustly
          <span class="trustly-logo">Trustly</span> 
        </button>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script src="./Validation.js"></script>
<style src="./Validation.css" scoped></style>