import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import Divider from '@mui/material/Divider';
import { ErrorMessage, Field, Form, Formik } from "formik";
import { array, object, string } from 'yup';
import { PostDTO } from "@models/dto/PostDTO";
import { PostViewDTO } from "@models/dto/PostViewDTO";
import { Category } from "@models/enums/Category";
import { createPost, updatePost } from "../../../services/PostService";
import { equals } from "@utils/utils";
import CategorySelector from "./components/category-selector";
import { CreateInput } from "./components/create-input";
import { Tags, TagsErrors } from "./components/tags";
import config from "@/config.json";

const USER_ID: number = config.id;

export interface CreatePopupProps {
    isUpdate?: boolean;
    open: boolean;
    postViewDto?: PostViewDTO;
    reset(): void;

    // Function to add a new DTO to the UI list.
    updateDto(postViewDto: PostViewDTO, isCreate?: boolean): void;
}


export default function CreatePopup(props: CreatePopupProps) {
    const initialValues = {
        id: props.postViewDto?.id,
        title: props.postViewDto?.title ?? "",
        description: props.postViewDto?.description ?? "",
        tags: props.postViewDto?.tags ?? [],
        category: props.postViewDto?.category ?? Category.OTHER
    };

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
                <Divider />

                <DialogContent>
                    <Formik
                        initialValues={initialValues}
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
                            // Create
                            if (!props.isUpdate) {
                                props.updateDto(
                                    (await createPost(values as PostDTO, USER_ID))?.data!,
                                    true
                                )
                            }

                            // Update
                            else if (!equals(initialValues, values)) {
                                props.updateDto(
                                    (await updatePost(values as PostDTO, USER_ID))?.data!
                                );
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

                <Divider />
                <DialogActions>
                    <Button variant="text" onClick={props.reset}>Cancel</Button>
                    <Button type="submit" variant="contained" form="create-update-post">{props.isUpdate ? "Update" : "Create"}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}