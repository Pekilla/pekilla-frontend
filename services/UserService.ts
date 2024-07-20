import http from "@/http";
import { UserDTO } from "@/models/dto/UserDTO";

const REQUEST_MAPPING = "/api/users";

export const getUserInfoByUserName = (username: string) => {
    return http.get<UserDTO>(`${REQUEST_MAPPING}/${username}`);
}

export const getAllUsernames = () => {
    return http.get(REQUEST_MAPPING + "/usernames")
}

export const existsUsername = (username: string) => {
    return http.get(`${REQUEST_MAPPING}/exists/username`, { params: { username } });
}

export const existsEmail = (email: string) => {
    return http.get(`${REQUEST_MAPPING}/exists/email`, { params: { email } });
}