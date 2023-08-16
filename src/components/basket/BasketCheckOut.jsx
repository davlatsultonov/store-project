import {Heading1} from "../headings/Heading1.jsx";
import {Link} from "react-router-dom";
import {productionPrefix} from "../../main.jsx";

export const BasketCheckOut = () => {
    return (
        <div className='flex flex-col gap-5'>
            <Heading1 title={'Thanks For The Purchase 😊!'} />
            <Link
                to={productionPrefix + '/'}
                className="bg-white hover:text-primary inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-black transition hover:bg-blue"
            >
                Go back to shopping
            </Link>
        </div>
    );
};