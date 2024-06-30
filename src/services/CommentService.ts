import { error, log } from "console";
import http from "../http";
import { CommentDTO } from "../model/dto/CommentDTO";
import { AxiosError } from "axios";

const REQUEST_MAPPING: string = "/comment";

export const getAllComments = async (postId : number) => {
   return await http.get<CommentDTO[]>(`${REQUEST_MAPPING}/post/${postId}/all`);
}

export const getCommentById = async (commentId : number) => {
    return await http.get<CommentDTO>(`${REQUEST_MAPPING}/${commentId}`);
}

export const createComment = async (commentDto : CommentDTO) => {
    http.post(`${REQUEST_MAPPING}/post/add`,  
        { params: {
            content: commentDto.message,
            postId: commentDto.postId,
            userId: commentDto.userId
        }}).catch((error : AxiosError) => {
            console.log(error.message);
        })
}