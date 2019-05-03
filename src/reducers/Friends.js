export default (state, action) => {
	if(!state) {
		state = {
			list: [],
		}
	}

  switch(action.type) {
    case 'UPDATE_FRIENDS': 
      return ({
        ...state,
        ...action.list,
      })
    default: 
      return state
  }
}
