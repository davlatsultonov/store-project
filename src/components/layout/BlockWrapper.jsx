export const BlockWrapper = ({ children, className }) => (
    <div className={`${className ?? ''} p-5 rounded-xl bg-white shadow-sm`}>
        { children }
    </div>
);