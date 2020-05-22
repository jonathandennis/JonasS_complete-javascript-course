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

import axios from 'axios'; // solution that is better than fetch

async function getResults(query) {
    try {
        const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${query}`); // '?' adds parameters, q is the query parameter. if another parameter, use & between parameters. you get parameters from the api documentation
        const recipes = res.data.recipes;
        console.log(recipes); 
    } catch (error) {
        alert(error);
    }
}
getResults('pizza');