import Footer from "../../components/Footer.vue";

export default {
  components: {
    Footer,
  },
  data() {
    return {
      cartItems: [],
      loading: true,
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
  },
  async created() {
    console.log("Component created");
    await this.test123();
    this.updateCartCookies();
  },
  methods: {
    async fetchCartItems() {
      try {
        this.cartItems = await Promise.all(
          cartItemIds.map(async (itemId) => {
            const itemResponse = await fetch(`http://localhost:5000/api/items/${itemId}`);
            if (!itemResponse.ok) {
              throw new Error(`Failed to fetch item with ID ${itemId}`);
            }
            const item = await itemResponse.json();
            if (!item.quantity) { 
              item.quantity = 1;
            }
            return item;
          })
        );

        console.log("Fetched cart items:", this.cartItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        this.loading = false;
      }
    },
    async test123() {
      try {
        const response = await fetch("http://localhost:5000/api/cartitems"); 
        if (!response.ok) {
          throw new Error("Failed to fetch cart item IDs");
        }
        const cartItemIds = await response.json();
        console.log(cartItemIds); 

        this.cartItems = await Promise.all(
          cartItemIds.map(async (item) => { 
            const itemResponse = await fetch(`http://localhost:5000/api/items/${item._id}`);
            if (!itemResponse.ok) {
              throw new Error(`Failed to fetch item with ID ${item._id}`);
            }
            const itemData = await itemResponse.json();

            if (!itemData.quantity) { 
              itemData.quantity = 1;
            }
            return itemData;
          })
        );

        console.log("Fetched cart items:", this.cartItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        this.loading = false;
      }
    },
    getCartItemIdsFromCookies() {
      const cookies = document.cookie.split(';');
      const cartItemIds = [];
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('cartItem_')) {
          const itemId = cookie.substring(9); 
          cartItemIds.push(itemId);
        }
      }
      return cartItemIds;
    },
    incrementQuantity(item) {
      item.quantity++;
      this.updateCartCookies();
    },
    decrementQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
        this.updateCartCookies();
      }
    },
    removeItem(item) {
      this.cartItems = this.cartItems.filter((cartItem) => cartItem._id !== item._id);
      this.updateCartCookies();
    },
    resetCart() {
      this.cartItems = [];
      this.updateCartCookies();
    },
    continueShopping() {
      this.$router.push("/");
    },
    proceedToValidation() {
      this.$router.push("/validation");
    },
    updateCartCookies() {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('cartItem_')) {
          document.cookie = cookie.split('=')[0] + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }
      }

      this.cartItems.forEach((item, index) => {
        document.cookie = `cartItem_${index}=${item._id}; path=/`;
      });

      document.cookie = `totalPrice=${this.totalPrice}; path=/`; 
    },
  },
};