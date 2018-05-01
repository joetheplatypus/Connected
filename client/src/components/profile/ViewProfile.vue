<template>
  <v-container>
    <h1 class="ma-3 pa-3">My Profile</h1>
    <v-layout>
      <v-flex xs8 offset-xs2>
        <v-card class="pa-1">
          <v-container>
            {{this.profile}}
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

      },
    };
  },
  async mounted() {
    const profile = (await ProfileService.get()).data;
    this.profile = profile;
  },
};
</script>

<style>

</style>
