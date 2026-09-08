import type {lists} from '../types/shoppingList.js';

let shoppingList: lists[] = [];

let currentId = 1;

export const getShoppingList = (): lists[] => {
    return shoppingList;
};

export const getListById = (id:number): lists | undefined => {
    const list = shoppingList.find((list) => list.id === id);
    return list;
};

export const addShoppingList = (name: string,color: string, item: string[]): lists =>{
    const newShoppingList: lists = {id: currentId++, name, color, userId: currentId}
    return newShoppingList;
}

