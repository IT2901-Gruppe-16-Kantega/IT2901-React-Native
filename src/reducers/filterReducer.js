
export default function reducer(state={
  selectedFunction: null,

  selectedFilter: {},
  selectedFilterValue: {},
  allSelectedFilters: [],

  filterValueText: null,

}, action) {
  switch (action.type) {
    case "SELECT_FUNCTION": {
      return {...state, selectedFunction: action.payload}
    }
    case "DESELECT_FUNCTION": {
      return {...state, selectedFunction: null}
    }
    case "SELECT_FILTER": {
      console.log("selectFilter")
      return {...state, selectedFilter: action.payload}
    }
    case "DESELECT_FILTER": {
      return {...state, selectedFilter: {}}
    }
    case "SELECT_FILTER_VALUE": {
      return {...state, selectedFilterValue: action.payload}
    }
    case "DESELECT_FILTER_VALUE": {
      return {...state, selectedFilterValue: {}}
    }
    case "INPUT_FILTER_VALUE_TEXT": {
      return {...state, filterValueText: action.payload}
    }
    case "CLEAR_FILTER_VALUE_TEXT": {
      return {...state, filterValueText: null}
    }
    case "ADD_FILTER": {
      return {...state, allSelectedFilters: state.allSelectedFilters.concat([action.payload])}
    }
    case "REMOVE_FILTER": {
      var remFilter = action.payload;
      var newFilters = state.allSelectedFilters.filter(f => {
        return (!(f.egenskap.id === remFilter.egenskap.id && f.funksjon === remFilter.funksjon && f.verdi === remFilter.verdi));
      });
      return {...state, allSelectedFilters: newFilters}
    }
    case "REMOVE_ALL_FILTERS": {
      return {...state, allSelectedFilters: []}
    }
  }
  return state
}
