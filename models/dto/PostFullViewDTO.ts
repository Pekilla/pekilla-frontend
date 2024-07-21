import { CommentViewDTO } from "./CommentViewDTO";
import { PostViewDTO } from "./PostViewDTO";

export interface PostFullViewDTO {
    post: PostViewDTO;
    comments: CommentViewDTO[];
}