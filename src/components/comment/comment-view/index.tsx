import { Avatar, Button, Divider, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import React from "react";
import { CommentDTO } from "../../../model/dto/CommentDTO";
import { CommentViewDTO } from "../../../model/dto/CommentViewDTO";

const CommentView = (comment:CommentViewDTO) => {
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
                            <React.Fragment>
                                {comment.message}
                            </React.Fragment>
                        }
                    />
            </ListItem>
            <Divider/>
        </>
    )
}
export default CommentView;