"use client";

import { usePekillaContext } from '@/app/contexts/PekillaContext';
import { PostViewDTO } from "@models/dto/PostViewDTO";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FlagIcon from '@mui/icons-material/Flag';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Avatar, Card, CardContent, CardHeader, Chip, IconButton, Menu, MenuItem, Link as MuiLink, Stack, Typography } from "@mui/material";
import { orange } from '@mui/material/colors';
import { deletePost } from '@services/PostService';
import { createRandomKey } from "@utils/RandomKeys";
import Link from 'next/link';
import { useState } from "react";

export interface PostViewProps extends PostViewDTO {
    // To set and open the popup(CreatePopup) with the data of the PostView for an update.
    launchUpdate?(postViewDto: PostViewDTO): void;
    removePostFromUi?(id: number): void;
}

export interface MenuOption {
    action(): void;
    name: string;
    icon: any;
}

export default function PostView(props: PostViewProps) {
    const { userId } = usePekillaContext();
    
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const isOwnerOfPost = props.userId == userId;
    
    const MENU_OPTIONS: Array<MenuOption | undefined> = [
        isOwnerOfPost ? { name: "modify", action() { props.launchUpdate?.(props) }, icon: <EditIcon /> } : undefined,
        isOwnerOfPost ? { name: "delete", action() { deletePost(props.id!, props.removePostFromUi) }, icon: <DeleteIcon /> } : undefined,
        isOwnerOfPost ? undefined : { name: "report", action() { alert("Feature not implemented yet!") }, icon: <FlagIcon /> }
    ]
    
    return (
        <Card variant="outlined" sx={{ width: "800px" }}>
            <CardHeader
                avatar={
                    <Avatar src="https://cdn-icons-png.freepik.com/512/149/149071.png" />
                }
                title={
                    <Stack spacing={0.4}>
                        <p><MuiLink component={Link} href={`/category/${props.category?.toLowerCase()}`}>{props.category}</MuiLink> • {props.addedDate?.toString()}</p>
                        <MuiLink color={isOwnerOfPost ? orange[400] : undefined} component={Link} style={{}} href={`/user/${props.userLink}`}>{isOwnerOfPost ? "You" : props.username}</MuiLink>
                    </Stack>
                }
                action={
                    <>
                        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                            <MoreHorizIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={() => setAnchorEl(null)}
                            variant="menu"
                        >
                            {MENU_OPTIONS.map((option) => {
                                return (
                                    option ? (
                                        <MenuItem key={option.name} onClick={() => { setAnchorEl(null); option.action(); }}>
                                            <Stack direction={"row"} spacing={1}>
                                                {option.icon}
                                                <Typography variant="inherit">{option.name}</Typography>
                                            </Stack>
                                        </MenuItem>
                                    ) : null
                                )
                            })}
                        </Menu>
                    </>
                }
            />

            <CardContent>
                <Stack spacing={4}>
                    <Stack spacing={1}>
                        <h2>{props.title}</h2>

                        <Stack direction="row" spacing={1}>
                            {props.tags?.map(tag => (
                                <Chip key={createRandomKey()} label={tag} />
                            ))}
                        </Stack>
                    </Stack>

                    <p>{props.description}</p>
                </Stack>
            </CardContent>
        </Card>
    );
}