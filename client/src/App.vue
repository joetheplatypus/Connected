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

export default {
  name: 'App',
  components: {
    navbar,
  },
};
</script>

<style>
#app {
  text-align: center;
}
</style>
