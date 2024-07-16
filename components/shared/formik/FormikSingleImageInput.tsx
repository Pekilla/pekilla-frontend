"use client";

import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import { Avatar, Button, Stack } from "@mui/material";
import { FieldProps } from "formik";
import { useEffect, useState } from "react";
import { SingleImageProps } from "../single-image-input";

export const BANNER_SIZE = { width: 550, height: 150, borderRadius: 2 };
export const AVATAR_SIZE = { width: 150, height: 150, borderRadius: 2 };

/**
 * A component that handle the upload of a single file when using Formik.
 */
export function FormikSingleImageInput(props: SingleImageProps & FieldProps) {
    const [objectUrl, setObjectUrl] = useState<string | undefined>();

    useEffect(() => {
        // To revoke the URL when the component is destroyed.
        return () => {
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        }
    }, []);

    const addImage = (file?: File | null) => {
        if (file) {
            if(objectUrl) URL.revokeObjectURL(objectUrl);
            setObjectUrl(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        props.form.setFieldValue(props.field.name, undefined);

        if (objectUrl) {
            URL.revokeObjectURL(objectUrl);
            setObjectUrl(undefined);
        }
    };

    const imageSrc: string | undefined = objectUrl ?? props.field.value;

    return (
        <Stack spacing={2}>
            <Avatar sx={props.avatarSize} src={imageSrc}>{imageSrc ? null : props.avatarText}</Avatar>

            <Stack direction="row" spacing={1}>
                <Button component="label" startIcon={<UploadIcon />}>
                    Upload

                    <input
                        name={props.field.name}
                        onBlur={props.field.onBlur}
                        onChange={(e) => {
                            addImage(e.currentTarget.files?.item(0));
                            props.field.onChange(e);
                        }}
                        type="file"
                        accept="image/png"
                        hidden
                    />
                </Button>

                <Button color="error" disabled={props.field.value == undefined} startIcon={<DeleteIcon />} onClick={removeImage}>Delete</Button>
            </Stack>
        </Stack>
    );
}