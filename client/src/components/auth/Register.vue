<template>
  <v-container>
    <h1 class="ma-3 pa-3">Create a Connected account</h1>
    <v-layout>
      <v-flex xs6 offset-xs3>
        <v-card class="pa-1">
          <v-container>
            <v-form v-model="valid" v-on:submit.prevent="submit()">
              <v-text-field
                autocomplete="given-name"
                label="First Name"
                v-model= "user.firstname"
                :rules="[v => !!v || 'Please enter your first name']"
                required
              ></v-text-field>
              <v-text-field
                autocomplete="family-name"
                label="Last Name"
                v-model= "user.lastname"
                :rules="[v => !!v || 'Please enter your last name']"
                required
              ></v-text-field>
              <v-text-field
                autocomplete="email"
                label="email"
                v-model= "user.email"
                prepend-icon="email"
                :rules="[v => !!v || 'Please enter your email address']"
                required
              ></v-text-field>
              <v-text-field
                label="password"
                v-model= "user.password"
                :rules="[v => !!v || 'Password is empty']"
                prepend-icon="security"
                required
              ></v-text-field>
              <v-select
                :items="genders"
                v-model="user.gender"
                label="Gender"
                prepend-icon="person"
                single-line
              ></v-select>
              <v-menu
                ref="datemenu"
                lazy
                :close-on-content-click="false"
                v-model="datemenu"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  label="Birthday date"
                  v-model="datepicker"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker
                  ref="datepicker"
                  v-model="datepicker"
                  @change="saveDate"
                  min="1950-01-01"
                  :max="new Date().toISOString().substr(0, 10)"
                ></v-date-picker>
              </v-menu>
              <v-btn @click="submit()">Create Account</v-btn>
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
        firstname: '',
        lastname: '',
        gender: '',
        email: '',
        password: '',
        birthday: '',
      },
      genders: [
        'Male',
        'Female',
      ],
      valid: false,
      error: '',
      datemenu: false,
      datepicker: '',
    };
  },
  methods: {
    async submit() {
      this.error = '';
      const response = (await AuthService.register(this.user)).data;
      if (response.auth) {
        this.$store.dispatch('setToken', response.token);
        this.$store.dispatch('setUser', response.user);
        this.$store.dispatch('setLoggedIn', true);
        this.$router.push({
          name: 'posts',
        });
      } else {
        this.error = 'an error has occured';
      }
    },
    saveDate(d) {
      this.$refs.datemenu.save(d);
      const date = new Date(d);
      this.user.birthday = date.toISOString().substr(0, 10);
    },
  },
  watch: {
    datemenu(val) {
      return (val && this.$nextTick(() => { this.$refs.datepicker.activePicker = 'YEAR'; }));
    },
  },
};
</script>

<style>

</style>
