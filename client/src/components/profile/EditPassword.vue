<template>
  <v-container>
    <h1 class="ma-3 pa-3">My Profile</h1>
    <v-layout>
      <v-flex xs8 offset-xs2>
        <v-card class="pa-1">
          <v-container>
            <v-form v-model="valid" v-on:submit.prevent="submit()">
              <v-text-field
                autocomplete="password"
                label="Current Password"
                v-model="currentPass"
                :rules="[v => !!v || 'Please enter your current password']"
                required
              ></v-text-field>
              <v-text-field
                autocomplete="password"
                label="New Password"
                v-model="newPass"
                :rules="[v => !!v || 'Please enter your new password']"
                required
              ></v-text-field>
              <v-text-field
                autocomplete="password"
                label="Confirm New Password"
                v-model="confirmPass"
                :rules="[v => !!v || 'Please enter your new password']"
                required
              ></v-text-field>
              <v-btn @click="submit()">Save Changes</v-btn>
            </v-form>
            <div>{{error}}</div>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ProfileService from '@/services/ProfileService';

export default {
  data() {
    return {
      currentPass: '',
      newPass: '',
      confirmPass: '',
      valid: false,
      error: '',
    };
  },
  methods: {
    async submit() {
      this.error = '';
      if (!this.valid) {
        return;
      }
      if (this.newPass !== this.confirmPass) {
        this.error = 'New Passwords do not match';
        return;
      }
      try {
        const response = (await ProfileService.putPass({
          currentPass: this.currentPass,
          newPass: this.newPass,
        })).data;
        if (response.error) {
          this.error = response.error;
        }
      } catch (err) {
        this.error = 'an error has occured';
      }
    },
  },
};
</script>

<style>

</style>
