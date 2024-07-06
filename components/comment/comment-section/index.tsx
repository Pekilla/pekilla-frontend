"use client";

import CommentView from "@components/comment/comment-view";
import { Button, List, Modal, Stack, TextField, Typography } from "@mui/material";
import { createComment, getAllComments } from "@services/CommentService";
import { createRandomKey } from "@utils/RandomKeys";
import React, { useEffect } from "react";

import { CommentViewDTO } from "@models/dto/CommentViewDTO";

import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import { CommentDTO } from "@/models/dto/CommentDTO";
import { CreateInput } from "@/components/post/create-update-popup/components/create-input";
import { usePekillaContext } from "@/components/PekillaContext";

const CommentSection = (params : any) => {

    const { userId } = usePekillaContext();

    let [comments, setComments] = React.useState<CommentViewDTO[]>();
    

    const comment : CommentDTO = {
        message: "",
        postId: params.postId,
        userId 
    };
    
    useEffect(() => {
        getAllComments(params.postId).then(res => {
            setComments(res.data);
        });
    }, []);

    
    return (
        <>
            <Stack my={2}>
                <Typography my={1}>Leave a comment</Typography>

                <Formik
                    onSubmit={(values) => {
                        createComment(values);
                        values.message = "";
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

            
            <List>
                {
                    comments?.map(comment => (
                        <CommentView
                            key={createRandomKey()} 
                            {...comment}
                        />
                    ))
                }
            </List>
        </>
    )
}
export default CommentSection;