<template>
  <div id="app">
    <v-app>
      <navbar></navbar>
      <router-view/>
    </v-app>
  </div>
</template>

<script>
import navbar from '@/components/navbar';
import ProfileService from '@/services/ProfileService';

export default {
  name: 'App',
  components: {
    navbar,
  },
  async created() {
    const tok = window.localStorage.getItem('token');
    if (tok !== null) {
      this.$store.dispatch('setToken', tok);
      try {
        const user = (await ProfileService.get()).data;
        this.$store.dispatch('setUser', user);
        this.$store.dispatch('setLoggedIn', true);
      } catch(err) {
        console.log('token not valid');
        this.$store.dispatch('setToken', undefined);
      }     
    }
  },
};
</script>

<style>
#app {
  text-align: center;
}
</style>
