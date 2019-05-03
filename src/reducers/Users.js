export default (state, action) => {
	if(!state) {
		state = {
			list: [],
		}
	}

  switch(action.type) {
    case 'LOAD_USERS': 
      return ({
        ...state,
        list: action.list,
      })
    default: 
      return state
  }
}
