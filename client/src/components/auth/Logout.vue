<template>
  <div>Redirecting....</div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('setUser', null);
    this.$store.dispatch('setToken', '');
    this.$store.dispatch('setLoggedIn', false);
    this.$router.push({
      name: 'login',
    });
  },
};
</script>

<style>

</style>
