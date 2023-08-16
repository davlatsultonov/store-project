import {Heading5} from "../headings/Heading5.jsx";

export const CardGroup = ({ children, className, showTitle = true, }) => <>
    { showTitle ? <Heading5 title='Products' /> : null }
    <div className={`${className ? className : ''} grid grid-cols-4 gap-5`}>
        { children }
    </div>
</>