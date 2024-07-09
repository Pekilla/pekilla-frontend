"use client";

import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import { changeIcon } from "@/services/UserService";
import { useRouter } from "next/navigation";

const DFT_IMAGE = "https://media.discordapp.net/attachments/1260011315632537680/1260103346971349043/c19oeWJyaWQ.png?ex=668e1a31&is=668cc8b1&hm=ea987aa5592b4a0731cfb807e40b3e0b7a5a783bbeeacdebff72a45b1618695d&=&format=webp&quality=lossless&width=281&height=281";


export function SettingLabel(props: { label: string }) {
    return (
        <Typography variant="subtitle1">{props.label}</Typography>
    );
}

export function AccountInfoItem(props: { label: string, value: string }) {
    return (
        <TableRow
            // CSS of MUI, that make the last row without a bottom line.
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell>
                <SettingLabel {...props} />
            </TableCell>

            <TableCell>
                <Typography variant="subtitle1">{props.value}</Typography>
            </TableCell>

            <TableCell align="right">
                <Button>Update {props.label}</Button>
            </TableCell>
        </TableRow>
    );
}

export function SettingSection(props: { title: string, children: any }) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="h5">{props.title}</Typography>
                        </TableCell>

                        <TableCell /><TableCell />
                    </TableRow>
                </TableHead>

                {props.children}
            </Table>
        </TableContainer>
    );
}

export function AccountInfo(props: { email: string }) {
    return (
        <SettingSection title="Account info">
            <TableBody>
                <AccountInfoItem label="Email" value={props.email} />
                <AccountInfoItem label="Password" value="************" />
            </TableBody>
        </SettingSection>
    )
}

export function ProfileIcon(props: { src?: string, userId: number }) {
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
        await changeIcon(props.userId, true);
        router.refresh();
    };

    const saveImageBackend = async () => {
        await changeIcon(props.userId, false, image?.file!);
        router.refresh();
        setIsLoading(true);
        removeImage();
    };


    return (
        <TableRow>
            <TableCell>
                <SettingLabel label="Profile icon" />
                <Typography variant="body2">An icon that everyone can see.</Typography>
            </TableCell>

            <TableCell />

            <TableCell align="right">
                <Stack direction="column" alignItems="end" spacing={2}>
                    <Image src={isLoading ? "/loadingAnim.svg" : image?.path ? image.path : (props.src ?? DFT_IMAGE)} alt="g" width="191" height="169" />

                    <Stack direction="row" spacing={1}>
                        {image?.file ?
                            (
                                <>
                                    <Button color="success" startIcon={<CheckIcon />} onClick={saveImageBackend}>Save</Button>
                                    <Button color="error" onClick={removeImage} startIcon={<ClearIcon />}>Cancel</Button>
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
            </TableCell >
        </TableRow >
    );
}

export function Profile(props: { username: string, userId: number, icon?: string, banner?: string }) {
    return (
        <SettingSection title="Profile">
            <TableBody>
                <AccountInfoItem label="Username" value={props.username} />
                <ProfileIcon src={props.icon} userId={props.userId} />
            </TableBody>
        </SettingSection>
    )
}