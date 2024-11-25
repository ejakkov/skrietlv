import Footer from "../../components/Footer.vue";
import Profile from "@/views/Profile/Profile.vue"; 

export default {
  components: {
    Footer
  },
  data() {
    return {
      isLoggedIn: true, 
      deliveryMethod: 'pakomats',
      selectedPakomats: '', 
      selectedPakomatsAddress: '', 
      recipientName: '',
      recipientSurname: '',
      recipientPhone: '',
      recipientCity: '',
      recipientAddress: '',
      recipientPostalCode: '',
      discountCode: '',
      totalPrice: 0, 
      discountAmount: 0,
      userName: '', 
    };
  },
  computed: {
    calculateDeliveryCost() {
      return this.selectedPakomats === 'itella' ? 3.20 : 3;
    },
    isFormValid() {
      if (this.isLoggedIn && this.selectedPakomats && this.selectedPakomatsAddress) {
        return true;
      }
      if (!this.isLoggedIn && this.recipientName && this.recipientSurname && this.recipientPhone && this.recipientCity && this.recipientAddress && this.recipientPostalCode) {
        return true;
      }
      return false;
    }
  },
  mounted() {
    try {
      this.totalPrice = this.getTotalPriceFromCookie(); 

      this.userName = Profile.data().user.name; 
    } catch (error) {
      console.error("Error fetching total price from cookie or fetching username:", error);
      this.totalPrice = 0;
      this.isLoggedIn = false; 
    }
  },
  watch: {
    isLoggedIn(newVal) { 
      if (!newVal) {
        this.selectedPakomats = '';
        this.selectedPakomatsAddress = '';
      }
    },
    discountCode(newVal) {
      if (newVal === 'test') {
        this.isLoggedIn = false;
      }
    }
  },
  methods: {
    submitOrder() {
      this.applyDiscount();

      const paymentWindow = window.open('', '_blank', 'width=600,height=400');
      if (paymentWindow) {
        paymentWindow.document.title = 'Processing payment 2387'; 
        setTimeout(() => {
          paymentWindow.document.body.innerHTML = '<h1 style="color: white; font-size: 24px;">Error 504</h1>';
          paymentWindow.document.body.style.backgroundColor = 'grey';
          paymentWindow.document.title = 'Error 504'; 
        }, 1000);
      } else {
        alert('Neizdevās atvērt maksājuma logu. Lūdzu, atspējojiet uznirstošo logu bloķētāju.');
      }
    },
    validateForm() {
      return !!(
        this.recipientName &&
        this.recipientSurname &&
        this.recipientPhone &&
        (this.deliveryMethod !== 'majas' || (this.recipientCity && this.recipientAddress && this.recipientPostalCode))
      );
    },
    applyDiscount() {
      if (this.discountCode.toLowerCase() === 'skriet2024') {
        this.discountAmount = this.totalPrice * 0.24;
      } else {
        this.discountAmount = 0;
        this.discountCode = '';
      }
    },
    selectPakomats(provider) {
      this.selectedPakomats = provider;
      this.selectedPakomatsAddress = ''; 
    },
    restrictToNumbers(event, field) {
      const input = event.target.value;
      const numbersOnly = input.replace(/[^0-9]/g, '');
      this[field] = numbersOnly;
    },
    getTotalPriceFromCookie() {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('totalPrice=')) {
          const price = parseFloat(cookie.substring('totalPrice='.length));
          return isNaN(price) ? 0 : price; 
        }
      }
      return 0; 
    }
  }
};