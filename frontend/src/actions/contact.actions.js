import axios from "axios";
import {contactConstants} from "./constants";

export const listoContacts = () => {
  return async dispatch => {
      console.log("Fetching contacts...");
      dispatch({type: contactConstants.GET_ALL_CONTACTS_REQUEST});

      try {
          const res = await axios.get("http://127.0.0.1:3000/contact/show");
          if (res.status === 200) {
              dispatch({
                  type: contactConstants.GET_ALL_CONTACTS_SUCCESS,
                  payload: {contacts: res.data}
              });
          }
      } catch (error) {
          dispatch({
              type: contactConstants.GET_ALL_CONTACTS_FAILURE,
              payload: {error: error.response}
          });
      }
  };
}


export const addContact = (contactData) => {
    return async (dispatch) => {
      dispatch({ type: contactConstants.ADD_CONTACT_REQUEST });
  
      try {
        const res = await axios.post("http://127.0.0.1:3000/contact/add", contactData);
        if (res.status === 200) {
          dispatch({ type: contactConstants.ADD_CONTACT_SUCCESS, payload: { contact: res.data } });
        }
      } catch (error) {
        dispatch({ type: contactConstants.ADD_CONTACT_FAILURE, payload: { error: error.response } });
      }
    };
  };

  export const modifyContact = (contactId, contactData) => {
    return async (dispatch) => {
      dispatch({ type: contactConstants.MODIFY_CONTACT_REQUEST });
  
      try {
        const res = await axios.post(`http://127.0.0.1:3000/contact/${contactId}/modify`, contactData);
        if (res.status === 200) {
          dispatch({ type: contactConstants.MODIFY_CONTACT_SUCCESS, payload: { contact: res.data } });
        }
      } catch (error) {
        dispatch({ type: contactConstants.MODIFY_CONTACT_FAILURE, payload: { error: error.response } });
      }
    };
  };
  
  export const deleteContact = (contactId) => {
    return async (dispatch) => {
      dispatch({ type: contactConstants.DELETE_CONTACT_REQUEST });
  
      try {
        const res = await axios.get(`http://127.0.0.1:3000/contact/${contactId}/delete`);
        if (res.status === 200) {
          dispatch({ type: contactConstants.DELETE_CONTACT_SUCCESS, payload: { contactId } });
        }
      } catch (error) {
        dispatch({ type: contactConstants.DELETE_CONTACT_FAILURE, payload: { error: error.response } });
      }
    };
  };