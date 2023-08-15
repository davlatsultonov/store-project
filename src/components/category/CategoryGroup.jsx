import {Heading5} from "../headings/Heading5.jsx";
import {useGetAllCategoriesQuery} from "../../store/api/apiSlice.js";
import {CategoryItem} from "./CategoryItem.jsx";
import {BlockWrapper} from "../layout/BlockWrapper.jsx";
import {Heading1} from "../headings/Heading1.jsx";

export const CategoryGroup = () => {
    const { data: categories, error, isLoading, isSuccess, isError } = useGetAllCategoriesQuery();
    let content;

    if (isLoading) {
        content = 'Loading...'
    } else if (isSuccess) {
        content = categories.map(category => <CategoryItem key={category} name={category}/>)
    } else if (isError) {
        content = 'Error'
    }

    return <>
        <Heading5 title='Categories' />
        <div className='flex flex-wrap gap-2'>
            { content }
        </div>
    </>
}