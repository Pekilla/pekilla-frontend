import { Link as MuiLink } from "@mui/material";
import { orange } from "@mui/material/colors";
import Link from "next/link";

interface EntityDateLabelProps {
    // The name of the user of the category.
    username: string;

    date?: Date;

    // If the current user is the owner.
    isYou?: boolean;

    /**
     * @default false(user)
    */
    isCategory?: boolean;
}

export default function EntityDateLabel(props: EntityDateLabelProps) {
    const isYou = props.isYou && !props.isCategory;

    return (
        <p>
            <MuiLink
                color={isYou ? orange[500] : undefined}
                component={Link}
                href={`${props.isCategory ? "/categories/" : "/users/"} ${props.username}`}>
                {isYou ? "You" : props.username}
            </MuiLink> {props.date ? <>• {props.date as any}</> : <></>}
        </p>
    );
}