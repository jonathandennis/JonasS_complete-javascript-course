////////////////////////////////////////////
// import export examples 

//ex0 export default 'I am an exported string.';    // default export when sending something to be exported

////////////////////////////////////////////

import axios from 'axios'; // solution that is better than fetch

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`); // '?' adds parameters, q is the query parameter. if another parameter, use & between parameters. you get parameters from the api documentation
            this.result = res.data.recipes;
            //console.log(this.result); 
        } catch (error) {
            alert(error);
        }
    }
}
