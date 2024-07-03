import { TextField } from "@mui/material";
import { ErrorMessage, FieldProps } from "formik";
import { HTMLInputTypeAttribute } from "react";
import { MUI_INPUT_VARIANT } from "@utils/utils";

// The FieldProps will be given by field Component.
interface CreateInputProps extends FieldProps {
    label: string;
    isTextArea?: boolean;
    type?: HTMLInputTypeAttribute;
    required?: boolean;
}

export function CreateInput(props: CreateInputProps) {
    const { name } = props.field;
    const { errors, touched } = props.form;

    return (
        <TextField
            required={props.required}
            label={props.label}
            error={!!errors[name] && touched[name] as boolean}
            multiline={props.isTextArea}
            rows={props.isTextArea ? 10 : undefined}
            type={props.type ?? "text"}
            variant={MUI_INPUT_VARIANT}
            helperText={<ErrorMessage name={name} />}
            {...props.field}
            sx={{ width: props.isTextArea ? "800px" : "350px" }}
        />
    )
}