import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage} from "../store/reducers/PaginationSlice.js";

export const Paginate = () => {
    const dispatch = useDispatch()
    const { currentPage, postsPerPage, totalPosts } = useSelector(state => state.paginationReducer);
    const { filteredProducts } = useSelector(state => state.productReducer);
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === Math.ceil(totalPosts / postsPerPage);

    if (!filteredProducts || filteredProducts.length <= 10) return null

    const previousPage = () => {
        if (!isFirstPage) dispatch(setCurrentPage(currentPage - 1));
    };

    const nextPage = () => {
        if (!isLastPage) dispatch(setCurrentPage(currentPage + 1));
    };

    const paginate = (n) => dispatch(setCurrentPage(n));

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className='mt-10 mb-5 text-center'>
            <ul className="inline-flex -space-x-px text-base h-10">
                { !isFirstPage ? <li
                    onClick={previousPage}
                    className="cursor-pointer flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Previous
                </li> : null }
                { pageNumbers.map(pageNumber => <li
                    key={pageNumber}
                    onClick={() => paginate(pageNumber)}
                    className={`flex items-center justify-center px-4 h-10 cursor-pointer ${ currentPage === pageNumber ?
                        'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                        : 'leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    }`}>{pageNumber}</li>) }
                { !isLastPage ?  <li onClick={nextPage} className="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Next
                </li> : null }
            </ul>
        </nav>
    );
};