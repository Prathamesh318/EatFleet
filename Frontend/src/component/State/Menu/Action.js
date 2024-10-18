// import axios from "axios"

import { api } from "../../Config/api"
import { CREATE_MENU_ITEM_FAILURE, CREATE_MENU_ITEM_REQUEST, CREATE_MENU_ITEM_SUCCESS, DELETE_MENU_ITEM_FAILURE, DELETE_MENU_ITEM_REQUEST, DELETE_MENU_ITEM_SUCCESS, GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST, GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, SEARCH_MENU_ITEM_FAILURE, SEARCH_MENU_ITEM_REQUEST, SEARCH_MENU_ITEM_SUCCESS, UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST, UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS } from "./ActionType";


export const createMenuItem=({menu,jwt})=>async(dispatch)=>{
    dispatch({type:CREATE_MENU_ITEM_REQUEST})
    try {
        
        const {data}=await api.post(`api/admin/food`,menu,{
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        });

        dispatch({type:CREATE_MENU_ITEM_SUCCESS,payload:data.jwt});
        console.log("Menu Created Successfully",data);
    } catch (error) {
        
        dispatch({type:CREATE_MENU_ITEM_FAILURE,payload:error})
        console.log(error);
    }
}

export const getMenuItemsByRestaurantId = (reqData) => {
  return async (dispatch) => {
      dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
      try {
          alert(reqData.restaurantid);
          // console.log(reqData.jwt);
          // console.log("Category is:"+reqData.category);
          console.log(JSON.stringify(reqData));
          const { data } = await api.get(
              `/api/food/restaurant/${reqData.restaurantid}?vegeterian=${reqData.vegeterian}&nonveg=${reqData.nonveg}&seasonal=${reqData.seasonal}&category=${reqData.category}`,
              {
                  headers: {
                      Authorization: `Bearer ${reqData.jwt}`,
                  },
              }
          );

          console.log('Menu items by restaurant:', data);
          dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, payload: data });
      } catch (error) {
          // Check if error.response is defined
          if (error.response) {
              console.log("Error in getting menu items:");
              console.log("Response data:", error.response.data); // log the response data
              console.log("Status code:", error.response.status); // log the status code
              console.log("Headers:", error.response.headers); // log the headers

              // Handle redirect
              if (error.response.status === 302) {
                  console.log("Redirect detected. Status code:", error.response.status);
                  console.log("Redirect location:", error.response.headers['location']);
              }
          } else if (error.request) {
              // The request was made but no response was received
              console.log("No response received:", error.request);
          } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error message:", error.message);
          }
          dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, payload: error.response.data });
      }
  };
};



  export const searchMenuItem = ({ keyword, jwt }) => {
    return async (dispatch) => {
      dispatch({ type: SEARCH_MENU_ITEM_REQUEST });
      try {
        const { data } = await api.get(`/api/food/search?name=${keyword}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log('data', data);
        dispatch({ type: SEARCH_MENU_ITEM_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: SEARCH_MENU_ITEM_FAILURE ,payload:error});
      }
    };
  };


  export const updateMenuItemsAvailability = ({ foodId, jwt }) => {
    return async (dispatch) => {
      dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST });
      try {
        const { data } = await api.put(`/api/admin/food/${foodId}`, {}, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log('update menuItems Availability', data);
        dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS, payload: data });
      } catch (error) {
        console.log('error', error);
        dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,payload:error})
      }
    };
  };

  export const deleteFoodAction = ({ foodId, jwt }) => {
    return async (dispatch) => {
      dispatch({ type: DELETE_MENU_ITEM_REQUEST });
      try {
        const { data } = await api.delete(`/api/admin/food/${foodId}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log('delete food', data);
        dispatch({ type: DELETE_MENU_ITEM_SUCCESS, payload: foodId });
      } catch (error) {
        dispatch({ type: DELETE_MENU_ITEM_FAILURE, payload: error });
      }
    };
  };





