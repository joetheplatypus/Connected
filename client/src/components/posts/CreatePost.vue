<template>
  <v-container>
    <h1 class="ma-3 pa-3">New Post</h1>
    <v-layout>
      <v-flex xs8 offset-xs2>
        <v-card class="pa-1">
          <v-form v-model="valid" v-on:submit.prevent="submit()">
            <v-text-field
              label="Message"
              v-model= "post.message"
              required
            ></v-text-field>
            <v-btn @click="submit()">Post</v-btn>
          </v-form>
          <div v-html="error"></div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PostService from '@/services/PostService';

export default {
  data() {
    return {
      valid: false,
      post: {
        message: '',
        userId: 3,
        date: '',
      },
      error: '',
    };
  },
  methods: {
    async submit() {
      try {
        await PostService.post(this.post);
      } catch (err) {
        this.error = err;
      }
    },
  },
  mounted() {
    const d = new Date();
    this.post.date = d.toISOString();
  },
};
</script>

<style>

</style>
