import { PostDTO } from "./PostDTO";

/**
 * DTO that contain for viewing Post.
 */

export interface PostViewDTO extends PostDTO {
    username: string;
    userLink: string;
    addedDate: Date;
};