import { PostDTO } from "@models/dto/PostDTO";
import { PostViewDTO } from "@models/dto/PostViewDTO";
import { AxiosError, AxiosResponse } from "axios";
import http from "../http";

const REQUEST_MAPPING: string = "/posts";

export const getPostById = async (postId : number) => {
    return (await http.get<PostDTO>(`${REQUEST_MAPPING}/${postId}`)).data
}

export const deletePost = async (postId : number, removeCallback: any) => {
    return http.delete(`${REQUEST_MAPPING}/${postId}`)
    .then(res => {
        if(res?.data) removeCallback(postId);
    })
    .catch((error : AxiosError) => {
        console.log((error.response?.data as any).message);
    });
}

export async function createPost(postDTO: PostDTO) {
    return http.post(REQUEST_MAPPING + "/create", postDTO)
        .catch((error: AxiosError) => {
            console.log((error.response?.data as any).message);
        });;
}

export async function updatePost(postDTO: PostDTO): Promise<void | AxiosResponse<PostViewDTO, any>> {
    return http.post(REQUEST_MAPPING + "/update", postDTO)
        .catch((error: AxiosError) => {
            console.log((error.response?.data as any).message);
        });
}

export async function searchPosts(content?: string, category?: string, tags?: string[]) {
    return http.get<PostViewDTO[]>(REQUEST_MAPPING + `/search`, {params : {content, category, tags}, paramsSerializer : {indexes : null}});
}

export async function getAllPost() {
    return searchPosts();
}