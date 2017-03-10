//SearchReducer holds all informartion typed in by user in searchFormField

export default function reducer(state={
  //initialState
  allSearches: [],
  roadSearch: {
    id: 12123414,
    description: '',
    searchParamters: [],
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
