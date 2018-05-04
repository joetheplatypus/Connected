<template>
  <v-toolbar>
    <v-toolbar-title>Connected</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat to='/' v-if='$store.state.loggedIn'> Posts </v-btn>
      <v-btn flat v-if='$store.state.loggedIn'> Users </v-btn>
      <v-menu offset-y v-if='$store.state.loggedIn'>
        <v-btn flat slot="activator">
          {{$store.state.user.firstname}} {{$store.state.user.lastname}}
        </v-btn>
        <v-list>
          <router-link to="/profile" tag="v-list-tile">
            <v-list-tile-title>Profile</v-list-tile-title>
          </router-link>
          <router-link to="/logout" tag="v-list-tile">
            <v-list-tile-title>Logout</v-list-tile-title>
          </router-link>
        </v-list>
      </v-menu>
      <v-btn flat to='/login' v-if='!$store.state.loggedIn'> Login </v-btn>
      <v-btn flat to='/register' v-if='!$store.state.loggedIn'> Register </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {

};
</script>

<style>

</style>
