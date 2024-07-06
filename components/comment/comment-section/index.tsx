"use client";

import CommentView from "@components/comment/comment-view";
import { Button, List, Modal } from "@mui/material";
import { getAllComments } from "@services/CommentService";
import { createRandomKey } from "@utils/RandomKeys";
import React, { useEffect } from "react";

import CreateCommentPopup from "@components/comment/create-popup";
import { CommentViewDTO } from "@models/dto/CommentViewDTO";

const CommentSection = (params : any) => {

    let [comments, setComments] = React.useState<CommentViewDTO[]>();

    const [commentPopup, setCommentPopup] = React.useState(false);

    const handlePopup = () => setCommentPopup(!commentPopup);

    useEffect(() => {
        getAllComments(params.id).then(res => {
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
                <CreateCommentPopup postId={params.id}/>
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