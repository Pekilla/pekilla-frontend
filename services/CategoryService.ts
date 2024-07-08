import http from "@/http";
import { CategoryViewDTO } from "@/models/dto/CategoryViewDTO";

const REQUEST_MAPPING = "/api/categories";

export const getAllCategories = async () => {
    return http.get<CategoryViewDTO[]>(`${REQUEST_MAPPING}`);
};

export const getNames = async () => {
    return http.get(REQUEST_MAPPING + "/names");
}