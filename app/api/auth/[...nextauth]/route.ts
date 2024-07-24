import { login } from "@/services/AuthService";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

const handler = NextAuth({
    pages: {
        signIn: "/login"
    },
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                let user = (await login(credentials?.username!, credentials?.password!)).data;
                cookies().set("token", user.token);
                console.log(user);

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    console.log(user);
                    return user;
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            },
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            return { ...token, ...user }
        },
        session: async ({ session, token, user }) => {
            console.log(token);
            session.user = token as any;
            return session;
        }
    }
});

export { handler as GET, handler as POST };
