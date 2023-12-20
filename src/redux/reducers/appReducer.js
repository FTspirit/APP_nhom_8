const initData = {
    userName:"thuong",
    isLoading: false,
}

export default appReducer = (state = initData , {type , payload}) => {
    switch (type) {
        case 'CHANGE_APP_MODE':
            return {
                ...state,
                isLoading: true,
            };
        case 'CHANGE_APP_MODE_OK':
            return {
                ...state,
                isLoading: false,
                userName: payload,
            }
        default:
            return state;
    }
}