export const FilterItem = ({ children, label }) => {
    return (
        <div className='my-2'>
            <label className='block mb-2 text-md font-medium text-gray-900 dark:text-white'>{ label }</label>
            { children }
        </div>
    );
};