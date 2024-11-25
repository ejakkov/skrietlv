<template>
  <div class="validation-page">
    <div class="validation-container">
      <div class="left-box">
        <h3>Izņemšana pakomātā</h3>
        <div class="provider">
          <img src="https://seeklogo.com/images/O/omniva-logo-41B019A1E9-seeklogo.com.png" alt="Omniva" 
               :class="{ selected: selectedPakomats === 'omniva' }" @click="selectPakomats('omniva')">
          <img src="https://static.cdnlogo.com/logos/d/42/dpd-thumb.png" 
               alt="Smartpost" :class="{ selected: selectedPakomats === 'smartpost' }" @click="selectPakomats('smartpost')">
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Itella_logo.svg" alt="Itella" 
               :class="{ selected: selectedPakomats === 'itella' }" @click="selectPakomats('itella')">
        </div>
        <hr>
        <select v-model="selectedPakomatsAddress" :disabled="!selectedPakomats || !isLoggedIn">
          <option value="">Izvēlies pakomātu</option>
          <option value="Rīga, pasta iela 24">Rīga, pasta iela 24</option>
          <option value="Rīga, miķeļu rajons 14">Rīga, miķeļu rajons 14</option>
          <option value="Rīga, Bajāru iela 453">Rīga, Bajāru iela 453</option>
          <option value="Rīga, Brīvības iela 94">Rīga, Brīvības iela 94</option>
          <option value="Rīga, Uzvaras parks 0a">Rīga, Uzvaras parks 0a</option>
          <option value="Jelgava, Brīvības iela 18">Jelgava, Brīvības iela 18</option>
          <option value="Jelgava, krustbaznīcas iela 83b">Jelgava, krustbaznīcas iela 83b</option>
        </select>
        <hr>
        <div class="user-details">
          <p>Saņēmēja dati</p>
          <p class="user-name" v-if="isLoggedIn">{{ userName }}</p> 
          <p class="user-phone" v-if="isLoggedIn">+371 9999999</p> 
        </div>
      </div>

      <div class="right-box">
        <h3>Piegāde uz mājām</h3>
        <div class="recipient-details">
          <input type="text" v-model="recipientName" placeholder="Vārds" :class="{ error: !recipientName && !isLoggedIn }" 
                 :disabled="isLoggedIn && deliveryMethod === 'pakomats'"> 
          <input type="text" v-model="recipientSurname" placeholder="Uzvārds" :class="{ error: !recipientSurname && !isLoggedIn }" 
                 :disabled="isLoggedIn && deliveryMethod === 'pakomats'">
          <input type="tel" v-model="recipientPhone" placeholder="Tālrunis" :class="{ error: !recipientPhone && !isLoggedIn }" 
                 @input="restrictToNumbers($event, 'recipientPhone')" :disabled="isLoggedIn && deliveryMethod === 'pakomats'">
          <input type="text" v-model="recipientCity" placeholder="Pilsēta" :class="{ error: !recipientCity && !isLoggedIn }" 
                 :disabled="isLoggedIn && deliveryMethod === 'pakomats'">
          <input type="text" v-model="recipientAddress" placeholder="Adrese" :class="{ error: !recipientAddress && !isLoggedIn }" 
                 :disabled="isLoggedIn && deliveryMethod === 'pakomats'">
          <input type="text" v-model="recipientPostalCode" placeholder="Pasta indekss" :class="{ error: !recipientPostalCode && !isLoggedIn }" 
                 @input="restrictToNumbers($event, 'recipientPostalCode')" :disabled="isLoggedIn && deliveryMethod === 'pakomats'">
        </div>
      </div>

      <div class="bottom-left-box">
        <input type="text" v-model="discountCode" placeholder="Atlaižu kods" @blur="applyDiscount" @keyup.enter="applyDiscount">
        <div class="order-summary">
          <div class="summary-item">
            <span>Pasūtījums</span>
            <span v-if="totalPrice !== undefined">{{ totalPrice.toFixed(2) }}€</span>
            <span v-else>0.00€</span>
          </div>
          <hr>
          <div class="summary-item">
            <span>Piegādes izmaksas</span>
            <span>{{ calculateDeliveryCost.toFixed(2) }}€</span>
          </div>
          <hr>
          <div class="summary-item total">
            <span>Kopā</span>
            <span>{{ (totalPrice + calculateDeliveryCost - discountAmount).toFixed(2) }}€</span>
          </div>
        </div>
      </div>

      <div class="bottom-right-box">
        <p>Maksāt izmantojot Trustly</p> 
        <a href="#" @click.prevent="submitOrder" :class="{ disabled: !isFormValid }"> 
          <img src="https://static.openfintech.io/payment_methods/trustly/logo.svg" alt="Trustly logo"> 
        </a>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script src="./Validation.js"></script>
<style src="./Validation.css" scoped></style>