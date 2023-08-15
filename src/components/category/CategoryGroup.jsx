import {Heading5} from "../headings/Heading5.jsx";

export const CategoryGroup = ({ children }) => <>
    <Heading5 title='Categories' />
    <div className='flex flex-wrap gap-2'>
        { children }
    </div>
</>