import { Box, Button, Modal } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from 'yup';
import { PostDTO } from "../../../model/dto/PostDTO";
import { Category } from "../../../model/enums/Category";
import { createPost, updatePost } from "../../../services/PostService";
import CategorySelector from "./components/category-selector";
import { CreateInput } from "./components/create-input";
import { Tags, TagsErrors } from "./components/tags";
import { PostViewDTO } from "../../../model/dto/PostViewDTO";


const USER_ID: number = process.env.REACT_APP_USER_ID as any;

export interface CreatePopupProps {
    isUpdate?: boolean;
    open: boolean;
    postViewDto?: PostViewDTO;
    reset(): void;

    // Function to add a new DTO to the UI list.
    updateDto(postViewDto: PostViewDTO, isCreate?: boolean): void;
}

export default function CreatePopup(props: CreatePopupProps) {
    return (
        <>
            <Modal
                open={props.open}
                onClose={props.reset}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Box sx={{ background: "white", width: 800, padding: 3, borderRadius: "10px" }}>
                    <Formik
                        initialValues={{
                            id: props.postViewDto?.id,
                            title: props.postViewDto?.title ?? "",
                            description: props.postViewDto?.description ?? "",
                            tags: props.postViewDto?.tags ?? [],
                            category: props.postViewDto?.category ?? Category.OTHER
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
                                    tags: yup
                                        .array()
                                        .min(3, TagsErrors.SIZE)
                                }
                            )
                        }
                        onSubmit={async (values) => {
                            console.log(values);

                            if (props.isUpdate) {
                                props.updateDto(
                                    (await updatePost(values as PostDTO, USER_ID))?.data!
                                );
                            }

                            else {
                                props.updateDto(
                                    (await createPost(values as PostDTO, USER_ID))?.data!,
                                    true
                                )
                            }
                            props.reset();
                        }}
                    >
                        {({ values, setFieldValue }) => (
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
                                            <Field
                                                name="category"
                                                component={CategorySelector}
                                            />
                                            <br /><br /><br />
                                        </>
                                    )
                                }

                                <Field
                                    name="tags"
                                    component={Tags}
                                    error={<ErrorMessage name="tags" />}
                                    tags={values.tags}
                                    setTags={(tags: string[]) => setFieldValue("tags", tags)}
                                />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: "180px", float: "right" }}>
                                    <Button variant="text" onClick={props.reset}>Cancel</Button>
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