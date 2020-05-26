import uniqid from 'uniqid'; // dependency that creates unique id's we will need for each item

export default class List {
    constructor() {
        this.items = []; // all of the items in our list gets pushed here
    }

    addItem (count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }

    deleteItem(id) {
        const index = this.items.findIndex(el => el.id === id); // find the index of item that matches id. findIndex is excellent built in method for this
        // [2,4,8] splice(1,1) -> returns 4, array then [2,8] splice removes from array(where,how many)
        // [2,4,8] slice(1,2) -> returns 4, array still [2,4,8] slice(start,end) slices out, but array stays same
        this.items.splice(index, 1); // take out the item 
    }

    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount; // updates count for items in list with button
    }
}