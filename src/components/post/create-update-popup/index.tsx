import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { array, object, string } from 'yup';
import { PostDTO } from "../../../model/dto/PostDTO";
import { PostViewDTO } from "../../../model/dto/PostViewDTO";
import { Category } from "../../../model/enums/Category";
import { createPost, updatePost } from "../../../services/PostService";
import CategorySelector from "./components/category-selector";
import { CreateInput } from "./components/create-input";
import { Tags, TagsErrors } from "./components/tags";

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
            <Dialog
                open={props.open}
                onClose={props.reset}
                maxWidth={false}
                PaperProps={{ sx: { borderRadius: "10px" } }}
                title="Update"
            >
                <DialogTitle variant="h5" sx={{ fontWeight: "bold" }}>
                    {props.isUpdate ? "Update" : "Create"} post
                </DialogTitle>

                <DialogContent>
                    <br />

                    <Formik
                        initialValues={{
                            id: props.postViewDto?.id,
                            title: props.postViewDto?.title ?? "",
                            description: props.postViewDto?.description ?? "",
                            tags: props.postViewDto?.tags ?? [],
                            category: props.postViewDto?.category ?? Category.OTHER
                        }}
                        validationSchema={
                            object(
                                {
                                    title: string()
                                        .required("Title is required.")
                                        .max(80, "Title cannot be more than 80 characters.")
                                        .min(10, "Title cannot be less than 10 characters.")
                                    ,
                                    description: string()
                                        .required("Description is required")
                                        .max(5000, "Description cannot be more than 80 characters.")
                                        .min(10, "Description cannot be less than 10 characters.")
                                    ,
                                    tags: array()
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
                            <Form id="create-update-post">
                                <Stack spacing={3}>
                                    <Field
                                        name="title"
                                        label="Title"
                                        component={CreateInput}
                                    />

                                    <Field
                                        name="description"
                                        label="Description"
                                        component={CreateInput}
                                        isTextArea
                                    />
                                    <Field
                                        name="description"
                                        label="Description"
                                        component={CreateInput}
                                        isTextArea
                                    />

                                    {/* Hide Category if it is update */}
                                    {props.isUpdate ?
                                        (<></>) : (
                                            <Field
                                                name="category"
                                                component={CategorySelector}
                                            />
                                        )
                                    }

                                    <Field
                                        name="tags"
                                        component={Tags}
                                        error={<ErrorMessage name="tags" />}
                                        tags={values.tags}
                                        setTags={(tags: string[]) => setFieldValue("tags", tags)}
                                    />
                                </Stack>

                            </Form>
                        )}
                    </Formik>
                </DialogContent>
                <br />

                <DialogActions>
                    <Button variant="text" onClick={props.reset}>Cancel</Button>
                    <Button type="submit" variant="contained" form="create-update-post">{props.isUpdate ? "Update" : "Create"}</Button>
                </DialogActions>
            </Dialog >
        </>
    );
}