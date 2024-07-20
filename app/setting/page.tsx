import { AccountInfo, Profile } from "@/components/setting";
import data from "@/config.json";
import { getUserSetting } from "@/services/SettingService";
import { Container, Stack } from "@mui/material";
import { cookies } from "next/headers";

export default async function Setting() {
    const userSetting = (await getUserSetting()).data;

    return (
        <Container component={Stack} spacing={8}>
            <AccountInfo email={userSetting.email} username={userSetting.username} userId={data.id} />

            <Profile {...userSetting} userId={data.id} />
        </Container>
    );
}