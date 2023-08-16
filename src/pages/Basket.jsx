import {Layout} from "../components/layout/Layout.jsx";
import {Heading1} from "../components/headings/Heading1.jsx";
import {useDispatch, useSelector} from "react-redux";
import {CardGroup} from "../components/card/CardGroup.jsx";
import {Card} from "../components/card/Card.jsx";
import {BlockWrapper} from "../components/layout/BlockWrapper.jsx";
import {TrashIcon} from "../components/icons/TrashIcon.jsx";
import {removeAll, removeAllProductItems, toggleShowBasketItems} from "../store/reducers/BasketSlice.js";
import {productionPrefix} from "../main.jsx";
import {Link} from "react-router-dom";
import {calculateTotalCount, calculateTotalSum} from "../helpers/helpers.js";
import {useState} from "react";

export const Basket = () => {
    const dispatch = useDispatch()
    const { products: basketProducts, showBasketItems } = useSelector(state => state.basketReducer);
    const [isCheckedOut, setIsCheckedOut] = useState(false)

    const handleCheckOut = () => {
        handleRemoveAll();
        dispatch(toggleShowBasketItems())
        setIsCheckedOut(true)
    }

    const handleRemoveAllProductItems = (title) => {
        dispatch(removeAllProductItems(title))
    }

    const handleRemoveAll = () => {
        dispatch(removeAll())
    }

    const renderCards = () => {
        return Object.entries(basketProducts).map(([title, items]) => {
            return (<div key={title} className='flex my-3 gap-5 items-center'>
                <Card key={title} horizontal={true} product={items[0]}/>
                <TrashIcon onClick={() => handleRemoveAllProductItems(title)}/>
            </div>)
        })
    }

    return (
        <Layout>
            { !isCheckedOut ? <div className='text-center mt-10'>
                <Heading1 title='Shopping Cart'/>
            </div> : null}

            <div className='flex items-start justify-center gap-5 mx-auto w-8/12 mt-10'>
                { !isCheckedOut ? <>
                    { Object.keys(basketProducts).length ? <><BlockWrapper className='flex-grow'>
                        { renderCards() }
                    </BlockWrapper>
                        <BlockWrapper className='w-[300px] sticky top-3'>
                            <div className='text-center mb-6'>
                                <button onClick={handleRemoveAll} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                    Remove All
                                </button>
                            </div>

                            <div className='border-b pb-2 mb-5'>
                                <span className='text-lg font-medium'>{ calculateTotalCount(basketProducts) } </span> items
                                <div className='flex justify-between'>
                                    <Heading1 title={'TOTAL'} light={true} />
                                    <Heading1 title={`$${calculateTotalSum(basketProducts)}`} />
                                </div>
                            </div>
                            <button onClick={handleCheckOut} type="button" className="w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                Checkout
                            </button>
                        </BlockWrapper></> : <div className='flex flex-col justify-center'>
                        <p className='pb-5 text-lg'>Your basket is empty</p>
                        <Link
                            to={productionPrefix + '/'}
                            className="bg-white hover:text-primary inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-black transition hover:bg-blue"
                        >
                            Home page
                        </Link>
                    </div> }
                </> : <div className='flex flex-col gap-5'>
                    <Heading1 title={'Thanks For The Purchase 😊!'} />
                    <Link
                    to={productionPrefix + '/'}
                    className="bg-white hover:text-primary inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-black transition hover:bg-blue"
                >
                    Go back to shopping
                </Link>
                </div> }
            </div>


        </Layout>
    );
};