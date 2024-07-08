import CategoryView from "@/components/category/category-view";
import { getAllCategories } from "@/services/CategoryService";
import { createRandomKey } from "@/utils/RandomKeys";
import { Container, Stack, Typography } from "@mui/material";

export default async function ExplorePage() {
    
    const categories = (await getAllCategories()).data;
    
    return (
        <Container>
            <Typography my={8} variant="h2" textAlign={"center"} fontWeight={700}>Explore many communities </Typography>

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