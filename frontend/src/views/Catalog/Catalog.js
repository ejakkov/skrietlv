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
    }
  }
};