import { PekillaContextProvider } from "@/app/contexts/PekillaContext";
import { Button, Link as MuiLink, Stack } from "@mui/material";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Pekilla",
	description: "Forum in construction",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<PekillaContextProvider>				
				<body className={inter.className}>
					<nav style={{ padding: "15px" }}>
						<Stack direction="row" justifyContent="space-between" flexWrap="wrap">
							<Stack spacing={2} direction="row">
								<MuiLink href="/" component={Link}>Home</MuiLink>
								<MuiLink href="/posts/search" component={Link}>Trend</MuiLink>
								<MuiLink href="/comments" component={Link}>Community</MuiLink>
							</Stack>

							<Stack spacing={2} direction="row">
								<Button variant="outlined">Sign up</Button>
								<Button variant="contained">Get Started</Button>
							</Stack>
						</Stack>
					</nav>

					{children}
				</body>
			</PekillaContextProvider>
		</html >
	);
}
