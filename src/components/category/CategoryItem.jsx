import {capitalizeFirstLetter} from "../../helpers/text-helpers.js";

export const CategoryItem = ({ name }) => <div className='cursor-pointer bg-blue-100 hover:bg-blue-200 text-blue-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>
    { capitalizeFirstLetter(name) }
</div>