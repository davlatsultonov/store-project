import {Heading5} from "../headings/Heading5.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchCategories} from "../../store/reducers/ActionCreator.js";
import {CategoryItem} from "./CategoryItem.jsx";

export const CategoryGroup = () => {
    const dispatch = useDispatch();
    const { categories, isLoading, error } = useSelector(state => state.categoryReducer);

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

    return <>
        <Heading5 title='Categories' />
        <div className='flex flex-wrap gap-2'>
            { isLoading && <h1>Loading...</h1> }
            { error && <h1>{ error }</h1> }
            { categories &&  <CategoryItem name={'all'}/>}
            { categories.map(category => <CategoryItem key={category} name={category}/>) }
        </div>
    </>
}