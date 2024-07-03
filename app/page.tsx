"use client"

import { Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter, redirect, RedirectType } from 'next/navigation'

const Input = () => {
	const router = useRouter();

	const handleNavigate = (e: any) => {
		e.preventDefault();
		router.push(`/posts/${new FormData(e.currentTarget as any).get("search")}`);
	}

	return(
		<form onSubmit={handleNavigate}>
			<TextField name="search" placeholder="Search something" fullWidth />
		</form>
	);
};

export default function Home() {


	return (
		<Stack direction="row" alignItems="center" justifyContent="center" height={"80vh"} spacing={1.5}>
			<Stack spacing={3} width={500}>
				<Typography variant="h1" fontFamily="sans-serif">Everyone as a voice</Typography>
				<Typography variant="h6" fontFamily="monospace">The place where all your questions can be answered.</Typography>
				<Input />
			</Stack>

			<Image src="/old-computers.webp" alt="background" width={612} height={408} />
		</Stack>
	);
}
