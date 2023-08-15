import {Heading5} from "../headings/Heading5.jsx";

export const CategoryGroup = ({ children }) => <div className='mt-2 mb-10'>
    <Heading5 title='Categories' />
    <div className='flex flex-wrap gap-2'>
        { children }
    </div>
</div>