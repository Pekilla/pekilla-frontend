import { Category } from "../enums/Category";

/**
 * Default DTO for create and update Post.
 */
export interface PostDTO {
    id?: number;
    title: string;
    description: string;
    tags: string[];
    category: Category;
};