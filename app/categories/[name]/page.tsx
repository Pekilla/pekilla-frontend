import { Avatar, Box, Card, CardMedia, Container, Divider, Paper, Stack, Typography } from "@mui/material";

export default function CategoryPage() {

    const containerStyle = {
        width: 128,
        height: 128,
    }

    const bannerStyle = {
        height: 300,
        backgroundImage: "url('https://images-ext-1.discordapp.net/external/-AYFgaaFCTDgYkeFlJjtwFK79woW647ech2hlPPXlDk/%3Fw%3D650/https/www.indiewire.com/wp-content/uploads/2016/08/big-totoro-e1538413562225.jpeg?format=webp')",
        backgroundPosition: "center",
        backgroundSize: "cover"
    }

    return (
        <>
            <Box 
                sx={bannerStyle}
            />
            <Container>
                <Stack direction="row" mb={5}>
                    <Avatar 
                        sx={containerStyle}
                        variant="square">A</Avatar>
                    <Typography   fontSize={50}>Anime</Typography>
                </Stack>
                <Divider/>
            </Container>
        </>
    )    
}