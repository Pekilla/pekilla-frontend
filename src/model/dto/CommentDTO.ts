import { UserDTO } from "./UserDTO";

/**
 * DTO for creating a new Comment
 */

export interface CommentDTO extends UserDTO{
    message : string;
    postId  : number;
    userId  : number;
};