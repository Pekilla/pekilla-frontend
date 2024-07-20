import http from "@/http";
import { UserSettingDTO } from "@/models/dto/UserSettingDTO";
import { getAuthorization } from "./Service";

const REQUEST_MAPPING = "/api/setting";

export async function getUserSetting() {
    return http.get<UserSettingDTO>(REQUEST_MAPPING, { headers: await getAuthorization() });
}

function getFormDataFromSettingAction(multipartFile?: File, isDelete?: boolean) {
    let formData = new FormData();
    if (multipartFile) formData.append("multipartFile", multipartFile);
    if (isDelete) formData.append("isDelete", `${isDelete}`);
    return formData;
}

export async function changeBanner(isDelete?: boolean, multipartFile?: File) {
    return http.patch(REQUEST_MAPPING + "/banner", getFormDataFromSettingAction(multipartFile, isDelete), { headers: await getAuthorization() });
}

export async function changeIcon(isDelete?: boolean, multipartFile?: File) {
    return http.patch(REQUEST_MAPPING + "/icon", getFormDataFromSettingAction(multipartFile, isDelete), { headers: await getAuthorization() });
}

export async function isPasswordValid(password: string) {
    return http.get(`${REQUEST_MAPPING}/is-password-valid`, { params: { password }, headers: await getAuthorization() });
}

export async function changeUsername(username: string) {
    return http.patch(REQUEST_MAPPING + `/username`, undefined, { params: { username }, headers: await getAuthorization() });
}

export async function changePassword(password: string) {
    return http.patch(`${REQUEST_MAPPING}/password`, undefined, { params: { password }, headers: await getAuthorization() });
}

export async function changeEmail(email: string) {
    return http.patch(`${REQUEST_MAPPING}/email`, undefined, { params: { email }, headers: await getAuthorization() });
}