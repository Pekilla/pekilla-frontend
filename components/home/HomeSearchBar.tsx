"use client";

import { TextField } from "@mui/material";
import { useRouter } from "next/navigation";

export default function HomeSearchBar() {
	const router = useRouter();

	const handleNavigate = (e: any) => {
		e.preventDefault();
		router.push(`/posts/search?content=${encodeURIComponent(new FormData(e.currentTarget).get("search") as string)}`);
	}

	return (
		<form onSubmit={handleNavigate}>
			<TextField name="search" placeholder="Search something" fullWidth />
		</form>
	);
};