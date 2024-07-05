import { getPostById } from "@/services/PostService";

const SpecificPostPage = async ({params} : any) => {

    const post = await getPostById(params.id);

    return (
        <>
            <h1>{post.title}</h1>
            <h2>{post.description}</h2>
        </>
    );
}
export default SpecificPostPage;