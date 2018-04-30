<template>
  <v-container>
    <h1 class="ma-3 pa-3">All Posts</h1>
    <v-layout>
      <v-flex xs8 offset-xs2 v-for="post in posts" :key="post._id">
        <v-card class="pa-1">
          <v-card-title>
            <div class="tal">
              <h3 class="headline mb-0 pa-2">User with ID {{post.userId}} </h3>
              <div class="pa-2">{{post.message}}</div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <div v-for="post in posts" :key="post._id">
      {{post.message}} - Posted by user with ID {{post.userId}} - {{post.date.toGMTString()}}
    </div>
  </v-container>
</template>

<script>
import PostService from '@/services/PostService';

export default {
  data() {
    return {
      posts: [],
    };
  },
  methods: {

  },
  async mounted() {
    const data = (await PostService.index()).data;
    this.posts = data.map((_post) => {
      const post = _post;
      post.date = new Date(_post.date);
      return post;
    });
    this.posts = data;
  },
};
</script>

<style scoped>
  .tal {
    text-align: left;
  }
</style>
