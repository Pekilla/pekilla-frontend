import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import HomeSearchBar from "../components/home/HomeSearchBar";

export default function Home() {
	return (
		<Stack direction="row" alignItems="center" justifyContent="center" textAlign="center"  height={"80vh"} spacing={1.5}>
			<Stack spacing={3} width={500}>
				<Typography variant="h4" fontWeight={800} >Everyone has a voice</Typography>
				<Typography variant="h5">The place where all your questions can be answered.</Typography>
				<HomeSearchBar />
			</Stack>

		</Stack>
	);
}