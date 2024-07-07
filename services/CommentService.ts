import { AxiosError } from "axios";
import http from "../http";
import { CommentDTO } from "@models/dto/CommentDTO";
import { CommentViewDTO } from "@models/dto/CommentViewDTO";

const REQUEST_MAPPING: string = "/api/comments";

export const getAllComments = async (postId : number) => {
   return await http.get<CommentViewDTO[]>(`${REQUEST_MAPPING}/post/${postId}/all`);
}

export const getCommentById = async (commentId : number) => {
    return await http.get<CommentDTO>(`${REQUEST_MAPPING}/${commentId}`);
}

export const createComment = async (commentDto : CommentDTO) => {
    http.post(`${REQUEST_MAPPING}/post/add`, undefined, 
        { params: {
            message: commentDto.message,
            postId: commentDto.postId,
            userId: commentDto.userId
        }}).catch((error : AxiosError) => {
            console.log(error.message);
        })
}