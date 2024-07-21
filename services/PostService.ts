import { PostDTO } from "@models/dto/PostDTO";
import { PostViewDTO } from "@models/dto/PostViewDTO";
import { AxiosError, AxiosResponse } from "axios";
import http from "../http";
import { getAuthorization } from "./Service";
import { PostFullViewDTO } from "@/models/dto/PostFullViewDTO";

const REQUEST_MAPPING: string = "/api/posts";

export const deletePost = async (postId: number) => {
    return http.delete(`${REQUEST_MAPPING}/${postId}`);
}

export async function createPost(postDTO: PostDTO) {
    return http.post(REQUEST_MAPPING, postDTO, { headers: await getAuthorization() })
        .catch((error: AxiosError) => {
            console.log((error.response?.data as any).message);
        });;
}

export async function updatePost(postDTO: PostDTO): Promise<void | AxiosResponse<PostViewDTO, any>> {
    return http.patch(REQUEST_MAPPING, postDTO, { headers: await getAuthorization() })
        .catch((error: AxiosError) => {
            console.log((error.response?.data as any).message);
        });
}

export async function searchPosts(content?: string, category?: string, tags?: string[]) {
    return http.get<PostViewDTO[]>(REQUEST_MAPPING + `/search`, { params: { content, category, tags }, paramsSerializer: { indexes: null } });
}

export async function getAllPost() {
    return searchPosts();
}

export async function getPostFullView(postId: number) {
    return http.get<PostFullViewDTO>(`${REQUEST_MAPPING}/${postId}/full-view`, { params: { postId } });
}