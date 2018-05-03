<template>
  <v-container>
    <h1 class="ma-3 pa-3">All Posts</h1>
    <v-layout row wrap>
       <v-card>
        <router-link :to="{ name: 'create-post' }">
          <v-btn fixed bottom right fab><v-icon>add</v-icon></v-btn>
        </router-link>
      </v-card>
      <v-flex xs6 offset-xs3 v-for="post in posts" :key="post._id" class="mb-3">
        <v-card class="pa-1">
          <v-card-title>
            <v-layout row>
              <v-flex xs9 class="tal">
                <h2>{{post.poster.firstname}} {{post.poster.lastname}}</h2>
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
/* eslint-disable no-await-in-loop */
import PostService from '@/services/PostService';
import UserService from '@/services/UserService';

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
      post.poster = {
        firstname: '',
        lastname: '',
      };
      return post;
    });
    for (let i = 0; i < this.posts.length; i += 1) {
      const poster = (await UserService.get(this.posts[i].userId)).data;
      this.posts[i].poster = poster;
    }
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
