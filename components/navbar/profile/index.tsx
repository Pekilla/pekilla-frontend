"use client";

import { Button, Stack } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function NavProfile() {
    const session = useSession();
    console.log(session.data);

    return (
        <Stack spacing={2} direction="row">
            {session?.data?.user ?
                <Button onClick={() => signOut()}>
                    Sign out
                </Button> : (
                    <>
                        <Button variant="outlined" LinkComponent={Link} href="/login">Sign in</Button>
                        <Button LinkComponent={Link} href="/sign-up">Get Started</Button>
                    </>
                )
            }
        </Stack>
    )
}