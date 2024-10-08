"use client";

import { createRandomKey } from "@/utils/RandomKeys";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, Button, Divider, MenuItem, Stack, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MuiMenu, MuiMenuItem } from "../shared/MuiMenu";

export default function NavProfile() {
    const session = useSession();
    const user = session?.data?.user;
    const router = useRouter();

    const DROPDOWN_MENU = [
        {
            path: `/users/${encodeURIComponent(user?.username!)}`,
            label: "My profil",
            icon: <PersonIcon />
        },
        {
            path: "/setting",
            label: "Settings",
            icon: <SettingsIcon />
        }
    ];

    return (
        <Stack spacing={2} direction="row">
            {session?.data?.user ?
                <MuiMenu menuIcon={
                    <Avatar src={user?.icon!}>
                        {user?.icon! ? null : user?.username?.at(0)}
                    </Avatar>
                }>
                    <Stack component={MenuItem}>
                        <Typography textAlign="center" variant="h6">{user?.username ?? "Guest"}</Typography>
                    </Stack>
                    <Divider />

                    {DROPDOWN_MENU.map(item => (
                        <MuiMenuItem
                            {...item}
                            key={createRandomKey()}
                            action={() => router.push(item.path)}
                        />
                    ))}
                    <Divider />

                    <MuiMenuItem
                        icon={<LogoutIcon />}
                        action={() => router.push("/logout")}
                        label="Logout"
                    />
                </MuiMenu> : (
                    <>
                        <Button variant="outlined" LinkComponent={Link} href="/login">Sign in</Button>
                        <Button LinkComponent={Link} href="/sign-up">Get Started</Button>
                    </>
                )
            }
        </Stack>
    )
}