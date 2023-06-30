import { defineStore } from "pinia";
import type Post from "@/types/Post"
import http from "@/http-common"
import axios from "axios"

export const usePostListStore = defineStore("posts", {
    state: () => ({
        posts: [] as Post[],
        post: { id: 0, text: '' }
    }),
    actions:{
        async loadPosts() {
            try {
                const res = await http.get('/posts')
                const data = await res.data
                this.posts = data
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log(error?.response?.status + ' : ' + error.message)
                } else {
                    console.error(error);
                }
            }
        },
        async loadPost(id: number) {
            try {
                const res = await http.get(`/posts/${id}`)
                const data = await res.data
                this.post = data
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log(error?.response?.status + ' : ' + error.message)
                } else {
                    console.error(error);
                }
            }
        },
        async removePost(id: number){
            const res = await http.delete(`/posts/${id}`)
            const data = await res.data
            this.posts = data
        },
        async addPost(payload: Post){
            const res = await http.post(`/posts`, payload)
            const data = await res.data
            this.posts = data
        }
    }
});
