import { UserDTO } from "./UserDTO";

export interface CommentViewDTO extends UserDTO{
    message : string;
    addedDate : Date;
};