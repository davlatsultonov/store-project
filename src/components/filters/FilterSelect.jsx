import {useDispatch, useSelector} from "react-redux";
import {setBrand, setBrands} from "../../store/reducers/ProductsSlice.js";

export const FilterSelect = () => {
    const { brands } = useSelector(state => state.productReducer);
    const dispatch = useDispatch();

    return (
        <select id="countries"
                onChange={(e) => {
                    dispatch(setBrand(e.target.value))
                    dispatch(setBrands())
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value='' >Choose a brand</option>
            { brands.map(brand => (<option key={brand} value={brand}>{ brand }</option>)) }
        </select>
    );
};