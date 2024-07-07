import { CommentViewDTO } from "@models/dto/CommentViewDTO";
import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";

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
                                <Typography>
                                    {comment.message}
                                </Typography>
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