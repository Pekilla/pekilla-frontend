import { AccountInfo, AccountInfoItem, Profil } from "@/components/setting/account-info-item";
import { Container, Stack, Table, TableBody, TableHead } from "@mui/material";

export default function Setting() {
    return (
        <Container component={Stack} spacing={8}>
            <AccountInfo />

            <Profil />
        </Container>
    );
}