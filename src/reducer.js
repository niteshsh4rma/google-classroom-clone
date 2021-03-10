import { db } from './firebase'

export const initialState = {
    user: null,
    joinClassState: false,
    createClassState: false,
    classlist: {},
    joinlist: {}
}

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user
            }

        case "SET_JOIN_DIAG":
            return {
                ...state,
                joinClassState: action.joinClassState
            }

        case "SET_CREATE_DIAG":
            return {
                ...state,
                createClassState: action.createClassState
            }

        case "UPDATE_CLASSLIST":
            return {
                ...state,
                classlist: action.classlist
            }

        case "UPDATE_JOINLIST":
            return {
                ...state,
                joinlist: action.joinlist
            }

        default:
            return state
    }
}

export default reducer