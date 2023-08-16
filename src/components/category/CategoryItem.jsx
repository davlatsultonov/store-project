import {capitalizeFirstLetter} from "../../helpers/helpers.js";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../../store/reducers/ActionCreator.js";
import {setMaxProductPrice, setMinProductPrice} from "../../store/reducers/ProductsSlice.js";
import {useLocation, useParams} from "react-router-dom";
import {setCurrentCategory} from "../../store/reducers/CategoriesSlice.js";

export const CategoryItem = ({ name }) => {
    const dispatch = useDispatch()
    const { currentCategory } = useSelector(state => state.categoryReducer)

    const handleCategoryChange = () => {
        dispatch(fetchProducts(name))
        dispatch(setMinProductPrice())
        dispatch(setMaxProductPrice())
        dispatch(setCurrentCategory(name))
    }

    const cls = []

    return (<div title={capitalizeFirstLetter(name)} onClick={handleCategoryChange} className={
        `text-center whitespace-nowrap truncate cursor-pointer ${ name === currentCategory || (currentCategory === '' && name.toLowerCase() === 'all') ? 'bg-blue-200' : 'bg-blue-white border border-blue-100' } hover:bg-blue-200 text-blue-800 text-md font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300`
    }>
        { capitalizeFirstLetter(name) }
    </div>)
}