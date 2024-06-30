import { Avatar, Card, CardContent, CardHeader, Chip, IconButton, Menu, MenuItem, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { PostViewDTO } from "../../../model/dto/PostViewDTO";
import { useState } from "react";
import { PostDTO } from "../../../model/dto/PostDTO";
import { createRandomKey } from "../../../util/RandomKeys";

export interface PostCardViewProps extends PostViewDTO {
    update(postViewDto: PostViewDTO): void;
}

interface MenuOption {
    action(): void;
    name: string;
}

export default function PostCardView(props: PostCardViewProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

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
                            {[{name : "modify", action() { props.update(props) }} as MenuOption].map((option) => (
                                <MenuItem key={option.name} onClick={() => {setAnchorEl(null); option.action();}}>{option.name}</MenuItem>
                            ))}
                        </Menu>


                    </>
                }
            />
            <CardContent>
                <Stack spacing={4}>
                    <Stack spacing={1}>
                        <h2>{props.title}</h2>

                        <Stack direction="row" spacing={1}>
                            {props.tags.map(tag => (
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