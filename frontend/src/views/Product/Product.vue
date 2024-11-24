<template>
    
    <div v-if="loading">
      <p>Loading product...</p>
    </div>

    <div v-else class="product-container">
      <div v-for="item in product">
        <div class="product-image">
          <img :src="item.imageUrl" />
        </div>
        <div class="product-info">
          <h1>{{ item.name }}</h1>
          <div>
            <span class='category'>{{ item.category }}</span>
          </div>
          <div class='price'>
            <span style='font-size: 16pt'>€</span><span style='font-size: 36pt'>{{ item.price }}</span>
          </div>
          <div class='selection'>
            <div style="float: left; margin: 10px;">
              <div>
                <span>Izmērs</span>
              </div>
              <div>
                <button v-for="size in item.sizes">{{ size.size }}</button>
              </div>
            </div>
            <div style="float: left; margin: 10px;">
              <div>
                <span>Krāsa</span>
              </div>
              <div>
                <button v-for="color in item.colors" :style="{background: color.code}"></button>
              </div>
            </div>
          </div>
          <div>
            <button class='add-to-cart'>Pievienot grozam</button>
          </div>
          <div class='description'>
            <div>
              <b>Apraksts</b><button id='description-toggle' v-on:click='descriptionToggle()'><span class='pi pi-angle-up'></span></button>
            </div>
            <div data-open='1' id='description-collapse'>
              {{ item.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style src="./Product.css"></style>
  <script src="./Product.js"></script>