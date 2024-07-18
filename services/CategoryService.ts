import http from "@/http";
import { CategoryViewDTO } from "@/models/dto/CategoryViewDTO";
import { EditCreateCategoryDTO } from "@/models/dto/EditCreateCategoryDTO";
import { Axios, AxiosError } from "axios";

const REQUEST_MAPPING = "/api/categories";

export const getAllCategories = async () => {
    return http.get<CategoryViewDTO[]>(`${REQUEST_MAPPING}`);
};

export const getNames = async () => {
    return http.get(REQUEST_MAPPING + "/names");
}

export async function createCategory(categoryDTO: EditCreateCategoryDTO | any, bannerFile?: File, iconFile?: File) {
    let formData = new FormData();

    Object.keys(categoryDTO).forEach((key) => {
        formData.append(key, categoryDTO[key]);
    });

    return http.post(REQUEST_MAPPING, formData);
}

export function updateCategory(categoryDTO: EditCreateCategoryDTO | any) {
    let formData = new FormData();

    Object.keys(categoryDTO).forEach((key) => {
        formData.append(key, categoryDTO[key]);
    });

    return http.patch(REQUEST_MAPPING, formData);
}

export function isExists(name: string) {
    return http.get<boolean>(`${REQUEST_MAPPING}/exists`, { params: { name } });
}

export function getEditCategory(name: string): Promise<any> {
    return http.get(`${REQUEST_MAPPING}/edit`, { params: { name } }).catch((error: AxiosError) => {
        return new Promise((resolve) => resolve({ data: error.response?.status }));
    });
}