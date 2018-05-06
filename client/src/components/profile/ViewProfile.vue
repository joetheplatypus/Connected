<template>
  <v-container>
    <h1 class="ma-3 pa-3">My Profile</h1>
    <v-layout>
      <v-flex xs8 offset-xs2>
        <v-card class="pa-1">
          <v-container>
            <v-card>
              <router-link :to="{ name: 'edit-profile'}">
                <v-btn absolute top right fab><v-icon>edit</v-icon></v-btn>
              </router-link>
            </v-card>
            <v-subheader>Name</v-subheader>
            <h1>{{profile.firstname}} {{profile.lastname}}</h1>
            <v-subheader>Email Account</v-subheader>
            <h2>{{profile.email}}</h2>
            <v-subheader>Password</v-subheader>
            <h3>
              ******
              <br />
              <router-link :to="{ name: 'edit-password' }">Change password</router-link>
            </h3>
            <v-subheader>Gender</v-subheader>
            <h2>{{profile.gender}}</h2>
            <v-subheader>Birth date</v-subheader>
            <h2>{{profile.birthday.toDateString()}}</h2>
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
      profile: {
        birthday: new Date(),
      },
    };
  },
  async mounted() {
    const profile = (await ProfileService.get()).data;
    this.profile = profile;
    this.profile.birthday = new Date(this.profile.birthday);
  },
};
</script>

<style>

</style>
