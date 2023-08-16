export const FilterSelect = ({ items, onClick, defaultValue = '' }) => {
    return (
        <select id="countries"
                onChange={onClick}
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            { defaultValue ? <option value='' >{ defaultValue }</option> : null }
            { items.map(item => (<option key={item} value={item}>{ item }</option>)) }
        </select>
    );
};