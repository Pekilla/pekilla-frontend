"use client";

import { changeBanner, changeIcon } from "@/services/UserService";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { CurrentSettingDialog, SettingDialog } from "./components/account-info-dialog";
import AccountInfoItem from "./components/account-info-item";
import UserIcon from "./components/user-icon";
import { AVATAR_SIZE, BANNER_SIZE } from "../shared/single-image-input";
import { getFirstChar } from "@/utils/utils";

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
                <UserIcon
                    avatarSize={AVATAR_SIZE} 
                    saveQuery={changeIcon} 
                    path={props.icon} 
                    id={props.userId} 
                    avatarText={getFirstChar(props.username)} 
                />

                <UserIcon
                    avatarSize={BANNER_SIZE} 
                    saveQuery={changeBanner} 
                    path={props.banner} 
                    id={props.userId} 
                    avatarText={getFirstChar(props.username)}
                    isBanner
                />
            </TableBody>
        </SettingSection>
    );
}