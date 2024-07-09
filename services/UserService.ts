import http from "@/http";
import { UserSettingDTO } from "@/models/dto/UserSettingDTO";

const REQUEST_MAPPING = "/api/users"

export function getUserSetting(userId: number) {
    return http.get<UserSettingDTO>(REQUEST_MAPPING + "/setting", {params : {userId}});
}