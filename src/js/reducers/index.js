import { DATA_RESET, DATA_LOADED } from "../constants/action-types";

const initialState = {
  articles: [],
  remoteArticles: [],
  displayList: false
};

function rootReducer(state = initialState, action) {
  if (action.type === DATA_LOADED) {
    return Object.assign({}, state, {
      remoteArticles: state.remoteArticles.concat(action.payload),
      displayList: true
    });
  }

  if (action.type === DATA_RESET) {
    return Object.assign({}, state, {
      displayList: false
    });
  }
  return state;
};

export default rootReducer;
