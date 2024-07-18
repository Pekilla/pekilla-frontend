'use client';

import { Button, Typography } from "@mui/material";
import { useState } from "react";
import AddReactionRoundedIcon from '@mui/icons-material/AddReactionRounded';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function FollowButton() {
    
    const [isFollowed, setIsFollowed] = useState(false);

    const handleClick = () => {
        setIsFollowed(!isFollowed);
        // do something to add connected user as follower of targeted user
    }

    return (
        <Button 
            onClick={handleClick}
            endIcon={(!isFollowed) ? <PersonAddIcon/>  : <PersonRemoveIcon/>}
            >
            {
                (!isFollowed) ? <Typography>Follow</Typography> : <Typography>Unfollow</Typography>
            }
        </Button>
    )
}