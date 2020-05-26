export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, img) {
        const like = { id, title, author, img };
        this.likes.push(like);

        // persist data in localStorage
        this.persistData();
        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id); // find the index of item that matches id. findIndex is excellent built in method for this
        // [2,4,8] splice(1,1) -> returns 4, array then [2,8] splice removes from array(where,how many)
        // [2,4,8] slice(1,2) -> returns 4, array still [2,4,8] slice(start,end) slices out, but array stays same
        this.likes.splice(index, 1); // take out the item 

        // Persist data in localStorage
        this.persistData();
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes() {
        return this.likes.length;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));
        // restoring likes from the localStorage
        if (storage) this.likes = storage;
    }
}