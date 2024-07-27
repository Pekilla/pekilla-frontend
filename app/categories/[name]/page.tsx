import PostView from "@/components/post/post-view";
import { CategoryViewDTO } from "@/models/dto/CategoryViewDTO";
import { getCategory } from "@/services/CategoryService";
import { createRandomKey } from "@/utils/RandomKeys";
import { avatarStyle, bannerStyle } from "@/utils/static";
import { Avatar, Box, Container, Divider, Stack, Typography } from "@mui/material";

export default async function CategoryPage({ params }: any) {
    const category: CategoryViewDTO = (await getCategory(params.name)).data;

    return (
        <>
            <Box sx={{ ...bannerStyle, backgroundImage: `url(${category.banner})` }} />
            <Container >
                <Stack direction="row" alignItems="end" my={5}>
                    <Avatar src={category.icon} sx={avatarStyle}>
                        {category.icon ? undefined : params.name.charAt(0)}
                    </Avatar>
                    <Typography ml={2} variant="h2" fontWeight={700}>
                        {params.name}
                    </Typography>
                </Stack>
                <Divider sx={{ marginY: 5 }} />

                <Stack gap={2}>
                    {
                        /* All post in this category  */
                        category?.posts?.map(post =>
                            <PostView
                                key={createRandomKey()}
                                {...post} />
                        )
                    }
                </Stack>

            </Container>
        </>
    )
}