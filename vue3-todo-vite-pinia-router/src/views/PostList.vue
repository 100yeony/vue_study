<template>
    <div>
        <h1>Posts</h1>
        <div v-if="loading">Loading...</div>
        <div v-for="post in posts" :key="post.id">
            <router-link :to="{ name: 'post', params: { id: post.id } }">
                [ID: {{ post.id }}] {{ summary(post.text) }}
            </router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, computed } from "vue"
import { storeToRefs } from "pinia"
import { usePostListStore } from '@/stores/usePostStore'

const store = usePostListStore()
const loading = ref(true)
const { posts } = storeToRefs(store);

//const posts = computed(() => store.state.modulePost.posts)

onBeforeMount(() => {
    fetchData();
});

const fetchData = () => {
    loading.value = true;
    store.loadPosts().then(() => {
        loading.value = false;
    });
};

const summary = (val: string) => {
    if (typeof val === "string") {
        return val.substring(0, 20) + "...";
    }
    return val;
};
</script>