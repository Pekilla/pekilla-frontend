/**
 * DTO for creating a new Comment
 */

export interface CommentDTO {
    message: string;
    postId: number;
    userId: number;
};