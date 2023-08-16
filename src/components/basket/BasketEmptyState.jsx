import {useNavigate} from "react-router-dom";
import {productionPrefix} from "../../main.jsx";
import {toggleShowBasketItems} from "../../store/reducers/BasketSlice.js";
import {useDispatch} from "react-redux";

export const BasketEmptyState = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleNavigateHome = () => {
        navigate(productionPrefix + '/');
        dispatch(toggleShowBasketItems())
    }

    return (
        <div className='flex flex-col justify-center'>
            <p className='pb-5 text-lg'>Your basket is empty</p>
            <button
                onClick={handleNavigateHome}
                className="bg-white hover:text-primary inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-black transition hover:bg-blue"
            >
                Home page
            </button>
        </div>
    );
};