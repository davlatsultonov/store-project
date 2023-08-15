import {StarActive} from "./StartActive.jsx";
import {StartInActive} from "./StartInActive.jsx";

export const Rating = ({ rating }) => {
    const renderElements = () => {
        const result = [];

        for (let i = 0; i < 5; i++) {
            const item = i < Math.round(rating) ? <StarActive key={i} /> : <StartInActive key={i} />
            result.push(item)
        }

        return result
    }

    return renderElements()
}