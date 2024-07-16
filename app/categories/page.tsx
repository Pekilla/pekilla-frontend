import CategoryView from "@/components/categories/category-view";
import { getAllCategories } from "@/services/CategoryService";
import { createRandomKey } from "@/utils/RandomKeys";
import { Container, Stack, Typography } from "@mui/material";
import EmojiEmotionsRoundedIcon from '@mui/icons-material/EmojiEmotionsRounded';

export default async function ExplorePage() {
    
    const categories = (await getAllCategories()).data;
    
    return (
        <Container>
            
            <Typography my={8} variant="h2" textAlign={"center"} fontWeight={700}>Explore many communities <EmojiEmotionsRoundedIcon sx={{fontSize: 40}}/> </Typography>

            {/* All categories will be shown here */}

            <Stack gap={10}>
                {
                    categories.map(category => 
                        <CategoryView 
                            key={createRandomKey()}
                            {...category}/>
                    )
                }
            </Stack>
            
        </Container>
    )
}