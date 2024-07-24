"use server";

import { auth, signOut } from "@/auth";

export async function getAuthorization(): Promise<{ Authorization: string }> {
    let token = (await auth())?.user?.token;
    return new Promise((resolve) => resolve({ Authorization: "Bearer " + token }));
}