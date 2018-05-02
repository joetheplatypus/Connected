<template>
  <v-container>
    <h1 class="ma-3 pa-3">Login</h1>
    <v-layout>
      <v-flex xs6 offset-xs3>
        <v-card class="pa-1">
          <v-container>
            <v-form v-model="valid" v-on:submit.prevent="submit()">
            <v-text-field
              label="email"
              v-model= "user.email"
              :rules="[v => !!v || 'Please enter you email address']"
              required
            ></v-text-field>
            <v-text-field
              label="password"
              v-model= "user.password"
              :rules="[v => !!v || 'Password is empty']"
              required
            ></v-text-field>
            <v-btn @click="submit()">Log In</v-btn>
          </v-form>
          <div>{{error}}</div>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AuthService from '@/services/AuthService';

export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      valid: false,
      error: '',
    };
  },
  methods: {
    async submit() {
      this.error = '';
      const response = (await AuthService.login(this.user)).data;
      if (response.auth) {
        this.$store.dispatch('setToken', response.token);
        this.$store.dispatch('setUser', response.user);
        this.$store.dispatch('setLoggedIn', true);
        this.$router.push({
          name: 'posts',
        });
      } else {
        this.error = 'invalid login';
      }
    },
  },
};
</script>

<style>

</style>
