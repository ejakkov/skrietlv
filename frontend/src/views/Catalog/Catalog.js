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
        const itemToAdd = await axios.get(`http://localhost:5000/api/items/${item._id}`);
        await axios.post('http://localhost:5000/api/cart',itemToAdd.data);
        console.log(`${item._id} added to cart`);
      }catch(error){
        console.error('Error adding item:', error);
      }
    }
  }
};