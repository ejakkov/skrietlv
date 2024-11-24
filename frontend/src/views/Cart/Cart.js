import axios from 'axios';

export default {
    data() {
      return {
        cartItems: [
          
        ]
      };
    },
    created() {
      console.log('Component created'); // Check if this logs
  
      this.fetchCartItems();
    },

    computed: {
      cartTotal() {
        var total = 0;
        for(const item of this.cartItems){
          total = total + item.price;
        }
        return Math.round(total * 100)/100
      }
    },
    methods: {
      async fetchCartItems() {
        try {
          const response = await axios.get('http://localhost:5000/api/cart');

          for(const item of response.data){
            const catalogItem = await axios.get(`http://localhost:5000/api/items/${item._id}`);
            catalogItem.data.quantity = item.quantity;
            this.cartItems.push(catalogItem.data);
          }

        } catch (error) {
          console.error('Error fetching items:', error);
        }
      },

      async removeFromCart(id) {
        try{
          await axios.delete(`http://localhost:5000/api/cart/${id}`);
          this.cartItems = this.cartItems.filter(item => item._id !== id);
        }catch(error){
          console.error('Error deleting items:', error);
        }
      },
      // async incrementItem(id, quantity){
      //   try {
      //     const send = {_id: id, quantity: quantity + 1};
      //     await axios.put(`http://localhost:5000/api/cart/${id}`, send);
          
      //   } catch (error) {
      //     console.error('Error incementing item:', error);
      //   }
      // },
      // async decrementItem(id, quantity){
        
      // }
    }
    
  };