import http from "@/http";

const REQUEST_MAPPING = "/api/categories";

export const getAllCategories = async () => {
    return http.get(REQUEST_MAPPING);
};

export const getNames = async () => {
    return http.get(REQUEST_MAPPING + "/names");
}