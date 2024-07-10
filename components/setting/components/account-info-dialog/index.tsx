"use client";

import { CreateInput } from "@/components/post/create-update-popup/components/create-input";
import { passwordSchema } from "@/utils/ErrorSchema";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { object, ref, string } from "yup";

type AccountInfoDialogProps = {
    open: boolean;
    onClose(): void;
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
                <PasswordForm />
            </DialogContent>

            <Divider />
            <DialogActions>
                <Button variant="text" onClick={props.onClose}>Cancel</Button>
                <Button>Update</Button>
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

function PasswordForm() {
    const originalPassword = "12345";

    return (
        <Formik
            initialValues={{
                currentPassword: "",
                password : "",
                confirmPassword: ""
            }}
            validationSchema={object({
                currentPassword: string()
                    .required("CurrentPassword is required.")
                    .max(255, "CurrentPassword should be less than 255 characters.")
                    .equals([originalPassword], "CurrentPassword is invalid."),
                password: passwordSchema("New password"),
                confirm: passwordSchema("Confirm password").equals([ref("password")], "Confirm password should equals new password"),
            })}
            onSubmit={(values) => {

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