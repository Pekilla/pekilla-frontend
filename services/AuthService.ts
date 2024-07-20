import http from "@/http";

const REQUEST_MAPPING = "/api/auth";

export function signUp(email: string, username: string, password: string) {
    return http.post(`${REQUEST_MAPPING}/sign-up`, undefined, { params: { email, username, password } });
}

export async function login(username: string, password: string): Promise<any> {
    try {
        return await http.post(`${REQUEST_MAPPING}/login`, undefined, { params: { username, password } });
    } catch (error: any) {
        return await new Promise((resolve) => resolve({ data: undefined, status: error?.response?.status }));
    }
}

export function validateToken(token: string) {
    return http.post(`${REQUEST_MAPPING}/validate-token`, undefined, { params: { token } });
}