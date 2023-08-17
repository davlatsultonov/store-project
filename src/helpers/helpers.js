import {SORT_ELEMENTS} from "../components/contants/index.js";

export const capitalizeFirstLetter = (str) => str[0].toUpperCase() + str.slice(1)

export const calculateTotalSum = (items) => {
    return Object.values(items).reduce((acc, itemArray) => {
        const sum = itemArray.reduce((subTotal, item) => subTotal + item.price, 0);
        return acc + sum;
    }, 0);
}

export const calculateTotalCount = (items) => {
    return Object.values(items).map(itemArray => {
        return itemArray.reduce((total) => total + 1, 0);
    }).reduce((acc, curr) => acc + curr, 0)
}

export const calculateWithDiscount = (price, discount) => {
    return price - ((price * discount) / 100)
}

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

export const sortProducts = (products, sortType) => {
    return products.sort((a, b) => {
        if (sortType === SORT_ELEMENTS.cheap) {
            const el1 = calculateWithDiscount(a.price, a.discountPercentage);
            const el2 = calculateWithDiscount(b.price, b.discountPercentage);
            return el1 - el2
        }
        if (sortType === SORT_ELEMENTS.expensive) {
            const el1 = calculateWithDiscount(a.price, a.discountPercentage);
            const el2 = calculateWithDiscount(b.price, b.discountPercentage);
            return el2 - el1
        }
        return b.rating - a.rating
    });
}