export const capitalizeFirstLetter = (str) => str[0].toUpperCase() + str.slice(1)

export const findMinPrice = (items) => {
    const item = items.reduce((minItem, currentItem) => {
        if (currentItem.price <= minItem.price) {
            return currentItem;
        }
        return minItem;
    }, items[0])

    return item.price
}

export const findMaxPrice = (items) => {
    const item = items.reduce((maxItem, currentItem) => {
        if (currentItem.price >= maxItem.price) {
            return currentItem;
        }
        return maxItem;
    }, items[0])

    return item.price
}