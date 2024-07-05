import { Category } from "@/models/enums/Category";

export default function SearchPost({ searchParams }: { searchParams: { content: string, category: Category, tags: Array<string> | string } }) {
    
    return (
        <>
            <p>{searchParams.content}</p>
            <p>{searchParams.category}</p>

            {searchParams.tags instanceof Array ?
                searchParams.tags?.map(value => (
                    <p>{value}</p>
                )) : <p>one tag</p>
            }
        </>
    );
}