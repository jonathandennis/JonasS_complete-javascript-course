////////////////////////////////////////////
// import export examples 

// default exports just export/import 1 thing
//ex0 import str from './models/Search';  // ex0 single import/export 

// Named exports used to export multiple items
//ex1 import { add as a, multiply as m, ID } from './views/searchView';  // Example of ability to change name at import, as well as import multiple things
//ex2 import * as searchView from './views/searchView';   // * = import all and reassign name   

//ex1 console.log(`Using imported functions! ${a(ID, 2)} and ${m(3, 5)}. ${str}`);
//ex2 console.log(`Using imported functions! ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(3, 5)}. ${str}`); 

/////////////////////////////////////////////

import Search from './models/Search';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

const controlSearch = async () => {
    // 1- Get query from view
    const query = 'pizza' //TODO

    if (query) {
        // 2- New search object and add to state
        state.search = new Search(query);

        // 3- Prepare UI fro results

        // 4- Search for recipes
        await state.search.getResults();

        // 5- Render results on UI
        console.log(state.search.result);
    }
}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();  // stops page reload on every search click
    controlSearch();
});


search.getResults();