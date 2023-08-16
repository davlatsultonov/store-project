import {useDispatch, useSelector} from "react-redux";
import {add, remove, toggleShowBasketItems} from "../store/reducers/BasketSlice.js";
import {Heading5} from "./headings/Heading5.jsx";
import {AddIcon} from "./icons/AddIcon.jsx";
import {RemoveIcon} from "./icons/RemoveIcon.jsx";
import {CloseIcon} from "./icons/CloseIcon.jsx";
import {Heading1} from "./headings/Heading1.jsx";
import {Link} from "react-router-dom";
import {productionPrefix} from "../main.jsx";
import {calculateTotalSum} from "../helpers/helpers.js";

export const Drawer = () => {
    const dispatch = useDispatch()
    const { products: basketProducts, showBasketItems } = useSelector(state => state.basketReducer);

    const handleProductDecrease = (title) => {
        dispatch(remove(title))
    }

    const handleProductIncrease = (title) => {
        dispatch(add(title))
    }

    const totalSum = calculateTotalSum(basketProducts)

    const renderEl = () => {
        return Object.entries(basketProducts).map(([title, items]) => {
            return (<div
                key={title}
                className='p-3 bg-gray-100 mb-2 rounded-md flex justify-between'>
                <div className='flex items-center w-3/5'>
                    <span className='font-medium truncate whitespace-nowrap' title={title}>{ title }</span>
                    <span
                        className="ml-3 bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                        { items.length }
                    </span>
                </div>
                <span className='font-bold inline-flex'>
                    <RemoveIcon onClick={() => handleProductDecrease(title)} />
                    <span className='mx-2'>$ { items.reduce((acc, current) => acc + current.price, 0) }</span>
                    <AddIcon onClick={() => handleProductIncrease(title)} />
                </span>
            </div>)
        })
    }

    return (
        <>
            <div id="drawer-example"
                 className={`flex flex-col justify-between shadow-2xl fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-[400px] dark:bg-gray-800 ${ showBasketItems ? 'transform-none' : null }`}
                 tabIndex="-1" aria-labelledby="drawer-label">
                <div>
                    <div className='flex justify-between mb-2 cursor-pointer' onClick={() => dispatch(toggleShowBasketItems())}>
                        <Heading5 title={'Selected products'}/>

                        <CloseIcon />
                    </div>

                    <div className='mt-3'>
                        {renderEl()}
                    </div>
                </div>
                <div>
                    <div className='flex justify-between'>
                        <Heading1 title={'Total:'} light={true} />
                        <Heading1 title={`$${totalSum}`} />
                    </div>

                    { totalSum > 0 ? <Link to={productionPrefix + '/basket'}
                        className="block text-white w-full mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</Link> : null }
                </div>
            </div>
            {/*{ showBasketItems ? <div  onClick={() => dispatch(toggleShowBasketItems())} className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30"></div> : null }*/}
        </>
    );
};