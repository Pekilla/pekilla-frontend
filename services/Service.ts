"use server";

import { cookies } from "next/headers";

export async function getAuthorization(): Promise<{ Authorization: string }> {
    return new Promise((resolve) => resolve({ Authorization: "Bearer " + cookies().get("token")?.value }));
}