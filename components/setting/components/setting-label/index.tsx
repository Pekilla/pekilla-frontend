import { Typography } from "@mui/material";

/**
 * Label for username, profile icon, email, etc.
 */
export function SettingLabel(props: { label: string }) {
    return (
        <Typography variant="subtitle1">{props.label}</Typography>
    );
}