import { AccountInfo, Profile } from "@/components/setting/account-info-item";
import data from "@/config.json";
import { getUserSetting } from "@/services/UserService";
import { Container, Stack } from "@mui/material";

export default async function Setting() {
    const userSetting = (await getUserSetting(data.id)).data;

    return (
        <Container component={Stack} spacing={8}>
            <AccountInfo email={userSetting.email} />

            <Profile {...userSetting} userId={data.id} />
        </Container>
    );
}