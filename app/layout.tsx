import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Button, Stack, TextField, Typography, Link as MuiLink } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

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
			<body className={inter.className}>
				<nav style={{ padding: "15px" }}>
					<Stack direction="row" justifyContent="space-between">
						<Stack spacing={2} direction="row">
							<MuiLink href="/" component={Link} underline="hover">Home</MuiLink>
							<MuiLink href="/trend" component={Link} underline="hover">Trend</MuiLink>
							<MuiLink href="/comments" component={Link} underline="hover">Community</MuiLink>
						</Stack>

						<Stack spacing={2} direction="row">
							<Button variant="outlined">Sign up</Button>
							<Button variant="contained">Get Started</Button>
						</Stack>
					</Stack>
				</nav>

				{children}
			</body>
		</html>
	);
}
