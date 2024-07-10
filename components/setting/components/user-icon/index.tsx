"use client";

import { avatarStyle } from "@/app/categories/[name]/page";
import { changeBanner, changeIcon } from "@/services/UserService";
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import { Avatar, Button, Stack, TableCell, TableRow, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SettingLabel from "../setting-label";

/**
 * Component to change the image of a user for the banner or the icon.
 */
export default function UserIcon(props: { userId: number, src?: string, isBanner?: boolean, username?: string }) {
    const router = useRouter();
    const [image, setImage] = useState<{ file?: File | null, path?: string }>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isLoading) setIsLoading(false);
    }, [props.src])

    useEffect(() => {
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
            if (props.isBanner) {
                await changeBanner(props.userId, true);
            } else {
                await changeIcon(props.userId, true);
            }

            router.refresh();
        }
    };

    const saveImageBackend = async () => {
        if (props.isBanner) {
            await changeBanner(props.userId, false, image?.file!);
        } else {
            await changeIcon(props.userId, false, image?.file!);
        }

        router.refresh();
        setIsLoading(true);
        removeImage();
    };

    const imageSrc: string | undefined = isLoading ? "/loadingAnim.svg" : image?.path ? image.path : props.src;

    return (
        <TableRow>
            <TableCell>
                <SettingLabel label={props.isBanner ? "Banner icon" : "Profile icon"} />
                <Typography variant="body2">{props.isBanner ? "Your profile banner." : "An icon that everyone can see."}</Typography>
            </TableCell>

            <TableCell />

            <TableCell align="right">
                <Stack direction="column" alignItems="end" spacing={2}>
                    <Avatar sx={props.isBanner ? {width: 550, height: 150, borderRadius: 2} : avatarStyle} src={imageSrc}>{imageSrc ? null : props.username?.at(0)}</Avatar>

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

                                    <Button color="error" disabled={props.src == undefined} startIcon={<DeleteIcon />} onClick={deleteImageBackend}>Delete</Button>
                                </>
                            )
                        }
                    </Stack>
                </Stack>
            </TableCell>
        </TableRow>
    );
}