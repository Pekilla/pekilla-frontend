import { Avatar, Card, CardContent, CardHeader, Chip, IconButton, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { PostViewDTO } from "../../../model/dto/PostViewDTO";

export default function PostCardView(props: PostViewDTO) {
    return (
        <Card variant="outlined" sx={{ width: "800px", backgroundColor : "whitesmoke" }}>
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
                    <IconButton>
                        <MoreHorizIcon />
                    </IconButton>
                }
            />
            <CardContent>
                <Stack spacing={2} useFlexGap>
                    <Stack spacing={1}>
                        <h2>{props.title}</h2>

                        <Stack direction="row" spacing={1}>
                            {props.tags.map(tag => (
                                <Chip label={tag} />
                            ))}
                        </Stack>
                    </Stack>

                    <p>
                        {props.description}
                    </p>
                </Stack>
            </CardContent>
        </Card>
    );
}