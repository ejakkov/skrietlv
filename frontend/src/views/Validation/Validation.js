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
      deliveryCost: 3,
      discountAmount: 0,
      userName: '', 
      showErrors: false,
    };
  },
  computed: {
    calculateDeliveryCost() {
      if (this.deliveryMethod === 'majas') {
        return 5;
      }
      if (this.selectedPakomats === 'omniva') {
        return 3.10;
      }
      return 3;
    },
    isFormValid() {
      if (this.isLoggedIn && this.deliveryMethod === 'pakomats' && this.selectedPakomats && this.recipientName && this.recipientSurname && this.recipientPhone) {
        return true;
      }
      if (this.deliveryMethod === 'majas' && this.recipientName && this.recipientSurname && this.recipientPhone && this.recipientCity && this.recipientAddress && this.recipientPostalCode) {
        return true;
      }
      return false;
    }
  },
  mounted() {
    try {
      this.totalPrice = this.getTotalPriceFromCookie();


      this.userName = Profile.data().user.name;

      if (this.userName) {
        this.recipientName = this.userName.split(' ')[0];
        this.recipientSurname = this.userName.split(' ')[1];
        this.recipientPhone = '+371 99999999';
      }
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
        this.recipientName = '';
        this.recipientSurname = '';
        this.recipientPhone = '';
      }
    },
    discountCode(newVal) {
      if (newVal.toLowerCase() === 'test') {
        this.isLoggedIn = false;
      } else if (newVal.toLowerCase() === 'skriet2024') {
        this.applyDiscount();
      }
    }
  },
  methods: {
    async submitOrder() {
      this.showErrors = true;
    
      if (!this.isFormValid) {
        return;
      }
    
      try {
        const paymentData = {
          name: this.recipientName,
          surname: this.recipientSurname,
          phonenumber: this.recipientPhone,  
          totalprice: this.totalPrice, 
          pakomat: this.selectedPakomats, 
          city: this.recipientCity,
          street: this.recipientAddress,
          postal: this.recipientPostalCode,
          parcellocation: this.selectedPakomatsAddress, 
        };
    

        const response = await fetch('http://localhost:5000/api/payments', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData),
        });
    
        if (response.ok)  {
          console.log('Payment created:', await response.json()); 
    
          const paymentWindow = window.open('', '_blank', 'width=600,height=400');
          if (paymentWindow) {
            paymentWindow.document.title = 'Critical Error - Payment Processing Failed';
            paymentWindow.document.body.innerHTML = `
              <div style="background-color: #f0f0f0; color: #333; font-family: sans-serif; padding: 20px; text-align: center; position: relative;"> 
                <img src="https://www.interpol.int/var/interpol/storage/images/_aliases/large/3/7/0/5/165073-1-eng-GB/637bb8bddb42-Emblem-and-logo.jpg" alt="Interpol Logo" 
                     style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.5; width: 80%; max-width: 400px;">
          
                <h1 style="color: #b00020; font-size: 36px; margin-bottom: 10px; position: relative; z-index: 1;">Error 418</h1>
                <p style="font-size: 18px; margin-bottom: 20px; position: relative; z-index: 1;">Payment processing failed. Please contact support immediately.</p>
                <p style="font-size: 14px; color: #666; position: relative; z-index: 1;">
                  This is a critical error. Do NOT attempt to resubmit your order. 
                  Our technical team has been notified and is INVESTIGATING the issue. The FBI HAS been alerted.
                </p>
                <hr style="border: 1px solid #ddd; margin: 30px 0; position: relative; z-index: 1;">
                <p style="font-size: 12px; color: #888; position: relative; z-index: 1;">
                  Error Code: PAYMENT_FAILED_418<br>
                  Timestamp: ${new Date().toLocaleString()}
                </p>
              </div>
            `;
          } else {
            alert('Neizdevās atvērt maksājuma logu. Lūdzu, atspējojiet uznirstošo logu bloķētāju.');
          }
        } else {
          console.error('Failed to create payment:', response.status);

        }
    
      } catch (error) {
        console.error("Error submitting order:", error);

      }
    },
    validateForm() {
      return !!(
        (this.isLoggedIn && this.deliveryMethod === 'pakomats' && this.selectedPakomats && this.selectedPakomatsAddress) ||
        (!this.isLoggedIn && this.recipientName && this.recipientSurname && this.recipientPhone && ((this.deliveryMethod === 'pakomats' && this.selectedPakomats && this.selectedPakomatsAddress) || (this.deliveryMethod === 'majas' && this.recipientCity && this.recipientAddress && this.recipientPostalCode)))
      );
    },
    async applyDiscount() {
      try {

        var code = this.discountCode.toString().toLowerCase();
        const response = await fetch(`http://localhost:5000/api/discount-codes/${code}`); 
    
        if (!response.ok) {
          if (response.status === 404) {
            this.discountAmount = 0;
            this.discountCode = '';
          } else {
            throw new Error("Failed to fetch discount code");
          }
        } else {
          const discount = await response.json();
          this.discountAmount = this.totalPrice * (parseFloat(discount.amount) / 100);
        } 
    
      } catch (error) {
        console.error("Error applying discount:", error);
        this.discountAmount = 0;
        this.discountCode = '';
      }
    },
    selectPakomats(provider) {
      this.selectedPakomats = provider;
      this.selectedPakomatsAddress = '';
      console.log(provider)
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