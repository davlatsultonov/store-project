import {useSelector} from "react-redux";
import {calculateTotalCount} from "../../helpers/helpers.js";

export const BasketIcon = () => {
    const { products: basketProducts } = useSelector(state => state.basketReducer);

    return (
        <div className='shadow bg-white cursor-pointer inline-flex items-center justify-between rounded pl-2 pr-1 py-2 border border-blue-200 sticky'>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart" width="30"
                 height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round"
                 strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                <path d="M17 17h-11v-14h-2"></path>
                <path d="M6 5l14 1l-1 7h-13"></path>
            </svg>
            <span
                className="ml-2 font-bold bg-blue-100 text-blue-800 text-xs mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                { calculateTotalCount(basketProducts) }
            </span>
        </div>
    );
};