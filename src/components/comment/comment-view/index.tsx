import { Avatar, Button, Divider, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import React from "react";
import { CommentDTO } from "../../../model/dto/CommentDTO";

const CommentView = (comment : CommentDTO) => {
    return (
        <>
            <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar 
                            alt="UserProfilePicture" 
                            src="https://cdn-icons-png.freepik.com/512/149/149071.png" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={comment.username}
                        secondary={
                            <>
                                {comment.message}
                            </>
                        }
                    />
            </ListItem>
            <Divider/>
        </>
    )
}
export default CommentView;