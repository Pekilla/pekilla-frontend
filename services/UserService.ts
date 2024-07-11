import http from "@/http";
import { UserDTO } from "@/models/dto/UserDTO";
import { UserSettingDTO } from "@/models/dto/UserSettingDTO";

const REQUEST_MAPPING = "/api/users"

export function getUserSetting(userId: number) {
    return http.get<UserSettingDTO>(REQUEST_MAPPING + "/setting", { params: { userId } });
}

export const getUserInfoByUserName = (username: string) => {
    return http.get<UserDTO>(`${REQUEST_MAPPING}/${username}`);
}

function getFormDataFromSettingAction(userId: number, multipartFile?: File, isDelete?: boolean) {
    let formData = new FormData();
    if (multipartFile) formData.append("multipartFile", multipartFile);
    formData.append("userId", userId + "");
    if (isDelete) formData.append("isDelete", isDelete + "");

    return formData;
}

export function changeBanner(userId: number, isDelete?: boolean, multipartFile?: File) {
    return http.patch(REQUEST_MAPPING + "/banner", getFormDataFromSettingAction(userId, multipartFile, isDelete));
}

export function changeIcon(userId: number, isDelete?: boolean, multipartFile?: File) {
    return http.patch(REQUEST_MAPPING + "/icon", getFormDataFromSettingAction(userId, multipartFile, isDelete));
}

export function isPasswordValid(userId: number, password: string) {
    return http.get(REQUEST_MAPPING + `/${userId}/verify-password`, { params: { password } });
}

export function changeUsername(userId: number, username: string) {
    return http.patch(REQUEST_MAPPING + `/${userId}/username/${username}`);
}