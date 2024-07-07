import http from "@/http";

const REQUEST_MAPPING = "/api/categories";

export const getAllCategories = () => {
    return http.get(REQUEST_MAPPING);
};

export const getNames = () => {
    return http.get(REQUEST_MAPPING + "/names");
}