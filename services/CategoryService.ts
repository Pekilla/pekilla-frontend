import http from "@/http";
import { CategoryViewDTO } from "@/models/dto/CategoryViewDTO";
import { EditCreateCategoryDTO } from "@/models/dto/EditCreateCategoryDTO";

const REQUEST_MAPPING = "/api/categories";

export const getAllCategories = async () => {
    return http.get<CategoryViewDTO[]>(`${REQUEST_MAPPING}`);
};

export const getNames = async () => {
    return http.get(REQUEST_MAPPING + "/names");
}

export async function createCategory(categoryDTO: EditCreateCategoryDTO | any, banner?: File, icon?: File) {
    let formData = new FormData();
    if (banner) formData.append("banner", banner);
    if (icon) formData.append("icon", icon);

    Object.keys(categoryDTO).forEach((key) => {
        formData.append(key, categoryDTO[key]);
    });

    return http.post(REQUEST_MAPPING, formData);
}

export function updateCategory(categoryDTO: EditCreateCategoryDTO | any, banner?: File, icon?: File) {
    let formData = new FormData();
    if (banner) formData.append("banner", banner);
    if (icon) formData.append("icon", icon);

    Object.keys(categoryDTO).forEach((key) => {
        formData.append(key, categoryDTO[key]);
    });

    return http.patch(REQUEST_MAPPING, formData);
}