import * as yup from 'yup';

const users = [
    { name: 'Test User', email: 'test@example.com', password: '123456', isAdmin: false },
    { name: 'Admin User', email: 'admin@example.com', password: 'adminpass', isAdmin: true }
  ];

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      errors: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    clearError(field) {
      this.errors[field] = '';
    },
    async validateForm() {
      const schema = yup.object().shape({
        email: yup.string().email('Invalid email address').required('Email is required'),
        password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      });

      try {
        await schema.validate(this.form, { abortEarly: false });
        this.errors = {}; // Clear errors if valid
        return true;
      } catch (validationError) {
        this.errors = {};
        validationError.inner.forEach((err) => {
          this.errors[err.path] = err.message;
        });
        return false;
      }
    },
    async submitForm() {
        const isValid = await this.validateForm();
        if (isValid) {
          const userExists = users.some(
            (user) => user.email === this.form.email && user.password === this.form.password
          );
      
          if (userExists) {
            // Simulate storing the user data in localStorage
            localStorage.setItem('loggedInUser', JSON.stringify(this.form.email));
            alert('Login successful!');
            this.$router.push('/'); // Redirect to Home page
          } else {
            this.errors.email = 'Invalid email or password'; // Show generic error
          }
        }
      },
  },
};