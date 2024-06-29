import { Autocomplete, Box, Button, Chip, Modal, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FormEvent, useState } from "react";
import * as yup from 'yup';
import { createPost, updatePost } from "../../services/PostService";
import CategorySelector from "./components/category-selector";
import { CreateInput } from "./components/create-input";
import { Tags } from "./components/tags";


export interface CreatePopupProps {
    isUpdate?: boolean;
    isOpen: boolean;
    setIsOpen(isOpen: boolean): void;
}

export default function CreatePopup(props: CreatePopupProps) {
    const close = () => {
        props.setIsOpen(false);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        formData.append("userId", process.env.REACT_APP_USER_ID + "");

        if (props.isUpdate) {
            updatePost(formData);
        }
        else createPost(formData);
        console.log(Object.fromEntries(formData.entries as any));

    };

    return (
        <>
            <Modal
                open={props.isOpen}
                onClose={close}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Box sx={{ background: "white", width: 800, padding: 3, borderRadius: "10px" }}>
                    <Formik
                        initialValues={{
                            title: "",
                            description: "",
                            tags: [],
                        }}
                        validationSchema={
                            yup.object(
                                {
                                    title: yup
                                        .string()
                                        .required("Title is required.")
                                        .max(80, "Title cannot be more than 80 characters.")
                                        .min(10, "Title cannot be less than 10 characters.")
                                    ,
                                    description: yup
                                        .string()
                                        .required("Description is required")
                                        .max(5000, "Description cannot be more than 80 characters.")
                                        .min(10, "Description cannot be less than 10 characters.")
                                    ,
                                    tags : yup
                                        .array()
                                        .min(3, "Need to have at least 3 tags.")
                                }
                            )
                        }
                        onSubmit={(values) => {
                            console.log(values);
                            alert(JSON.stringify(values));
                        }}
                    >
                        {({ values, setFieldValue, setFieldError, errors, touched }) => (
                            <Form>
                                <h2>{props.isUpdate ? "Update" : "Create"} post</h2>

                                <Field
                                    name="title"
                                    label="Title"
                                    component={CreateInput}
                                />
                                <br /><br /><br />

                                <Field
                                    name="description"
                                    label="Description"
                                    component={CreateInput}
                                    isTextArea
                                />
                                <br /><br /><br />

                                {/* Hide Category if it is update */}
                                {props.isUpdate ?
                                    (<></>) : (
                                        <>
                                            <CategorySelector />
                                            <br /><br /><br />
                                        </>
                                    )
                                }

                                <Field
                                    name="tags"
                                    component={Tags}
                                    error={<ErrorMessage name="tags" />}
                                    tags={values.tags}
                                    setError={(error: string) => setFieldError("tags", error)}
                                    setTags={(tags: string[]) => setFieldValue("tags", tags)}
                                />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: "180px", float: "right" }}>
                                    <Button variant="text" onClick={close}>Cancel</Button>
                                    <Button type="submit" variant="contained">{props.isUpdate ? "Update" : "Create"}</Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Modal>
        </>
    );
}