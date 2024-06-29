import { AxiosError } from "axios";
import http from "../http";

const REQUEST_MAPPING: string = "/post";

export function createPost(formData: FormData): void {
    http.post(REQUEST_MAPPING + "/create", formData)
        .catch((error: AxiosError) => {
            console.log((error.response?.data as any).message);
        });;
}

export function updatePost(formData: FormData): void {
    http.post(REQUEST_MAPPING + "/update", formData)
        .catch((error: AxiosError) => {
            console.log((error.response?.data as any).message);
        });
}