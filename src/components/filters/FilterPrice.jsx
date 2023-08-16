import {useDispatch, useSelector} from "react-redux";
import {setMaxProductPrice, setMinProductPrice} from "../../store/reducers/ProductsSlice.js";
import {findMaxPrice, findMinPrice} from "../../helpers/helpers.js";

export const FilterPrice = ({ minPrice, maxPrice }) => {
    const dispatch = useDispatch();
    const { products, minProductPrice, maxProductPrice } = useSelector(state => state.productReducer);

    const handleMaxNumChange = (e) => {
        let num = parseInt(e.target.value)
        if (isNaN(num)) num = findMaxPrice(products)
        dispatch(setMaxProductPrice(num))
    }

    const handleMinNumChange = (e) => {
        let num = parseInt(e.target.value)
        if (isNaN(num)) num = findMinPrice(products)
        dispatch(setMinProductPrice(num))
    }

    return (
        <div className='grid grid-cols-2 gap-3'>
            <input type="number" min={minProductPrice} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                   onChange={handleMinNumChange}
                   placeholder={`от $${minProductPrice}`}/>
            <input type="number" min={minProductPrice} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                   onChange={handleMaxNumChange}
                   placeholder={`до $${maxProductPrice}`}/>
        </div>
    );
};