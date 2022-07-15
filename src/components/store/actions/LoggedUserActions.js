

    export const clearLoggedUser = () => {
        return ({
            type: 'CLEAR_LOGGED'
        })
    }

    export const setLoggedUser = (user) => {
        return ({
            type: 'SET_LOGGED',
            user
        })
    }


    