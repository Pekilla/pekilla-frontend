"use client";

import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

export function AccountInfoItem(props: { label: string, value: string }) {
    return (
        <TableRow
            // CSS of MUI, that make the last row without a bottom line.
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell>
                <Typography variant="subtitle1">{props.label}</Typography>
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

export function Profil() {
    return (
        <SettingSection title="Profile">
            <TableBody>
                <AccountInfoItem label="Username" value="Jackson" />
                <AccountInfoItem label="Password" value="ip@nothankyou.com" />
            </TableBody>
        </SettingSection>
    )
}