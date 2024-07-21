import http from "@/http";
import { UserProfileDTO } from "@/models/dto/UserProfileDTO";

const REQUEST_MAPPING = "/api/users";

export const getUserProfile = (username: string) => {
    return http.get<UserProfileDTO>(`${REQUEST_MAPPING}/${username}/profile`);
}

export const getAllUsernames = () => {
    return http.get(REQUEST_MAPPING + "/usernames")
}