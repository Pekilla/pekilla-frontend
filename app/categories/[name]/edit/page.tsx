import EditCreateCategoryForm from "@/components/categories/edit-create/EditCreate";
import { getEditCategory } from "@/services/CategoryService";

export default async function EditCategory({ params }: any) {
    const category: any = (await getEditCategory(decodeURIComponent(params.name))).data;

    return (
        category == 403 ?
            (
                <p>You do not have access to this category.</p>
            ) : (
                category == 404 ?
                    (
                        <p>Category not found.</p>
                    ) : (
                        <EditCreateCategoryForm category={category} />
                    )
            )
    );
}