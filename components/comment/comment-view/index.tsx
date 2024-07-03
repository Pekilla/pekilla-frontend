import { CommentViewDTO } from "@models/dto/CommentViewDTO";
import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

const CommentView = (comment : CommentViewDTO) => {
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
            <Divider />
        </>
    )
}
export default CommentView;