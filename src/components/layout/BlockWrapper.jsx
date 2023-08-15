export const BlockWrapper = ({ children, className }) => (
    <div className={`${className} p-5 rounded-xl`} style={{ backgroundColor: 'rgb(253 253 253 / 78%)' }}>
        { children }
    </div>
);