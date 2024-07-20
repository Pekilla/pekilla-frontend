import TextField from "@mui/material/TextField";
import { ErrorMessage, FieldProps } from "formik";
import { HTMLInputTypeAttribute } from "react";

// The FieldProps will be given by field Component.
interface CreateInputProps extends FieldProps {
    label: string;
    isTextArea?: boolean;
    required?: boolean;
    type?: HTMLInputTypeAttribute;
}

export default function CreateInput(props: CreateInputProps) {
    const { name } = props.field;
    const { errors, touched } = props.form;

    return (
        <TextField
            {...props.field}
            required={props.required}
            type={props.type}
            label={props.label}
            error={!!errors[name] && touched[name] as boolean}
            multiline={props.isTextArea}
            rows={props.isTextArea ? 5 : undefined}
            helperText={<ErrorMessage name={name} />}
        />
    )
}