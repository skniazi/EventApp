export const createReducer = (initialState,fnMap) => {
    return (state = initialState, {type, payload}) => {
        const handler = fnMap[type];
        //console.log({handler});
        //console.log(payload);
        
        //The Redux reducer API is (state, action) => newState
        return handler? handler(state,payload): state
    }
}