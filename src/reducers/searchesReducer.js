
//flytt noe av det som nå er i dataReducer hit

export default function reducer(state={
  //initialState
  allSearches: [],
  roadSearch: {
    id: 12123414,
    description: '',
    roadObjects: [],
    rapport: {
      rapportID: 123,
      description: '',
      rapportObjekter: [
        {
          id: 123,
          description: '',
        }
      ]
    }
  }

}, action) {
  //simple switch statement based on type of action
  switch (action.type) {
    case "TEMPLATE_ACTION": {
      return{...state,fetching: true}
    }
    case "TEMPLATE_ACTION2": {
      return{
        ...state
      }
    }
  }
  return state
}
