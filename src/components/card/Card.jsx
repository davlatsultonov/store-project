import {Rating} from "../rating/Rating.jsx";
import {Link} from "react-router-dom";
import {productionPrefix} from "../../main.jsx";
import {useDispatch, useSelector} from "react-redux";
import {add, remove} from "../../store/reducers/BasketSlice.js";
import {AddIcon} from "../icons/AddIcon.jsx";
import {RemoveIcon} from "../icons/RemoveIcon.jsx";

export const Card = ({ product, horizontal = false }) => {
    const dispatch = useDispatch();
    const { id, title, price, discountPercentage, rating, thumbnail } = product;
    const { products: basketProducts } = useSelector(state => state.basketReducer);

    const handleProductIncrease = (product) => {
        dispatch(add(product))
    }

    const handleProductDecrease = (title) => {
        dispatch(remove(title))
    }

    const handleProductIncreaseByTitle = (title) => {
        dispatch(add(title))
    }

    const discountEl = () => discountPercentage ? <span

        className={`${ horizontal ? '-left-11 -top-4' : 'left-0 -top-8' } shadow bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-800 absolute`}>-{ Math.floor(discountPercentage) }%</span> : null;

    return (<div
        className={`w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex ${horizontal ? 'flex-row overflow-hidden' : 'flex-col'} justify-between`}>
        <Link to={productionPrefix + `/product/${id}`} className='border-b'>
            <img className={`${horizontal ? 'w-[208px]' : 'rounded-t-lg'} h-52 object-cover mx-auto`} src={thumbnail} alt={title}/>
        </Link>
        <div className="px-5 py-5 flex-grow flex flex-col">
            <Link to={productionPrefix + `/product/${id}`} className='mb-auto relative'>
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{ title }</h5>
                { discountEl() }
            </Link>
            <div className="flex items-center mt-2.5 mb-5">
                <Rating rating={rating} />
                <span
                    className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{ rating.toFixed(1) }</span>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">${ price }</span>

                { !basketProducts.hasOwnProperty(title) ?
                    <button
                        onClick={() => handleProductIncrease(product)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to Basket</button> :
                    <div className='flex items-center'>
                        <RemoveIcon onClick={() => handleProductDecrease(title)} />
                        <span className='mx-4 text-lg'>{ basketProducts[title]?.length }</span>
                        <AddIcon onClick={() => handleProductIncreaseByTitle(title)} />
                    </div>
                }
            </div>
        </div>
    </div>)
}