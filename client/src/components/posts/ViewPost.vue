<template>
  <v-container>
    <h1 class="ma-3 pa-3">View Post</h1>
    <v-layout>
      <v-flex xs6 offset-xs3>
        <v-card class="pa-1">
          <v-card-title>
            <v-layout row>
              <v-flex xs8 class="tal">
                <h2>{{post.poster.firstname}} {{post.poster.lastname}}</h2>
              </v-flex>
              <v-flex xs4 class="mgfix">
                <div>{{post.date.toGMTString()}}</div>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-container class="tal">
            <router-link
              tag="v-icon"
              v-if="post.myPost"
              :to="{
                name: 'edit-post',
                params: {
                  postId: post._id,
                },
              }"
              class="click"
            >
              edit
            </router-link>
            {{post.message}}
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable no-await-in-loop */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import PostService from '@/services/PostService';
import UserService from '@/services/UserService';

export default {
  data() {
    return {
      post: {
        poster: {},
        date: new Date(),
      },
    };
  },
  methods: {

  },
  async mounted() {
    const post = (await PostService.get(this.$route.params.postId)).data;
    post.date = new Date(post.date);
    post.poster = (await UserService.get(post.userId)).data;
    if (post.poster._id === this.$store.state.user._id) {
      post.myPost = true;
    }
    this.post = post;
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
.click {
  cursor: pointer;
}
</style>
