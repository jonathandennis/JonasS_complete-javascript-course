///////////////////////////////////////////////////
// Place to centralize all the things we need to select/manipulate DOM (i.e. query selectors), along with any reusable styles (i.e. search spinner) making our code easier to read and a lot neater.
///////////////////////////////////////////////////
export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shopping: document.querySelector('.shopping__list'),
    likesMenu: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list')
};

export const elementStrings = {
    loader: 'loader'
};

export const renderLoader = parent => {  // parent element allows us to pass in the parent thus rendering item as the child of the chosen parent. 
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader); // where to put it.
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader); // remember can only remove child elements from the parent. thus select up to the parent, then remove child.
};

