import { PekillaContextProvider } from "@components/PekillaContext";
import { Button, Container, Link as MuiLink, Stack } from "@mui/material";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { getSession, SessionProvider, signOut } from "next-auth/react";
import { getServerSession, Session } from "next-auth";
import { Profile } from "@/components/setting";
import NavProfile from "@/components/navbar/profile";

const grotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Pekilla",
	description: "Forum in construction",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	const session = await getServerSession();

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

								<NavProfile />
							</Stack>
						</Container>
					</nav>

					{children}
				</body>
			</PekillaContextProvider>
		</html >
	);
}
