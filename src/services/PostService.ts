import { AxiosError } from "axios";
import http from "../http";
import { PostDTO } from "../model/dto/PostDTO";
import { PostViewDTO } from "../model/dto/PostViewDTO";

const REQUEST_MAPPING: string = "/post";

export function createPost(postDTO: PostDTO, userId: number): void {
    http.post(REQUEST_MAPPING + "/create", postDTO, {params : {userId}})
        .catch((error: AxiosError) => {
            console.log((error.response?.data as any).message);
        });;
}

export function updatePost(postDTO: PostDTO, userId: number): void {
    http.post(REQUEST_MAPPING + "/update", postDTO, {params : {userId}})
        .catch((error: AxiosError) => {
            console.log((error.response?.data as any).message);
        });
}

export function getAllPost() {
    return http.get<PostViewDTO[]>(REQUEST_MAPPING + "/all");
}