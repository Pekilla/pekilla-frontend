import React from "react";

import { Button, Divider, Fab, Stack, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { CommentDTO } from "../../../../model/dto/CommentDTO";
import { createComment } from "../../../../services/CommentService";
import { object, string } from "yup";
import { CreateInput } from "../../../post/create-update-popup/components/create-input";

const USER_ID: number = process.env.REACT_APP_USER_ID as any

const CreateCommentPopupContent = () => {

    const comment : CommentDTO = {
        message: "",
        postId: 1,
        userId: USER_ID
    }
    
    const fields = {
        message: string()
            .required("Message is required")
            .min(3, "Comment should be atleast 3 chars long")
            .max(1000, "1000 chars limit has been exceeded.")
    }

    return (
        <>
            <Typography variant="h5">Add a comment</Typography>
            <Divider sx={{padding: "5px"}}/>
            <Formik
                onSubmit={(values) => createComment(values)}
                initialValues={comment}
                validationSchema={object(fields)}>
                <Form> 
                    <Stack>
                        {/* 
                            Actually using the CreatePost input component but 
                            should prolly use a textarea instead.
                        */}
                        <Field
                            name="message"
                            label="message"
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
        </>
    )
}
export default CreateCommentPopupContent;