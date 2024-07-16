"use client";

import { Theme } from "@emotion/react";
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import { Avatar, Button, Stack, SxProps } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const BANNER_SIZE = { width: 550, height: 150, borderRadius: 2 };
export const AVATAR_SIZE = { width: 150, height: 150, borderRadius: 2 };

export interface SingleImageInputProps {
    // The id of the entity you are trying to update.
    id: number;

    // The path of the stored image.
    path?: string;

    // Function that will handle the update and the delete of the image.
    saveQuery(userId: number, isDelete?: boolean, file?: File): void;

    /**
     * The text inside of the avatar that will be shown to the user when `path` is undefined.
     */
    avatarText?: string;

    // The style of the avatar component that display the image
    avatarSize: SxProps<Theme>;
}

/**
 * A component that handle the upload of a single file.
 * This component can delete and update the image in the backend using the
 * `saveQuery` function in the props.
 */
export function SingleImageInput(props: SingleImageInputProps) {
    const router = useRouter();
    const [image, setImage] = useState<{ file?: File | null, path?: string }>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isLoading) setIsLoading(false);
    }, [props.path])

    useEffect(() => {
        // To revoke the URL when the component is destroyed.
        return () => {
            if (image?.path) URL.revokeObjectURL(image.path);
        }
    }, []);

    const addImage = (file?: File | null) => {
        if (file) {
            setImage({ file, path: URL.createObjectURL(file) });
        }
    };

    const removeImage = () => {
        if (image?.path) URL.revokeObjectURL(image.path);
        setImage({});
    };

    const deleteImageBackend = async () => {
        if (confirm("Are you sure to delete your icon.")) {
            props.saveQuery(props.id, true);
            router.refresh();
        }
    };

    const saveImageBackend = async () => {
        props.saveQuery(props.id, false, image?.file!);
        router.refresh();
        setIsLoading(true);
        removeImage();
    };

    const imageSrc: string | undefined = isLoading ? "/loadingAnim.svg" : image?.path ? image.path : props.path;

    return (
        <Stack direction="column" alignItems="end" spacing={2}>
            <Avatar sx={props.avatarSize} src={imageSrc}>{imageSrc ? null : props.avatarText}</Avatar>

            <Stack direction="row" spacing={1}>
                {image?.file ?
                    (
                        <>
                            <Button color="error" onClick={removeImage} startIcon={<ClearIcon />}>Cancel</Button>
                            <Button color="success" onClick={saveImageBackend}>Update</Button>
                        </>
                    ) : (
                        <>
                            <Button component="label" startIcon={<UploadIcon />}>
                                Upload

                                <input
                                    onChange={(e) => addImage(e.target.files?.item(0))}
                                    type="file"
                                    accept="image/png"
                                    hidden
                                />
                            </Button>

                            <Button color="error" disabled={props.path == undefined} startIcon={<DeleteIcon />} onClick={deleteImageBackend}>Delete</Button>
                        </>
                    )
                }
            </Stack>
        </Stack>
    );
}