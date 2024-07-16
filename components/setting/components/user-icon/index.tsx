"use client";

import { SingleImageInput, SingleImageInputProps } from "@/components/shared/single-image-input";
import { TableCell, TableRow, Typography } from "@mui/material";
import SettingLabel from "../setting-label";

/**
 * Component to change the image of a user for the banner or the icon in the setting page.
 */
export default function UserIcon(props: SingleImageInputProps & { isBanner?: boolean }) {
    return (
        <TableRow>
            <TableCell>
                <SettingLabel label={props.isBanner ? "Banner icon" : "Profile icon"} />
                <Typography variant="body2">{props.isBanner ? "Your profile banner." : "An icon that everyone can see."}</Typography>
            </TableCell>

            <TableCell />

            <TableCell align="right">
                <SingleImageInput {...props} />
            </TableCell>
        </TableRow>
    );
}