import { auth } from "../firebase";
import { setAxiosConfig } from "./AxiosConfig";
const axios = require('axios').default;
//GET METHOD
export const makeGETAPICall = async (url, additionalHeaders) => {
  try {
    const idToken = await auth.currentUser.getIdToken(true);
    console.log(idToken);
    if (idToken) {
      const apiResponse = await axios.get(
        url,
        setAxiosConfig(
          idToken,
          additionalHeaders ? additionalHeaders : undefined
        )
      );
      return apiResponse;
    } else {
      throw new Error("Error occurred, please login again to continue");
    }
  } catch (error) {
    console.log("makeGETAPICall newapicall", error, url);
    throw error;
  }
};

//PUT METHOD

export const makePUTAPICall = async (url, body) => {
  try {
    const idToken = await auth.currentUser.getIdToken(true);
    if (idToken) {
      const apiResponse = await axios.put(url, body, setAxiosConfig(idToken));
      return apiResponse;
    } else {
      throw new Error("Error occurred, please login again to continue");
    }
  } catch (error) {
    throw error;
  }
};

// POST METHOD

export const makePOSTAPICall = async (url, body) => {
  try {
    const idToken = await auth.currentUser.getIdToken(true);
    var apiResponse = {};
    if (idToken) {
      apiResponse = await axios.post(url, body, setAxiosConfig(idToken));
      return apiResponse;
    } else {
      throw new Error("Error occurred, please login again to continue");
    }
  } catch (error) {
    apiResponse.status = 500;
    return apiResponse;
  }
};
