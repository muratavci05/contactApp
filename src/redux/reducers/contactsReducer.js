

const initialState={
    start:false,   //çekme işleminin başlaması
    success:false,
    contacts:[],
    fail:false,
    errorMessage:"",

}

 const contactsReducer=(state = initialState, action) => {
    switch (action.type) {
        case "FETCH_CONTACTS_START":
            
            return{
                ...state,
                start: true
            };

        case "FETCH_CONTACTS_SUCCESS":

             return{
                ...state,
                start: false,
                success: true,
                contacts: action.payload,
             };

        case "FETCH_CONTACTS_FAIL":

             return{
                ...state,
                start: false,
                fail: true,
                errorMessage: action.payload,
             };

        case "ADD_CONTACTS":
            
             return{
                ...state,
                contacts:[...state.contacts, action.payload]
             };

        case "EDIT_CONTACTS":
            
             const filteredContactsEdit = state.contacts.filter(
                (item) => item.id != action.payload.id);
                return{
                    ...state,
                    contacts:[...filteredContactsEdit, action.payload],
                };

        case "DELETE_CONTACTS":
            
                const filteredContactsDelete = state.contacts.filter (
                    (item) => item.id !== action.payload);
                    return{
                        ...state,
                        contacts: filteredContactsDelete
                    };

    
        default:
            return state;
    };

    
};

export default contactsReducer;