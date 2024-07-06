import { CommentViewDTO } from "@models/dto/CommentViewDTO";
import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

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
                            </>
                        }
                    />
            </ListItem>
            <Divider />
        </>
    )
}
export default CommentView;