////////////////////////////////////////////
// import export examples 

// Named exports used to export multiple items

//export const add = (a, b) => a + b;
//export const multiply = (a, b) => a * b;
//export const ID = 23;

////////////////////////////////////////////

import { elements } from './base';
export const getInput = () => elements.searchInput.value; // returns the vale entered into search field

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = ''; // deletes inner HTML to clear list
    elements.searchResPages.innerHTML = '';
};
// to highlight selected recipe in list
export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
};
/*
// 'Pasta with tomato and spinach' ILLUSTRATES CODE BELOW
acc: 0 / acc + cur.length = 5 / newTitle = ['Pasta']
acc: 5 / acc + cur.length = 9 / newTitle = ['Pasta', 'with']
acc: 9 / acc + cur.length = 15 / newTitle = ['Pasta', 'with', 'tomato']
acc: 15 / acc + cur.length = 18 / newTitle = ['Pasta', 'with', 'tomato']
acc: 18 / acc + cur.length = 24 / newTitle = ['Pasta', 'with', 'tomato']
*/
export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => { // reduce has acc built in making good use case for this purpose
            if (acc + cur.length <= limit) { //if acc under limit then push, if over no push
                newTitle.push(cur);
            }
            return acc + cur.length; // updates accumulator
        }, 0);
        //return the result
        return `${newTitle.join(' ')} ...`;
    }
    return title; // if title < limit just return title
} 

const renderRecipe = recipe => { // rendering of recipe/s on website happens here. Private function not exported
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup); // using insertAdjacentHTML to insert our html to the list.
};
// renders actual button. Using template literals as just need to return mark up as button gets rendered in next function below. Making this seperate function to follow dry methodology 
// using special 'data' attributes in HTML5 to store the page number (in Button class) to be used later (see button class) 
// important to add data attribute( data-goto=${type === 'prev' ? page - 1 : page + 1} ) allows us to select items by their id.
// type: 'prev' or 'next' 
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>  
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    </button>
`;

// renders pagination buttons
const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage); // need ceil to round number up (i.e. 4.5 becomes 5 pages)

    let  button; // need to declare variable outside as let and const are block scoped.
    if (page === 1 && pages > 1) { // display button only if there is more than 1 page
        // just button to go to next page
        button = createButton(page, 'next');
    } else if (page < pages) {
        // need prev and next buttons
        button = `
            ${createButton(page, 'prev')};
            ${createButton(page, 'next')};
        `;
    } else if (page === pages && pages > 1) {
        // only prev button
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
 };

export const renderResults = (recipes, page = 1, resPerPage = 10) => { //includes pagination of 10 results per page
    const start = (page - 1) * resPerPage; // 0 based, so need page - 1
    const end = page * resPerPage; // end returns the number before result (i.e. 10 is end of 9)
    recipes.slice(start, end).forEach(renderRecipe); // loops through recipes. This case has pagination of 10
    // render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
};