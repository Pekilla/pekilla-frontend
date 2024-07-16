import EditCreateCategoryForm from "@/components/categories/edit-create/EditCreate";

export default function EditCategory({ params }: any) {
    return (
        <EditCreateCategoryForm category={{
            name: "Jackson",
            description: "This is the streets.",
            banner: "http://localhost:2500/categories/banner/road.jpg",
            icon: "http://localhost:2500/categories/icon/blocks.png"
        }} />
    );
}