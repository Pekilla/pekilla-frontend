"use client";

import EntityDateLabel from "@/components/shared/EntityDateLabel";
import { MenuOption, MenuOptionItem } from "@/components/shared/menu-option-item";
import { deleteComment } from "@/services/CommentService";
import { createRandomKey } from "@/utils/RandomKeys";
import { CommentViewDTO } from "@models/dto/CommentViewDTO";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Avatar, Divider, IconButton, ListItem, ListItemAvatar, ListItemText, Menu } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CommentView = (comment: CommentViewDTO) => {
    const router = useRouter();

    const isOwnerOfComment = false;

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
                    primary={
                        <EntityDateLabel
                            username={comment.username}
                            isYou={isOwnerOfComment}
                            date={comment.addedDate}
                        />
                    }
                    secondary={comment.message}
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