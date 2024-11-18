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
        return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      }
    },
    methods: {
      async fetchCartItems() {
        try {
          const response = await axios.get('http://localhost:5000/api/cart');
          this.cartItems = response.data;
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
      }
    }
  };