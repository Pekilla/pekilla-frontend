import { Box, Button, List, Modal, Typography } from "@mui/material";
import React, { useEffect } from "react";
import CommentView from "../../components/comment/comment-view";
import { getAllComments } from "../../services/CommentService";
import { createRandomKey } from "../../util/RandomKeys";

import CreateCommentPopup from "../../components/comment/create-popup";
import { CommentViewDTO } from "../../model/dto/CommentViewDTO";

const CommentSection = () => {

    let [comments, setComments] = React.useState<CommentViewDTO[]>();

    const [commentPopup, setCommentPopup] = React.useState(false);

    const handlePopup = () => setCommentPopup(!commentPopup);

    useEffect(() => {
        getAllComments(1).then(res => {
            setComments(res.data);
        });
    }, []);
    
    return (
        <>
            <Button variant="contained"
                onClick={handlePopup}>create</Button>
            <Modal
                open={commentPopup}
                onClose={handlePopup}>
                <CreateCommentPopup/>
            </Modal>
        
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