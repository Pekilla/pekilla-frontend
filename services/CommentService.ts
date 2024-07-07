import { AxiosError } from "axios";
import http from "../http";
import { CommentDTO } from "@models/dto/CommentDTO";

const REQUEST_MAPPING: string = "/api/comments";

export const getCommentById = async (commentId : number) => {
    return await http.get<CommentDTO>(`${REQUEST_MAPPING}/${commentId}`);
}

export const createComment = async (commentDto : CommentDTO) => {
    http.post(REQUEST_MAPPING, undefined, 
        { params: {
            message: commentDto.message,
            postId: commentDto.postId,
            userId: commentDto.userId
        }}).catch((error : AxiosError) => {
            console.log(error.message);
        })
}