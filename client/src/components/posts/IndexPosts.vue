<template>
  <v-container>
    <h1 class="ma-3 pa-3">All Posts</h1>
    <v-layout row wrap>
      <v-flex xs8 offset-xs2 v-for="post in posts" :key="post._id" class="mb-3">
        <v-card class="pa-1">
          <v-card-title>
            <v-layout row>
              <v-flex xs9 class="tal">
                <h2>User with ID {{post.userId}}</h2>
              </v-flex>
              <v-flex xs3 class="mgfix">
                <div>{{post.date.toGMTString()}}</div>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-container class="tal">
            {{post.message}}
          </v-container>
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
  .mgfix {
    margin: auto;
  }
</style>
