import axios from 'axios';


export default {
  data() {
    return {
      items: []
    };
  },
  created() {
    console.log('Component created'); // Check if this logs

    this.fetchItems();
  },
  methods: {
    async fetchItems() {
      try {
        const response = await axios.get('http://localhost:5000/api/items');
        this.items = response.data;
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    },

    async addToCart(item){
      try{
        const response = await axios.get(`http://localhost:5000/api/cart/${item._id}`);
        if(!response.data){
          await axios.post('http://localhost:5000/api/cart',{_id: item._id, quantity: 1});
          console.log(`${item._id} added to cart`);
        }else{
          console.log(`Item ${item._id} already in cart!`);
        }

      }catch(error){
        console.error('Error adding item:', error);
      }
    }
  }
};