import { AxiosError, AxiosPromise, AxiosResponse } from "axios";
import http from "../http";
import { PostDTO } from "../model/dto/PostDTO";
import { PostViewDTO } from "../model/dto/PostViewDTO";

const REQUEST_MAPPING: string = "/post";

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

export async function createPost(postDTO: PostDTO, userId: number) {
    return http.post(REQUEST_MAPPING + "/create", postDTO, {params : {userId}})
        .catch((error: AxiosError) => {
            console.log((error.response?.data as any).message);
        });;
}

export async function updatePost(postDTO: PostDTO, userId: number): Promise<void | AxiosResponse<PostViewDTO, any>> {
    return http.post(REQUEST_MAPPING + "/update", postDTO, {params : {userId}})
        .catch((error: AxiosError) => {
            console.log((error.response?.data as any).message);
        });
}

export function getAllPost() {
    return http.get<PostViewDTO[]>(REQUEST_MAPPING + "/all");
}