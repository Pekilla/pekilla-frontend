import { Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";

export default function Home() {
	return (
		<Stack direction="row" alignItems="center" justifyContent="center" height={"80vh"} spacing={1.5}>
			<Stack spacing={3} width={500}>
				<Typography variant="h1" fontFamily="sans-serif">Everyone as a voice</Typography>
				<Typography variant="h6" fontFamily="monospace">The place where all your questions can be answered.</Typography>
				<TextField placeholder="Search something" />
			</Stack>

			<Image src="/old-computers.webp" alt="background" width={612} height={408} />
		</Stack>
	);
}
