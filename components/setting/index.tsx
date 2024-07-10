import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { AccountInfoItem } from "./components/account-info-item";
import UserIcon from "./components/user-icon";

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

export function AccountInfo(props: { email: string, username: string }) {
    return (
        <SettingSection title="Account info">
            <TableBody>
                <AccountInfoItem label="Email" value={props.email} />
                <AccountInfoItem label="Password" value="************" />
                <AccountInfoItem label="Username" value={props.username} />
            </TableBody>
        </SettingSection>
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