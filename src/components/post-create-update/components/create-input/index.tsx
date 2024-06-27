import { TextField } from "@mui/material";
import { HTMLInputTypeAttribute } from "react";

export function CreateInput(props: { label: string, isTextArea?: boolean, type?: HTMLInputTypeAttribute  }) {
    return (
        <TextField
            label={props.label}
            multiline={props.isTextArea}
            rows={props.isTextArea ? 10 : undefined}
            type={props.type ?? "text"}
            variant={"filled"}
            sx={{ width: props.isTextArea ? "100%" : "350px" }}
            name={props.label.toLowerCase()}
        />
    )
}