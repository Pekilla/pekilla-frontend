"use client";

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { CurrentSettingDialog, EmailDialog, PasswordDialog, SettingDialog, UsernameDialog } from "./components/account-info-dialog";
import AccountInfoItem from "./components/account-info-item";
import UserIcon from "./components/user-icon";
import { useState } from "react";

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

export function AccountInfo(props: { email: string, username: string, userId: number }) {
    const [currentDialog, setCurrentDialog] = useState<SettingDialog | undefined>();

    const handleClose = () => {
        setCurrentDialog(undefined);
    };

    console.log(currentDialog);

    return (
        <>
            <CurrentSettingDialog {...props} onClose={() => setCurrentDialog(undefined)} currentDialog={currentDialog} />

            <SettingSection title="Account info">
                <TableBody>
                    <AccountInfoItem label="Email" value={props.email} openPopup={() => setCurrentDialog("EMAIL")} />
                    <AccountInfoItem label="Password" value="************" openPopup={() => setCurrentDialog("PASSWORD")} />
                    <AccountInfoItem label="Username" value={props.username} openPopup={() => setCurrentDialog("USERNAME")} />
                </TableBody>
            </SettingSection>
        </>
    );
}

export function Profile(props: { username: string, userId: number, icon?: string, banner?: string }) {
    return (
        <SettingSection title="Profile">
            <TableBody>
                <UserIcon src={props.icon} userId={props.userId} username={props.username} />
                <UserIcon src={props.banner} userId={props.userId} username={props.username} isBanner />
            </TableBody>
        </SettingSection>
    );
}