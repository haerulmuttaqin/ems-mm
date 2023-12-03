const Reducer = (state, action) => {
    switch (action.key) {
        case 'refTypeSelected':
            return {
                ...state,
                refTypeSelected: action.payload
            };
        case 'refGenericSelected':
            return {
                ...state,
                refGenericSelected: action.payload
            };
        case 'menuSelected':
            return {
                ...state,
                menuSelected: action.payload
            };
        case 'menuItemSelected':
            return {
                ...state,
                menuItemSelected: action.payload
            };
        case 'moduleSelected':
            return {
                ...state,
                moduleSelected: action.payload
            };
        case 'moduleActionSelected':
            return {
                ...state,
                moduleActionSelected: action.payload
            };
        case 'moduleNameSelected':
            return {
                ...state,
                moduleNameSelected: action.payload
            };
        case 'lastSelectedRefType':
            return {
                ...state,
                lastSelectedRefType: action.payload
            };
        case 'currentMenuName':
            return {
                ...state,
                currentMenuName: action.payload
            };
        default:
            return state;
    }
};

export default Reducer;