"use client";

import { CreateInput } from "@/components/post/create-update-popup/components/create-input";
import { changeUsername, isPasswordValid } from "@/services/UserService";
import { notEmptyWithMaxAndMinLength, passwordSchema } from "@/utils/ErrorSchema";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack } from "@mui/material";
import { AxiosError } from "axios";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { object, ref, string } from "yup";

type AccountInfoDialogProps = {
    open: boolean;
    onClose(): void;
    userId: number;
    username: string;
}

export default function AccountInfoDialog(props: AccountInfoDialogProps) {
    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            fullWidth
        >
            <DialogTitle>Update email</DialogTitle>
            <Divider />

            <DialogContent>
            </DialogContent>

            <Divider />
            <DialogActions>
                <Button variant="text" onClick={props.onClose}>Cancel</Button>
                <Button type="submit" form="dialog-form">Update</Button>
            </DialogActions>
        </Dialog>
    );
}

function EmailForm() {
    return (
        <Formik
            initialValues={{
                email: "",
                confirmEmail: ""
            }}
            validationSchema={object({
                email: string()
                    .required("New email is required")
                    .email("Invalid email format."),
                confirmEmail: string()
                    .required("Confrim email is required")
                    .email("Invalid email format.")
                    .equals([ref("email")], "Confirm email should equals email")
            })}
            onSubmit={(values) => {

            }}
        >
            <Form>
                <Stack spacing={2}>
                    <Field name="email" component={CreateInput} label="New email" />
                    <Field name="confirmEmail" component={CreateInput} label="Confirm new email" />
                </Stack>
            </Form>
        </Formik>
    )
}

function PasswordForm(props: { userId: number }) {
    return (
        <Formik
            initialValues={{
                currentPassword: "",
                password: "",
                confirmPassword: ""
            }}
            validationSchema={object({
                currentPassword: string()
                    .required("CurrentPassword is required.")
                    .max(255, "CurrentPassword should be less than 255 characters.")
                    .test("passwordVerif", "Current password is invalid.", (password) => {
                        return new Promise(async (resolve) => {
                            resolve((await isPasswordValid(props.userId, password)).data)
                        });
                    }),
                password: passwordSchema("New password"),
                confirm: passwordSchema("Confirm password").equals([ref("password")], "Confirm password should equals new password"),
            })}
            onSubmit={(values) => {
                // Si l'ancien password est equals on nouveau, on fait pas la requête.
            }}
        >
            <Form>
                <Stack spacing={2}>
                    <Field name="currentPassword" component={CreateInput} label="Current Password" type="password" />
                    <Field name="password" component={CreateInput} label="New password" type="password" />
                    <Field name="confirm" component={CreateInput} label="Confirm password" type="password" />
                </Stack>
            </Form>
        </Formik>
    )
}

const USERNAME_ALREADY_EXISTS = "Username already exists";

export function UsernameDialog(props: { userId: number, username: string }) {
    const [existingUsername, setExistingUsername] = useState<string[]>([]);

    return (
        <Formik
            initialValues={{
                username: ""
            }}
            validationSchema={object({
                username: notEmptyWithMaxAndMinLength(30, 2, "Username")
                    .test("currentUsername", "Username is the same as the current one.", (value) => (
                        new Promise((resolve, reject) => resolve(value != props.username)))
                    )
                    .notOneOf(existingUsername, USERNAME_ALREADY_EXISTS),
            })}
            onSubmit={async (values, formikHelpers) => {
                changeUsername(props.userId, values.username)
                    .then(res => console.log(res.status))
                    .catch((error: AxiosError) => {
                        if (error.response?.status == 409) {
                            setExistingUsername([...existingUsername, values.username]);
                            formikHelpers.setFieldError("username", USERNAME_ALREADY_EXISTS);
                        }
                    });
            }}
            validateOnChange={false}
        >
            {({ isValid }) => (
                <Dialog open={true} onClose={() => console.log("closed")} fullWidth>
                    <DialogTitle>Update username</DialogTitle>
                    <Divider />

                    <DialogContent>
                        <Form id="dialog-form">
                            <Stack spacing={2}>
                                <Field name="username" component={CreateInput} label="New username" />
                            </Stack>
                        </Form>
                    </DialogContent>

                    <Divider />
                    <DialogActions>
                        <Button variant="text">Cancel</Button>
                        <Button type="submit" form="dialog-form" disabled={!isValid}>Update</Button>
                    </DialogActions>
                </Dialog>
            )}
        </Formik>
    )
}