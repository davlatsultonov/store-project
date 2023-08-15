import {Heading5} from "../headings/Heading5.jsx";

export const FilterGroup = ({ children }) => (
    <>
        <Heading5 title='Filters' />
        <div className='flex flex-col'>
            { children }
        </div>
    </>
);