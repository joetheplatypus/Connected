<template>
  <v-container>
    <h1 class="ma-3 pa-3">My Profile</h1>
    <v-layout>
      <v-flex xs8 offset-xs2>
        <v-card class="pa-1">
          <v-container>
            <v-form v-model="valid" v-on:submit.prevent="submit()">
              <v-text-field
                autocomplete="given-name"
                label="First Name"
                v-model="profile.firstname"
                :rules="[v => !!v || 'Please enter your first name']"
                required
              ></v-text-field>
              <v-text-field
                autocomplete="family-name"
                label="Last Name"
                v-model="profile.lastname"
                :rules="[v => !!v || 'Please enter your last name']"
                required
              ></v-text-field>
              <v-text-field
                autocomplete="email"
                label="email"
                v-model="profile.email"
                prepend-icon="email"
                :rules="[v => !!v || 'Please enter your email address']"
                required
              ></v-text-field>
              <v-select
                :items="genders"
                v-model="profile.gender"
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
      profile: {
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
  async mounted() {
    const profile = (await ProfileService.get()).data;
    this.profile = profile;
    this.datepicker = this.formatDate(new Date(this.profile.birthday));
  },
  methods: {
    async submit() {
      this.error = '';
      if (!this.valid) {
        return;
      }
      try {
        const newDetails = (await ProfileService.put(this.profile)).data;
        this.$store.dispatch('setUser', newDetails);
        this.$router.push({
          name: 'profile',
        });
      } catch (err) {
        this.error = 'an error has occured';
      }
    },
    saveDate(d) {
      this.$refs.datemenu.save(d);
      const date = new Date(d);
      this.profile.birthday = this.formatDate(date);
    },
    formatDate(d) {
      return (d.toISOString().substr(0, 10));
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
