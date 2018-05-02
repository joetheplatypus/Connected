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
    if (tok !== '') {
      this.$store.dispatch('setToken', tok);
      try {
        const user = (await ProfileService.get()).data;
        this.$store.dispatch('setUser', user);
        this.$store.dispatch('setLoggedIn', true);
      } catch (err) {
        this.$store.dispatch('setToken', '');
        this.$router.push({
          name: 'login',
        });
      }
    } else {
      this.$store.dispatch('setToken', '');
      this.$router.push({
        name: 'login',
      });
    }
  },
};
</script>

<style>
#app {
  text-align: center;
}
</style>
