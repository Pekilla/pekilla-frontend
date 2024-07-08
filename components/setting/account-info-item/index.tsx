"use client";

import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

const IMAGE1 = "https://media.discordapp.net/attachments/1108234697932283945/1259673387996020826/image.png?ex=668c89c3&is=668b3843&hm=3eb55a24e45b798831b8429299f56e3e6aae3c7b9c618e2ae08da0e009359ec5&=&format=webp&quality=lossless&width=843&height=623";
const DFT_IMAGE = "https://media.discordapp.net/attachments/1108234697932283945/1259719103216619520/image.png?ex=668cb456&is=668b62d6&hm=f65bee9bda1e2efc9d0474b297a724eff919fd643c757af6bef11d0c8be8d3cd&=&format=webp&quality=lossless&width=258&height=192";


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

export function AccountInfo() {
    return (
        <SettingSection title="Account info">
            <TableBody>
                <AccountInfoItem label="Email" value="ip@nothankyou.com" />
                <AccountInfoItem label="Password" value="ip@nothankyou.com" />
            </TableBody>
        </SettingSection>
    )
}

export function ProfileIcon(props: { src?: string }) {
    const [image, setImage] = useState<{file?: File | null, path?: string}>();

    useEffect(() => {
        return () => {
            if(image?.path) URL.revokeObjectURL(image.path);
        }
    }, []);

    const addImage = (file?: File | null) => {
        if(file) {
            setImage({file, path : URL.createObjectURL(file)});
        }
    };

    const removeImage = () => {
        if(image?.path) URL.revokeObjectURL(image.path);
        setImage({});
    }

    return (
        <TableRow>
            <TableCell>
                <SettingLabel label="Profile icon" />
                <Typography variant="body2">An icon that everyone can see.</Typography>
            </TableCell>

            <TableCell />

            <TableCell align="right">
                <Stack direction="column" alignItems="end" spacing={2}>
                    <Image src={image?.path ? image.path : (props.src ?? DFT_IMAGE)} alt="g" width="191" height="169" />

                    <Stack direction="row" spacing={1}>
                        {image?.file ?
                            (
                                <>
                                    <Button color="success">Save</Button>
                                    <Button color="error" onClick={removeImage}>Cancel</Button>
                                </>
                            ) : (
                                <>
                                    <Button component="label">
                                        Upload

                                        <input
                                            onChange={(e) => addImage(e.target.files?.item(0))}
                                            type="file"
                                            accept="image/png"
                                            hidden
                                        />
                                    </Button>

                                    <Button color="error" disabled={props.src == undefined}>Delete</Button>
                                </>
                            )

                        }
                    </Stack>
                </Stack>
            </TableCell >
        </TableRow >
    );
}

export function Profile() {
    return (
        <SettingSection title="Profile">
            <TableBody>
                <AccountInfoItem label="Username" value="Jackson" />
                <ProfileIcon />
            </TableBody>
        </SettingSection>
    )
}