import React from 'react'

const PathContext = React.createContext();
const localState = JSON.parse(localStorage.getItem('pathState'));

const initialState = {
    path: "data"
}

function pathReducer(state, action) {
    switch (action.type) {
        case 'deeperPath': {
            return {
                ...state,
                path: state.path + "/" + action.payload
            }
        }
        case 'higherPath': {
            return {
                ...state,
                path: state.path.split("/").slice(0, -1).join("/")
            }
        }
        case 'resetPath': {
            return {
                ...state,
                path: "data"
            }
        }
        default: {
            return state;
        }
    }
}

function PathProvider({ children }) {
    const [pathState, pathDispatch] = React.useReducer(pathReducer, localState || initialState)

    React.useEffect(() => {
        localStorage.setItem('pathState', JSON.stringify(pathState))
    }, [pathState])

    return (
        <PathContext.Provider value={{ pathState, pathDispatch }}>
            {children}
        </PathContext.Provider>
    )
}

export { PathProvider, PathContext }