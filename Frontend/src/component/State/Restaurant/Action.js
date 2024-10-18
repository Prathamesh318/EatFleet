import { api } from "../../Config/api";
import { CREATE_CATEGORY_FAILURE, CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, CREATE_EVENTS_FAILURE, CREATE_EVENTS_REQUEST, CREATE_EVENTS_SUCCESS, CREATE_RESTAURANT_FAILURE, CREATE_RESTAURANT_REQUEST, CREATE_RESTAURANT_SUCCESS, DELETE_EVENTS_REQUEST, DELETE_EVENTS_SUCCESS, DELETE_RESTAURANT_FAILURE, DELETE_RESTAURANT_REQUEST, DELETE_RESTAURANT_SUCCESS, GET_ALL_EVENTS_FAILURE, GET_ALL_EVENTS_REQUEST, GET_ALL_EVENTS_SUCCESS, GET_ALL_RESTAURANTS_FAILURE, GET_ALL_RESTAURANTS_REQUEST, GET_ALL_RESTAURANTS_SUCCESS, GET_RESTAURANT_BY_ID_FAILURE, GET_RESTAURANT_BY_ID_REQUEST, GET_RESTAURANT_BY_ID_SUCCESS, GET_RESTAURANT_BY_USER_ID_FAILURE, GET_RESTAURANT_BY_USER_ID_REQUEST, GET_RESTAURANT_BY_USER_ID_SUCCESS, GET_RESTAURANTS_CATEGORY_FAILURE, GET_RESTAURANTS_CATEGORY_REQUEST, GET_RESTAURANTS_CATEGORY_SUCCESS, GET_RESTAURANTS_EVENTS_FAILURE, GET_RESTAURANTS_EVENTS_REQUEST, GET_RESTAURANTS_EVENTS_SUCCESS, UPDATE_RESTAURANT_FAILURE, UPDATE_RESTAURANT_REQUEST, UPDATE_RESTAURANT_STATUS_FAILURE, UPDATE_RESTAURANT_STATUS_REQUEST, UPDATE_RESTAURANT_STATUS_SUCCESS, UPDATE_RESTAURANT_SUCCESS } from "./ActionType"


