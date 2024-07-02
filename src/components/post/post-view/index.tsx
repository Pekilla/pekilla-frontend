import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Avatar, Card, CardContent, CardHeader, Chip, IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PostViewDTO } from "../../../model/dto/PostViewDTO";
import { createRandomKey } from "../../../util/RandomKeys";
import { deletePost } from '../../../services/PostService';

export interface PostViewProps extends PostViewDTO {
    // To set and open the popup(CreatePopup) with the data of the PostView for an update.
    launchUpdate(postViewDto: PostViewDTO): void;
    removePostFromUi(id: number): void;
}

export interface MenuOption {
    action(): void;
    name: string;
    icon: any;
}

export default function PostView(props: PostViewProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const MENU_OPTIONS: MenuOption[] = [
        { name: "modify", action() { props.launchUpdate(props) }, icon: <EditIcon /> },
        { name: "delete", action() { deletePost(props.id!, props.removePostFromUi) }, icon: <DeleteIcon /> },
    ]

    return (
        <Card variant="outlined" sx={{ width: "800px", backgroundColor: "whitesmoke" }}>
            <CardHeader
                avatar={
                    <Avatar src="https://cdn-icons-png.freepik.com/512/149/149071.png" />
                }
                title={
                    <Stack spacing={0.4}>
                        <p><Link to={`/category/${props.category?.toLowerCase()}`}>{props.category}</Link> • {props.addedDate?.toString()}</p>
                        <Link to={`/user/${props.userLink}`}>{props.username}</Link>
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