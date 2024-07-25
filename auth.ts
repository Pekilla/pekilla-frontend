import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { login } from "./services/AuthService";

export const { handlers, auth, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/login",
        signOut : "/logout"
    },
    secret: process.env?.AUTH_SECRET,
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                let user = (await login(credentials?.username as any, credentials?.password as any)).data;
                console.log(user);

                if (user) {
                    return user;
                } else {
                    return null
                }
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            console.log(token);
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            console.log(token);
            session.user = token as any;
            return session;
        },
    }
})