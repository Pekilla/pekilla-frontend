import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CommentDTO } from "../../model/dto/CommentDTO";
import CommentView from "../../components/comment/comment-view";
import { getAllComments } from "../../services/CommentService";

const CommentSection = () => {

    let [comments, setComments] = React.useState<CommentDTO[]>();

    useEffect(() => {
        getAllComments(1).then(res => {
            setComments(res.data);
        })
    }, []);
    
    return (
        <List>
            {
                comments?.map(comment => ( 
                    <CommentView {...comment}/>
                ))
            }
        </List>
    )
}
export default CommentSection;