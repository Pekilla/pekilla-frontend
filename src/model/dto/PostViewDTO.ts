import { PostDTO } from "./PostDTO";
import { UserDTO } from "./UserDTO";

/**
 * DTO that contain for viewing Post.
 */
export interface PostViewDTO extends PostDTO, UserDTO {
    addedDate: Date;
};