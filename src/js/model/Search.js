import axios from "axios";

export default class Search {
  constructor(query) {
    this.query = query;
  }

  doSearch = async () => {
    try {
      const result = await axios(
        `https://forkify-api.herokuapp.com/api/search?q=${this.query}`
      );

      this.recipes = result.data.recipes;
      return this.recipes;
    } catch (err) {
      console.log("Алдаа : " + err);
    }
  };
}
