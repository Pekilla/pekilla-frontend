import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CommentDTO } from "../../model/dto/CommentDTO";
import CommentView from "../../components/comment/comment-view";
import { CommentViewDTO } from "../../model/dto/CommentViewDTO";
import { getAllComments } from "../../services/CommentService";

const CommentSection = () => {

    let [comments, setComments] = React.useState<CommentViewDTO[]>();

    useEffect(() => {
        getAllComments(1).then(res => {
            setComments(res.data ?? null);
        })
    }, []);
    
    return (
        <List>
            {
                comments?.map(comment => (
                    <CommentView 
                        {...comment}
                    />
                ))
            }
        </List>
    )
}
export default CommentSection;