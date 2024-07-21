import { PostViewDTO } from "./PostViewDTO";

export interface UserProfileDTO {
    username: string;
    icon: string;
    banner: string;
    posts: PostViewDTO[];
    commentsNumber: number;
    friendNumber: number;
}