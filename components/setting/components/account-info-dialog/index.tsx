"use client";

import { CreateInput } from "@/components/post/create-update-popup/components/create-input";
import { changeEmail, changePassword, changeUsername, isPasswordValid } from "@/services/UserService";
import { notEmptyWithMaxAndMinLength, passwordSchema } from "@/utils/ErrorSchema";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack } from "@mui/material";
import { AxiosError } from "axios";
import { Field, Form, Formik, FormikHelpers, FormikValues } from "formik";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { object, ObjectSchema, ref, string } from "yup";

type DialogProps = {
    onClose(): void;
    open: boolean;
}

type AccountInfoDialogProps = {
    label: string;
    onSubmit(values: any, formikHelpers: FormikHelpers<FormikValues>): void | Promise<any>;
    initialValues: any;
    validationSchema: ObjectSchema<any, any>;
    children: ReactNode;
} & DialogProps;

export function AccountInfoDialog(props: AccountInfoDialogProps) {
    return (
        <Formik
            initialValues={props.initialValues}
            validationSchema={props.validationSchema}
            onSubmit={props.onSubmit}
        >
            {({ isValid, isSubmitting }) => (
                <Dialog open={props.open} onClose={props.onClose} fullWidth>
                    <DialogTitle>Update {props.label}</DialogTitle>
                    <Divider />

                    <DialogContent>
                        <Form id="dialog-form">
                            <Stack spacing={2}>
                                {props.children}
                            </Stack>
                        </Form>
                    </DialogContent>

                    <Divider />
                    <DialogActions>
                        <Button variant="text" onClick={props.onClose}>Cancel</Button>
                        <Button type="submit" form="dialog-form" disabled={!isValid || isSubmitting}>Update</Button>
                    </DialogActions>
                </Dialog>
            )}
        </Formik>
    );
}

export function EmailDialog(props: { userId: number, email: string } & DialogProps) {
    const router = useRouter();

    return (
        <AccountInfoDialog
            {...props}
            label="Email"
            initialValues={{ email: "", confirmEmail: "" }}
            validationSchema={object({
                email: string()
                    .required("New email is required")
                    .email("Invalid email format."),
                confirmEmail: string()
                    .required("Confrim email is required")
                    .email("Invalid email format.")
                    .equals([ref("email")], "Confirm email should equals email")
            })}
            onSubmit={async (values) => {
                if (props.email != values.email) {
                    await changeEmail(props.userId, values.email);
                }

                props.onClose();
                router.refresh();
            }}
        >
            <Field name="email" component={CreateInput} label="New email" />
            <Field name="confirmEmail" component={CreateInput} label="Confirm new email" />
        </AccountInfoDialog>
    )
}

export function PasswordDialog(props: { userId: number } & DialogProps) {
    const router = useRouter();

    return (
        <AccountInfoDialog
            {...props}
            label="Password"
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
            onSubmit={async (values) => {
                // Si l'ancien password est equals au nouveau, on fait pas la requête.
                await changePassword(props.userId, values.password);

                props.onClose();
                router.refresh();
            }}
        >
            <Field name="currentPassword" component={CreateInput} label="Current Password" type="password" />
            <Field name="password" component={CreateInput} label="New password" type="password" />
            <Field name="confirm" component={CreateInput} label="Confirm password" type="password" />
        </AccountInfoDialog>
    )
}

const USERNAME_ALREADY_EXISTS = "Username already exists";

export function UsernameDialog(props: { userId: number, username: string } & DialogProps) {
    const [existingUsername, setExistingUsername] = useState<string[]>([]);
    const router = useRouter();

    return (
        <AccountInfoDialog
            {...props}
            label="Username"
            initialValues={{ username: "" }}
            validationSchema={object({
                username: notEmptyWithMaxAndMinLength(30, 2, "Username")
                    .test("currentUsername", "Username is the same as the current one.", (value) => (
                        new Promise((resolve, reject) => resolve(value != props.username)))
                    )
                    .notOneOf(existingUsername, USERNAME_ALREADY_EXISTS),
            })}
            onSubmit={async (values, formikHelpers) => {
                if (props.username != values.username) {
                    await changeUsername(props.userId, values.username)
                        .then(() => {
                            props.onClose();
                            router.refresh();
                        })
                        .catch((error: AxiosError) => {
                            if (error.response?.status == 409) {
                                setExistingUsername([...existingUsername, values.username]);
                                formikHelpers.setFieldError("username", USERNAME_ALREADY_EXISTS);
                            }
                        });
                } else {
                    router.refresh();
                    props.onClose();
                }
            }}
        >
            <Field name="username" component={CreateInput} label="New username" />
        </AccountInfoDialog>
    )
}

export type SettingDialog = "EMAIL" | "USERNAME" | "PASSWORD";

export function CurrentSettingDialog(props: { onClose(): void, userId: number, username: string, email: string, currentDialog?: SettingDialog }) {
    return (
        <>
            {props.currentDialog ?
                (
                    props.currentDialog == "USERNAME" ?
                        (
                            <UsernameDialog open={true} {...props} />
                        ) : (
                            props.currentDialog == "EMAIL" ?
                                (
                                    <EmailDialog open={true} {...props} />
                                ) : (
                                    <PasswordDialog open={true} {...props} />
                                )
                        )
                ) : (
                    <></>
                )
            }
        </>
    );
}