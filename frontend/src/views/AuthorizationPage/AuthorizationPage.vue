<template>
    <div class="auth-page">
      <h2>Login to Your Account</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            @input="clearError('email')"
            placeholder="Enter your email"
          />
          <span v-if="errors.email" class="error">{{ errors.email }}</span>
        </div>
  
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            @input="clearError('password')"
            placeholder="Enter your password"
          />
          <span v-if="errors.password" class="error">{{ errors.password }}</span>
        </div>
  
        <button type="submit" class="btn">Login</button>
      </form>
    </div>
  </template>
  
  <script src="./AuthorizationPage.js"></script>
  <style src="./AuthorizationPage.css"></style>