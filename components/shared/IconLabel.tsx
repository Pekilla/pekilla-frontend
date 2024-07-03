import { Stack } from "@mui/material";

export default function IconLabel(props: { label: string, icon: any }) {
    return (
        <Stack direction="row" alignItems="center">
            {props.icon}
            {props.label}
        </Stack>
    );
}