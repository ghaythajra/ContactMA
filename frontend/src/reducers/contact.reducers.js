import { contactConstants } from "../actions/constants";

const initialState = {
  contacts: [],
  error: null,
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case contactConstants.GET_ALL_CONTACTS_REQUEST:
      return {
        ...state,
      };

      case contactConstants.GET_ALL_CONTACTS_SUCCESS:
        return {
          ...state,
          contacts: action.payload.contacts,
        };

    case contactConstants.GET_ALL_CONTACTS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    case contactConstants.ADD_CONTACT_SUCCESS:
      return {
        ...state,
        contacts: [...state.contacts, action.payload.contact],
      };

    case contactConstants.ADD_CONTACT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    case contactConstants.MODIFY_CONTACT_SUCCESS:
      const modifiedContactIndex = state.contacts.findIndex(
        (contact) => contact._id === action.payload.contact._id
      );

      if (modifiedContactIndex !== -1) {
        const updatedContacts = [
          ...state.contacts.slice(0, modifiedContactIndex),
          action.payload.contact,
          ...state.contacts.slice(modifiedContactIndex + 1),
        ];

        return {
          ...state,
          contacts: updatedContacts,
        };
      } else {
        return state;
      }

    case contactConstants.MODIFY_CONTACT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    case contactConstants.DELETE_CONTACT_SUCCESS:
      const filteredContacts = state.contacts.filter(
        (contact) => contact._id !== action.payload.contactId
      );
      return {
        ...state,
        contacts: filteredContacts,
      };

    case contactConstants.DELETE_CONTACT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    default:
      console.log("Default Action, Nothing To See Here");
      return state;
  }
};

export default contactReducer;
