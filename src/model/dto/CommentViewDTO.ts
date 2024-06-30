import { CommentDTO } from "./CommentDTO";

/**
 * comment viewing
 */

export interface CommentViewDTO extends CommentDTO {
    username : string;
    userLink: string;
}