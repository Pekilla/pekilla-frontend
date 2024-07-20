"use client";

import FormikInput from "@components/post/create-update-popup/components/create-input";
import { Button, Container, Stack, Typography } from "@mui/material";
import { login, signUp } from "@services/AuthService";
import { existsEmail, existsUsername } from "@services/UserService";
import { Field, Form, Formik } from "formik";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { object, string } from "yup";

const USERNAME_EXISTS = "username already exists.";
const EMAIL_EXISTS = "email already exists.";

export default function Auth(props: { isLogin?: boolean }) {
    const [invalidUsernames, setInvalidUsernames] = useState<string[]>([]);
    const [invalidEmails, setInvalidEmails] = useState<string[]>([]);
    const router = useRouter();

    return (
        <Container>
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                    email: ""
                }}
                onSubmit={async (values, formikHelpers) => {
                    if (props.isLogin) {
                        let response = (await login(values.username, values.password));

                        if (response?.data) {
                            Cookies.set("token", response.data?.token);
                            router.push("/");
                        }

                        else if (response?.status == 400) {
                            formikHelpers.resetForm({ errors: { username: "invalid username or password." }, touched: { username: true } });
                        }
                    }

                    else {
                        // To check if the username already exists for Login.
                        if ((await existsUsername(values.username)).data) {
                            setInvalidUsernames([...invalidUsernames, values.username]);
                            formikHelpers.setFieldError("username", USERNAME_EXISTS);
                            return;
                        }

                        if ((await existsEmail(values.email)).data) {
                            setInvalidEmails([...invalidEmails, values.email]);
                            formikHelpers.setFieldError("email", EMAIL_EXISTS);
                            return;
                        }

                        Cookies.set("token", (await signUp(values.email, values.username, values.password)).data.token)
                        router.push("/");
                    }
                }}
                validationSchema={object({
                    username: string()
                        .required("username is required")
                        .min(4, "username need to be at least 4 characters.")
                        .max(30, "username need to be at most 30 characters.")
                        .notOneOf(invalidUsernames, USERNAME_EXISTS)
                    ,
                    password: props.isLogin ?
                        string()
                            .required("password is required.")
                        :
                        string()
                            .required("password is required")
                            .min(8, "password need to be at least 8 characters.")
                            .max(100, "password need to be at most 100 characters."),
                    email: props.isLogin ? string() :
                        string().required("email is required.").email("invalid email format.").notOneOf(invalidEmails, EMAIL_EXISTS)
                })}
            >
                <Form>
                    <Stack sx={{ height: "80vh" }} alignItems="center" justifyContent="center" flexWrap="wrap" direction="row" spacing={2} useFlexGap>
                        <Stack width={450} spacing={2} useFlexGap flexWrap="wrap">
                            <Typography variant="h3">{props.isLogin ? "Login" : "Sign up"}</Typography>
                            <Typography variant="subtitle1">{props.isLogin ? "Welcome back! Nice to see you again!" : "The place where the dreams become projects."}</Typography>
                            {!props.isLogin ? <Field name="email" component={FormikInput} label="Email" type="email" /> : <></>}
                            <Field name="username" component={FormikInput} label="Username" />
                            <Field name="password" component={FormikInput} label="Password" type="password" />

                            <Button type="submit">{props.isLogin ? "Sign in" : "Create account"}</Button>
                            <Typography>
                                {props.isLogin ? "Do not have an account. " : "Already have an account. "}
                                <Link href={{ pathname: props.isLogin ? "/sign-up" : "/login" }}>{props.isLogin ? "Sign up" : "Login"}</Link>
                            </Typography>
                        </Stack>
                    </Stack>
                </Form>
            </Formik>
        </Container >
    );
}