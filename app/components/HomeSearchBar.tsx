"use client";

import { TextField } from "@mui/material";
import { useRouter } from "next/navigation";

export default /* HomeSearchBar */ () => {
	const router = useRouter();

	const handleNavigate = (e: any) => {
		e.preventDefault();
		router.push(`/posts/search?content=${new FormData(e.currentTarget as any).get("search")}`);
	}

	return(
		<form onSubmit={handleNavigate}>
			<TextField name="search" placeholder="Search something" fullWidth />
		</form>
	);
};