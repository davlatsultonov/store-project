import {Rating} from "../rating/Rating.jsx";

export const Card = ({ product }) => {
    const { title, description, price, discountPercentage, rating, brand, category, thumbnail, images  } = product;

    return (<div
        className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
            <img className="rounded-t-lg object-cover mx-auto" src={thumbnail} alt={title}/>
        </a>
        <div className="px-5 py-5">
            <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{ title }</h5>
            </a>
            <div className="flex items-center mt-2.5 mb-5">
                <Rating rating={rating} />
                <span
                    className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{ rating }</span>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{ price } c.</span>
                <a href="#"
                   className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">В корзину</a>
            </div>
        </div>
    </div>)
}