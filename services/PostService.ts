import { PostDTO } from "@models/dto/PostDTO";
import { PostViewDTO } from "@models/dto/PostViewDTO";
import { AxiosError, AxiosResponse } from "axios";
import http from "../http";
import { CommentViewDTO } from "@/models/dto/CommentViewDTO";
import { UserDTO } from "@/models/dto/UserDTO";
import { getAuthorization } from "./Service";

const REQUEST_MAPPING: string = "/api/posts";

export const getPostById = async (postId: number) => {
    return http.get<PostViewDTO>(`${REQUEST_MAPPING}/${postId}`)
}

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

export const getAllComments = async (postId: number) => {
    return await http.get<CommentViewDTO[]>(`${REQUEST_MAPPING}/${postId}/comments`);
}