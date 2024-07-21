import { PekillaContextProvider } from "@components/PekillaContext";
import { Button, Card, Container, Link as MuiLink, Stack, Typography } from "@mui/material";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const grotesk = Space_Grotesk({ subsets: ["latin"] });

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
				<body className={grotesk.className}>
					<nav style={{ padding: "15px" }}>
						<Container>
							<Stack direction="row" justifyContent="space-between" py={2} flexWrap="wrap" useFlexGap>
								<Stack spacing={2} direction="row">
									<MuiLink href="/" component={Link}>Home</MuiLink>
									<MuiLink href="/posts/search" component={Link}>Trend</MuiLink>
									<MuiLink href="/categories" component={Link}>Explore</MuiLink>
								</Stack>

								<Stack spacing={2} direction="row">
									<Button variant="outlined" LinkComponent={Link} href="/login">Sign up</Button>
									<Button LinkComponent={Link} href="/sign-up">Get Started</Button>
								</Stack>
							</Stack>
						</Container>
					</nav>

					{children}
				</body>
			</PekillaContextProvider>
		</html >
	);
}
