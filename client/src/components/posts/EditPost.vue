<template>
  <v-container>
    <h1 class="ma-3 pa-3">Edit Post</h1>
    <v-layout>
      <v-flex xs8 offset-xs2>
        <v-card class="pa-1">
          <v-container>
            <v-form v-model="valid" v-on:submit.prevent="submit()">
            <v-text-field
              label="Message"
              v-model= "post.message"
              required
            ></v-text-field>
            <v-btn @click="submit()">Post</v-btn>
          </v-form>
          <div v-html="error"></div>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable no-underscore-dangle */
import PostService from '@/services/PostService';

export default {
  data() {
    return {
      valid: false,
      post: {
        _id: '',
        message: '',
        userId: '',
        date: '',
      },
      error: '',
    };
  },
  methods: {
    async submit() {
      const d = new Date();
      this.post.date = d.toISOString();
      try {
        await PostService.put(this.post);
        this.$router.push({
          name: 'posts',
        });
      } catch (err) {
        this.error = err;
      }
    },
    checkCanEdit() {
      if (this.post.userId !== this.$store.state.user._id) {
        this.$router.push({
          name: 'view-post',
          params: {
            postId: this.post._id,
          },
        });
      }
    },
  },
  async mounted() {
    try {
      const post = (await PostService.get(this.$route.params.postId)).data;
      this.post = post;
      this.checkCanEdit();
    } catch (err) {
      this.error = err;
    }
  },
};
</script>

<style>

</style>
