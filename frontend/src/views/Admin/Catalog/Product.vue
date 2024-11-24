<template>
    
    <div v-if="loading">
      <p>Loading product...</p>
    </div>

    <div v-else class="product-container">
      <div v-for="item in product">
        <h1>Preču pārvaldība > {{ item.name }}</h1>
        <div>
            <table>
                <tr>
                    <td>Nosaukums:</td>
                    <td>
                        <input type='text' id='input_name' :value='item.name' />
                    </td>
                </tr>
                <tr>
                    <td>Apraksts:</td>
                    <td>
                        <textarea cols="80" rows="5">{{ item.description }}</textarea>
                    </td>
                </tr>
                <!-- TODO: IMPLEMENT -->
            </table>
        </div>
      </div>
    </div>
  </template>
  
  <style src="./Product.css"></style>
  <script src="./Product.js"></script>