export const getAllRestaurantsAction=(token)=>{
    return async (dispatch)=>{
        dispatch({type:GET_ALL_RESTAURANTS_REQUEST});
        try {
            const {data} = await api.get("/api/restaurants",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            dispatch({type:GET_ALL_RESTAURANTS_SUCCESS,payload:data})
            console.log("From Restaurant State : All restaurants",data);
            
        } catch (error) {

            dispatch({type:GET_ALL_RESTAURANTS_FAILURE,payload:error})
            
        }
    }
}

export const getRestaurantById = (reqData) => {
    return async (dispatch) => {
      dispatch({type:GET_RESTAURANT_BY_ID_REQUEST});
      try {
        const response = await api.get(`/api/restaurants/${reqData.restaurantId}`, {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        });
        dispatch({type:GET_RESTAURANT_BY_ID_SUCCESS,payload:response.data});
        console.log("From Restaurant State:Restaurant By ID->",response.data)
      } catch (error) {
        console.log('error', error);
        dispatch({type:GET_RESTAURANT_BY_ID_FAILURE,payload:error.data});
      }
    };
  };

  export const getRestaurantByUserId = (jwt) => {
    return async (dispatch) => {
      dispatch({type:GET_RESTAURANT_BY_USER_ID_REQUEST});
      try {
        const {data} = await api.get(`/api/admin/restaurants/user`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        console.log("From Restaurant State :Restaurnants by user id"+data);
        dispatch({type:GET_RESTAURANT_BY_USER_ID_SUCCESS,payload:data});

        
      } catch (error) {
        console.log('error', error);
        dispatch({type:GET_RESTAURANT_BY_USER_ID_FAILURE,payload:error});
      }
    };
  };

  export const createRestaurant = (reqData) => {
    return async (dispatch) => {
      dispatch({type:CREATE_RESTAURANT_REQUEST});
      try {
        const {data} = await api.post(`/api/admin/restaurants/user`,reqData.data, {
          headers: {
            Authorization: `Bearer ${reqData.token}`,
          },
        });

        console.log("Creating  restaurnants"+data);
        dispatch({type:CREATE_RESTAURANT_SUCCESS,payload:data});

        
      } catch (error) {
        console.log('error', error);
        dispatch({type:CREATE_RESTAURANT_FAILURE,payload:error});
      }
    };
  };


  export const updateRestaurant = (reqData) => {
    return async (dispatch) => {
      dispatch({type:UPDATE_RESTAURANT_REQUEST});
      try {
        const {data} = await api.put(`/api/admin/restaurants/${reqData.restaurantId}`,reqData.restaurantData, {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        });

        console.log("Getting restaurnants by user id"+data);
        dispatch({type:UPDATE_RESTAURANT_SUCCESS,payload:data});

        
      } catch (error) {
        console.log('error', error);
        dispatch({type:UPDATE_RESTAURANT_FAILURE,payload:error});
      }
    };
  };

  export const deleteRestaurant = (reqData) => {
    return async (dispatch) => {
      dispatch({type:DELETE_RESTAURANT_REQUEST});
      try {
        const {data} = await api.delete(`/api/admin/restaurants/${reqData.restaurantId}`, {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        });

        console.log("Getting restaurnants by user id"+data);
        dispatch({type:DELETE_RESTAURANT_SUCCESS,payload:data});

        
      } catch (error) {
        console.log('error', error);
        dispatch({type:DELETE_RESTAURANT_FAILURE,payload:error});
      }
    };
  };


  export const updateRestaurantStatus = (reqData) => {
    return async (dispatch) => {
      dispatch({type:UPDATE_RESTAURANT_STATUS_REQUEST});
      try {
        const {data} = await api.put(`/api/admin/restaurants/${reqData.restaurantId}/status`,{}, {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        });

        console.log("Updated restuarant status"+data);
        dispatch({type:UPDATE_RESTAURANT_STATUS_SUCCESS,payload:data});

        
      } catch (error) {
        console.log('error', error);
        dispatch({type:UPDATE_RESTAURANT_STATUS_FAILURE,payload:error});
      }
    };
  };


  export const createEventAction = ({restaurantId,jwt}) => {
    return async (dispatch) => {
      dispatch({type:CREATE_EVENTS_REQUEST});
      try {
        const {data} = await api.post(`/api/admin/events/restaurants/${restaurantId}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        console.log("Creating event"+data);
        dispatch({type:CREATE_EVENTS_SUCCESS,payload:data});

        
      } catch (error) {
        console.log('error', error);
        dispatch({type:CREATE_EVENTS_FAILURE,payload:error});
      }
    };
  };

  export const getALlEvents = ({jwt}) => {
    return async (dispatch) => {
      dispatch({type:GET_ALL_EVENTS_REQUEST});
      try {
        const {data} = await api.get(`/api/events`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        console.log("Getting all  event"+data);
        dispatch({type:GET_ALL_EVENTS_SUCCESS,payload:data});

        
      } catch (error) {
        console.log('error', error);
        dispatch({type:GET_ALL_EVENTS_FAILURE,payload:error});
      }
    };
  };

  export const deleteEvent = ({eventId,jwt}) => {
    return async (dispatch) => {
      dispatch({type:DELETE_EVENTS_REQUEST});
      try {
        const {data} = await api.delete(`/api/admin/events/${eventId}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        console.log("Deleting events"+data);
        dispatch({type:DELETE_EVENTS_SUCCESS,payload:eventId});

        
      } catch (error) {
        console.log('error', error);
        dispatch({type:DELETE_EVENTS_SUCCESS,payload:error});
      }
    };
  };

  export const getRestaurantsEvents = ({restaurantId,jwt}) => {
    return async (dispatch) => {
      dispatch({type:GET_RESTAURANTS_EVENTS_REQUEST});
      try {
        const {data} = await api.get(`/api/admin/events/restaurants/${restaurantId}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        console.log("Creating event"+data);
        dispatch({type:GET_RESTAURANTS_EVENTS_SUCCESS,payload:data});

        
      } catch (error) {
        console.log('error', error);
        dispatch({type:GET_RESTAURANTS_EVENTS_FAILURE,payload:error});
      }
    };
  };

  export const createCategoryAction = ({reqData,jwt}) => {
    return async (dispatch) => {
      dispatch({type:CREATE_CATEGORY_REQUEST});
      try {
        const {data} = await api.post(`/api/admin/category`,reqData, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        console.log("Creating category"+data);
        dispatch({type:CREATE_CATEGORY_SUCCESS,payload:data});

        
      } catch (error) {
        console.log('error', error);
        dispatch({type:CREATE_CATEGORY_FAILURE,payload:error});
      }
    };
  };

  export const getRestaurantsCategory= ({jwt, restaurantId}) => {
    return async (dispatch) => {
      dispatch({ type: GET_RESTAURANTS_CATEGORY_REQUEST });
      try {
        const { data } = await api.get(`/api/admin/category/restaurant/${restaurantId}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,  // Ensure the token is correctly passed here
          },
        });
  
        console.log("Getting category" + JSON.stringify(data));
        dispatch({ type: GET_RESTAURANTS_CATEGORY_SUCCESS, payload: data });
      } catch (error) {
        console.log('error', error);  // Logs the error to better understand it
        dispatch({ type: GET_RESTAURANTS_CATEGORY_FAILURE, payload: error });
      }
    };
  };
  