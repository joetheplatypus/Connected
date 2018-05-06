<template>
  <v-container>
    <h1 class="ma-3 pa-3">All Posts</h1>
    <v-layout row wrap>
       <v-card>
        <router-link :to="{ name: 'create-post' }">
          <v-btn fixed bottom right fab><v-icon>add</v-icon></v-btn>
        </router-link>
      </v-card>
      <v-flex xs8 offset-xs2 class="cont">
        <v-layout row wrap>
          <v-flex xs6>
            <article v-for="post in lposts" :key="post._id" class="ma-3 flex">
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
                    :to="`posts/${post._id}/edit/`"
                    class="click"
                  >
                    edit
                  </router-link>
                  {{post.message}}
                </v-container>
              </v-card>
            </article>
          </v-flex>
          <v-flex xs6>
            <article v-for="post in rposts" :key="post._id" class="ma-3 flex">
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
                    :to="`posts/${post._id}/edit/`"
                    class="click"
                  >
                    edit
                  </router-link>
                  {{post.message}}
                </v-container>
              </v-card>
            </article>
          </v-flex>
        </v-layout>
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
      posts: [],
      lposts: [],
      rposts: [],
      cachedPosters: [],
    };
  },
  methods: {
    alreadyCached(id) {
      for (let i = 0; i < this.cachedPosters.length; i += 1) {
        if (this.cachedPosters[i]._id === id) {
          return i;
        }
      }
      return false;
    },
  },
  async mounted() {
    const data = (await PostService.index()).data;
    const dposts = data.map((_post) => {
      const post = _post;
      post.date = new Date(_post.date);
      post.poster = {
        firstname: '',
        lastname: '',
      };
      return post;
    });
    dposts.sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0));
    for (let i = 0; i < dposts.length; i += 1) {
      if (this.alreadyCached(dposts[i].userId)) {
        const index = this.alreadyCached(dposts[i].userId);
        dposts[i].poster = this.cachedPosters[index];
      } else {
        const poster = (await UserService.get(dposts[i].userId)).data;
        this.cachedPosters.push(poster);
        dposts[i].poster = poster;
      }
      if (dposts[i].poster._id === this.$store.state.user._id) {
        dposts[i].myPost = true;
      }
      if (i % 2 === 0) {
        this.lposts.push(dposts[i]);
      } else {
        this.rposts.push(dposts[i]);
      }
    }
    this.posts = dposts;
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
  .outer {
    -webkit-column-count: 2; /* Chrome, Safari, Opera */
    -moz-column-count: 2; /* Firefox */
    column-count: 2;
    -moz-column-gap: 2em;
    -webkit-column-gap: 2em;
    column-gap: 2em;
    column-fill: balance;
  }
  .outer article {
    -webkit-column-break-inside: avoid;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .click {
    cursor: pointer;
  }
</style>
