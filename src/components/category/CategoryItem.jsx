import {capitalizeFirstLetter} from "../../helpers/helpers.js";
import {useDispatch} from "react-redux";
import {fetchProducts} from "../../store/reducers/ActionCreator.js";
import {setMaxProductPrice, setMinProductPrice} from "../../store/reducers/ProductsSlice.js";

export const CategoryItem = ({ name }) => {
    const dispatch = useDispatch()

    const handleCategoryChange = () => {
        dispatch(fetchProducts(name))
        dispatch(setMinProductPrice())
        dispatch(setMaxProductPrice())
    }

    return (<div title={capitalizeFirstLetter(name)} onClick={handleCategoryChange} className='text-center whitespace-nowrap truncate cursor-pointer bg-blue-100 hover:bg-blue-200 text-blue-800 text-md font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>
        { capitalizeFirstLetter(name) }
    </div>)
}