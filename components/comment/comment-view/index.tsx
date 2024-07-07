import { CommentViewDTO } from "@models/dto/CommentViewDTO";
import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import React from "react";

const CommentView = (comment : CommentViewDTO) => {
    return (
        <>
            <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar>{comment.username.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={comment.username}
                        secondary={
                            <>
                                {comment.message}
                                <br />
                                {comment.addedDate}
                            </>
                        }
                    />
            </ListItem>
            <Divider />
        </>
    )
}
export default CommentView;