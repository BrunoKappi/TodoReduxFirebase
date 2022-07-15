

const LoggedUser = (state = {}, action) => {
    switch (action.type) {
        case 'CLEAR_LOGGED':
            return {
                email: 'Vazio',
                uid: 'Vazio'
            }
        case 'SET_LOGGED':
            return action.user
        default:
            return state
    }
}

export default LoggedUser
