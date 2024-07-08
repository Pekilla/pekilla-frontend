"use client";

import { CommentViewDTO } from "@models/dto/CommentViewDTO";
import { Avatar, Divider, IconButton, ListItem, ListItemAvatar, ListItemText, Menu } from "@mui/material";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteComment } from "@/services/CommentService";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useRouter } from "next/navigation";
import { MenuOption, MenuOptionItem } from "@/components/shared/menu-option-item";
import { createRandomKey } from "@/utils/RandomKeys";

const CommentView = (comment: CommentViewDTO) => {
    const router = useRouter();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const options: MenuOption[] = [
        { icon: <DeleteIcon />, name: "delete", action() { deleteComment(comment.id) } },
        { icon: <EditIcon />, name: "edit", action() { console.log("NOT IMPLEMENTED") } }
    ];

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

                {/* Comment options */}
                <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                    <MoreHorizIcon />
                </IconButton>

                <Menu
                    open={open}
                    anchorEl={anchorEl}
                    variant="menu"
                    onClose={() => setAnchorEl(null)}>
                    {
                        options.map((option) => (
                            <MenuOptionItem
                                key={createRandomKey()}
                                {...option} 
                                basicAction={router.refresh} />
                        ))
                    }
                </Menu>

            </ListItem>
            <Divider />
        </>
    )
}
export default CommentView;