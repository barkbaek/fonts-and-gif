import { createContext, useState } from 'react'

const initialState = {
    state: {},
    actions: {}
}

const Context = createContext(initialState)

const withContext = WrappedComponent => {
    return props => {
        const [value1, setValue1] = useState(0)
        const [value2, setValue2] = useState(0)
        const [value3, setValue3] = useState(0)

        return (
            <Context.Provider value={{
                state: {
                    value1,
                    value2,
                    value3
                },
                actions: {
                    setValue1,
                    setValue2,
                    setValue3
                }
            }}>
                <WrappedComponent {...props} />
            </Context.Provider>
        )
    }
}

export { Context, withContext }