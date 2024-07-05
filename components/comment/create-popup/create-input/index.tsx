import { usePekillaContext } from "@/app/contexts/PekillaContext";
import { CommentDTO } from "@models/dto/CommentDTO";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { createComment } from "@services/CommentService";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import { CreateInput } from "../../../post/create-update-popup/components/create-input";


const CreateCommentPopupContent = () => {
    const { userId } = usePekillaContext();

    const comment : CommentDTO = {
        message: "",
        postId: 1,
        userId
    };
    
    const fields = {
        message: string()
            .required("Message is required")
            .min(3, "Comment should be atleast 3 chars long")
            .max(1000, "1000 chars limit has been exceeded.")
    };

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