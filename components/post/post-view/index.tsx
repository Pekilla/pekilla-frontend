"use client";

import EntityDateLabel from '@/components/shared/EntityDateLabel';
import { MenuOption, MenuOptionItem } from '@/components/shared/menu-option-item';
import { usePekillaContext } from '@components/PekillaContext';
import { PostViewDTO } from "@models/dto/PostViewDTO";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FlagIcon from '@mui/icons-material/Flag';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Avatar, Card, CardContent, CardHeader, Chip, IconButton, Menu, Link as MuiLink, Stack, Typography } from "@mui/material";
import { deletePost } from '@services/PostService';
import { createRandomKey } from "@utils/RandomKeys";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from "react";


export interface PostViewProps extends PostViewDTO {
    // To set and open the popup(CreatePopup) with the data of the PostView for an update.
    launchUpdate?(postViewDto: PostViewDTO): void;
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
        <Card>
            <CardHeader
                avatar={
                    <Avatar>{props.username.charAt(0)}</Avatar>
                }
                title={
                    <Stack spacing={0.4}>
                        <EntityDateLabel
                            username={props.category}
                            date={props.addedDate}
                            isCategory
                        />

                        <EntityDateLabel
                            username={props.username}
                            isYou={isOwnerOfPost}
                        />
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

                            {MENU_OPTIONS.filter(e => e != undefined).map((option) => (
                                <MenuOptionItem
                                    key={createRandomKey()}
                                    {...option}
                                    basicAction={() => setAnchorEl(null)} />
                            ))}
                        </Menu>
                    </>
                }
            />

            <CardContent>
                <Stack spacing={4}>
                    <Stack spacing={1}>
                        <MuiLink component={Link} href={`/posts/${props.id}`} underline='none'>
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