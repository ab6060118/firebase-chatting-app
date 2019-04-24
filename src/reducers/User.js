export default (state, action) => {
	if(!state) {
		state = {
			username: undefined,
			email: undefined,
			photo: undefined,
		}
	}

  switch(action.type) {
    case 'UPDATE_USER': 
      return ({
        ...state,
        ...action.user,
      })
    default: 
      return state
  }
}
