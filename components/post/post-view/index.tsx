"use client";


import { usePekillaContext } from '@components/PekillaContext';
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
import { useRouter } from 'next/navigation';
import { useState } from "react";

export interface PostViewProps extends PostViewDTO {
    // To set and open the popup(CreatePopup) with the data of the PostView for an update.
    launchUpdate?(postViewDto: PostViewDTO): void;
}

/**
 * Interface for the options of the menu that the user see when he click the three dots.
 */
export interface MenuOption {
    action(): void;
    name: string;
    icon: any;
}

export function MenuOptionItem(props: { icon: any, name: string, onClick: any }) {
    return (
        <MenuItem key={props.name} onClick={props.onClick}>
            <Stack direction={"row"} spacing={1}>
                {props.icon}
                <Typography variant="inherit">{props.name}</Typography>
            </Stack>
        </MenuItem>
    );
}

export default function PostView(props: PostViewProps) {
    const { userId } = usePekillaContext();
    const router = useRouter();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const isOwnerOfPost = props.userId == userId;

    const MENU_OPTIONS: Array<MenuOption | undefined> = [
        isOwnerOfPost ? { name: "modify", action() { props.launchUpdate?.(props) }, icon: <EditIcon /> } : undefined,
        isOwnerOfPost ? { name: "delete", action() { deletePost(props.id!).then(() => router.refresh()) }, icon: <DeleteIcon /> } : undefined,
        isOwnerOfPost ? undefined : { name: "report", action() { alert("Feature not implemented yet!") }, icon: <FlagIcon /> }
    ]

    return (
        <Card variant="outlined">
            <CardHeader
                avatar={
                    <Avatar>{props.username.charAt(0)}</Avatar>
                }
                title={
                    <Stack spacing={0.4}>
                        <p><MuiLink component={Link} href={`/category/${props.category?.toLowerCase()}`}>{props.category}</MuiLink> • {props.addedDate as any}</p>
                        <MuiLink color={isOwnerOfPost ? orange[400] : undefined} component={Link} style={{}} href={`/users/${props.username}`}>{isOwnerOfPost ? "You" : props.username}</MuiLink>
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
                            variant="menu">

                            {MENU_OPTIONS.map((option) => (
                                option ? (
                                    <MenuOptionItem {...option} onClick={() => { setAnchorEl(null); option.action(); }} />
                                ) : null
                            ))}
                        </Menu>
                    </>
                }
            />

            <CardContent>
                <Stack spacing={4}>
                    <Stack spacing={1}>
                        <MuiLink href={`/posts/${props.id}`} underline='none'>
                            <Typography fontSize={30} fontWeight={700}>
                                {props.title}
                            </Typography>
                        </MuiLink>

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