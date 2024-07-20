import { usePekillaContext } from "@components/PekillaContext";
import CategorySelector from "@components/shared/selector/CategorySelector";
import { PostDTO } from "@models/dto/PostDTO";
import { PostViewDTO } from "@models/dto/PostViewDTO";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import Divider from '@mui/material/Divider';
import { equals } from "@utils/utils";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { array, object, string } from 'yup';
import { createPost, updatePost } from "../../../services/PostService";
import CreateInput from "./components/create-input";
import { Tags } from "./components/tags";

export interface CreatePopupProps {
    open: boolean;
    postViewDto?: PostViewDTO;
    reset(): void;
}

export default function CreatePopup(props: CreatePopupProps) {
    const { userId } = usePekillaContext();
    const router = useRouter();
    const isUpdate = props.postViewDto != undefined;

    const initialValues = {
        id: props.postViewDto?.id,
        title: props.postViewDto?.title ?? "",
        description: props.postViewDto?.description ?? "",
        tags: props.postViewDto?.tags ?? [],
        category: props.postViewDto?.category ?? ""
    };

    return (
        <>
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
                                .required("Description is required.")
                                .max(5000, "Description cannot be more than 80 characters.")
                                .min(10, "Description cannot be less than 10 characters.")
                            ,
                            category: string()
                                .required("Category is required."),
                            tags: array()
                                .min(3, "Tags cannot be less than 3.")
                        }
                    )
                }
                onSubmit={async (values) => {
                    // Add userId
                    (values as any)["userId"] = userId;

                    // Create
                    if (!isUpdate) {
                        await createPost(values as PostDTO);
                        router.refresh();
                    }

                    // Update
                    else if (!equals(initialValues, values)) {
                        await updatePost(values as PostDTO);
                        router.refresh();
                    }

                    props.reset();
                }}
            >
                {({ isValid }) => (

                    <Dialog
                        open={props.open}
                        onClose={props.reset}
                        maxWidth={false}
                        fullScreen
                        title="Update"
                    >
                        <DialogTitle variant="h5" sx={{ fontWeight: "bold" }}>
                            {isUpdate ? "Update" : "Create"} post
                        </DialogTitle>
                        <Divider />

                        <DialogContent>
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
                                    {isUpdate ?
                                        (<></>) : (
                                            <Field
                                                name="category"
                                                component={CategorySelector}
                                            />
                                        )
                                    }

                                    <Field name="tags" component={Tags} />
                                </Stack>
                            </Form>
                        </DialogContent>

                        <Divider />
                        <DialogActions>
                            <Button variant="text" onClick={props.reset}>Cancel</Button>
                            <Button disabled={!isValid} type="submit" form="create-update-post">{isUpdate ? "Update" : "Create"}</Button>
                        </DialogActions>
                    </Dialog>
                )}
            </Formik>
        </>
    );
}