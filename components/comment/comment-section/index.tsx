"use client";

import { usePekillaContext } from "@/components/PekillaContext";
import { CreateInput } from "@/components/post/create-update-popup/components/create-input";
import { CommentDTO } from "@/models/dto/CommentDTO";
import { Button, Stack, Typography } from "@mui/material";
import { createComment } from "@services/CommentService";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { object, string } from "yup";

const CommentTextArea = (props: {postId: number}) => {
    const { userId } = usePekillaContext();
    const router = useRouter();

    const comment: CommentDTO = {
        message: "",
        postId: props.postId,
        userId
    };

    return (
        <Stack my={2}>
            <Typography my={1}>Leave a comment</Typography>

            <Formik
                onSubmit={(values) => {
                    createComment(values);
                    values.message = "";
                    router.refresh();
                }}
                initialValues={comment}
                validationSchema={object({
                    message: string()
                        .min(3, "Comment should be atleast 3 chars long")
                        .max(1000, "1000 chars limit has been exceeded.")
                })}>
                <Form>
                    <Stack>
                        <Field
                            name="message"
                            isTextArea="true"
                            component={CreateInput}
                        />
                        <Button
                            type="submit"
                            variant="contained">
                            Publish
                        </Button>
                    </Stack>
                </Form>
            </Formik>
        </Stack>
    )
};

export default CommentTextArea;