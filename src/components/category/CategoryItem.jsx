import {capitalizeFirstLetter} from "../../helpers/text-helpers.js";
import {useDispatch} from "react-redux";
import {fetchProducts} from "../../store/reducers/ActionCreator.js";

export const CategoryItem = ({ name }) => {
    const dispatch = useDispatch()

    return (<div onClick={() => dispatch(fetchProducts(name))} className='cursor-pointer bg-blue-100 hover:bg-blue-200 text-blue-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>
        { capitalizeFirstLetter(name) }
    </div>)
}