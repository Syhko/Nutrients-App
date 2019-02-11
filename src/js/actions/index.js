import { ADD_ARTICLE, DATA_LOADED } from "../constants/action-types";

const API_ENDPOINT="https://api.nal.usda.gov/ndb/"
const API_KEY="kqtQF8EmFfGL4oXTnOUaYuuiY0TOQRbHDNK0MLMY";

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload }
};

export function getData(query) {
  return function(dispatch) {
    return fetch(`${API_ENDPOINT}reports/?ndbno=`+query+`&type=b&format=json&api_key=${API_KEY}`)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: DATA_LOADED, payload: json.report.food.nutrients });
        console.log(json.list.item.map(x=>x.name));
      })
      .catch(error => console.log(error))
  };
}
