import { PostViewDTO } from "./PostViewDTO";

export interface CategoryViewDTO {
    name: string;
    description: string;
    creatorId: number;
    banner: string;
    icon: string;
    posts: PostViewDTO[];
}