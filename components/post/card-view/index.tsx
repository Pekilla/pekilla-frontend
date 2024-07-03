"use client"

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Avatar, Card, CardContent, CardHeader, Chip, IconButton, Menu, MenuItem, Stack, Typography, Icon } from "@mui/material";
import { useState } from "react";
import { PostViewDTO } from "@models/dto/PostViewDTO";
import { createRandomKey } from "@utils/RandomKeys";

import React from 'react';
import Link from 'next/link';

export interface PostCardViewProps extends PostViewDTO {
    update?(postViewDto: PostViewDTO): void;
}

export interface MenuOption {
    action(): void;
    name: string;
    icon: any;
}

export function IconHandler(props: { icon: any }) {
    return (
        <>
            {props.icon}
        </>
    );
}

export default function PostCardView(props: PostCardViewProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const MENU_OPTIONS: MenuOption[] = [
        { name: "modify", action() { props.update?.(props) }, icon: <EditIcon /> },
        { name: "delete", action() { console.log("DELETE") }, icon: <DeleteIcon /> },
    ]

    return (
        <Card variant="outlined" sx={{ width: "800px", backgroundColor: "whitesmoke" }}>
            <CardHeader
                avatar={
                    <Avatar src="https://cdn-icons-png.freepik.com/512/149/149071.png" />
                }
                title={
                    <Stack spacing={0.4}>
                        <p><Link href={`/category/${props.category?.toLowerCase()}`}>{props.category}</Link> • {props.addedDate?.toString()}</p>
                        <Link href={`/user/${props.userLink}`}>{props.username}</Link>
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
                                    <MenuItem key={option.name} onClick={() => { setAnchorEl(null); option.action(); }}>
                                        <Stack direction={"row"} spacing={1}>
                                            {option.icon}
                                            <Typography variant="inherit">{option.name}</Typography>
                                        </Stack>
                                    </MenuItem>
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