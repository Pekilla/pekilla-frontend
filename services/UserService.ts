import http from "@/http";
import { UserDTO } from "@/models/dto/UserDTO";

const REQUEST_MAPPING = "/api/users";

export const getUserInfoByUserName = (username: string) => {
    return http.get<UserDTO>(`${REQUEST_MAPPING}/${username}`);
}

export const getAllUsernames = () => {
    return http.get(REQUEST_MAPPING + "/usernames")
}