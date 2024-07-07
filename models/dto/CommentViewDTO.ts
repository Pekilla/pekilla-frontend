import { UserDTO } from "./UserDTO";

export interface CommentViewDTO extends UserDTO{
    id        : number
    message   : string;
    addedDate : Date;
};