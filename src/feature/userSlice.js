import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  checking: true,
  userDetail: [],
  sportDataCommingFromApi: null,
  upComingDataCommingFromApi: null,
  liveDataCommingFromApi: null,
  completeDataCommingFromApi: null,
  myAccountDataCommingFromApi: null,
  txHistoryDataCommingFromApi: null,
  supportChatDataCommingFromApi: null,
  knowMoreDataCommingFromApi: null,
  errorPopUp: false,
  userAccountNotExist: null,
  userAccountExist: null,
  propsDataCommingFromApi: [],
  propsApiCallComplete: false,
  eachMyPropDataCommingFromApi: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserInfo: (state, action) => {
      state.user = action.payload;
    },
    removeUserInfo: (state) => {
      state.user = null;
    },
    startChecking: (state) => {
      state.checking = true;
    },
    endChecking: (state) => {
      state.checking = false;
    },
    addUserDetail: (state, action) => {
      state.userDetail = action.payload;
    },
    addSportDataCommingFromApi: (state, action) => {
      state.sportDataCommingFromApi = action.payload;
    },
    addUpComingDataCommingFromApi: (state, action) => {
      state.upComingDataCommingFromApi = action.payload;
    },
    addLiveDataCommingFromApi: (state, action) => {
      state.liveDataCommingFromApi = action.payload;
    },
    addCompleteDataCommingFromApi: (state, action) => {
      state.completeDataCommingFromApi = action.payload;
    },
    addMyAccountDataCommingFromApi: (state, action) => {
      state.myAccountDataCommingFromApi = action.payload;
    },
    addTxHistoryDataCommingFromApi: (state, action) => {
      state.txHistoryDataCommingFromApi = action.payload;
    },
    addSupportChatDataCommingFromApi: (state, action) => {
      state.supportChatDataCommingFromApi = action.payload;
    },
    addKnowMoreDataCommingFromApi: (state, action) => {
      state.knowMoreDataCommingFromApi = action.payload;
    },
    addEmailPrefrenceDataCommingFromApi: (state, action) => {
      state.emailPrefrenceDataCommingFromApi = action.payload;
    },
    setErrorPopUp: (state, action) => {
      if (action.payload === "false") {
        state.errorPopUp = false;
      } else {
        state.errorPopUp = true;
      }
    },
    setUserAccountNotExist: (state, action) => {
      state.userAccountNotExist = action.payload;
    },

    setUserAccountExist: (state, action) => {
      state.userAccountExist = action.payload;
    },
    addPropsDataCommingFromApi: (state, action) => {
      const data = [...state.propsDataCommingFromApi];
      let checkArray = data.filter((each) => {
        return each.sportCode !== action.payload.sportCode;
      });
      if (data.length === 0) {
        data.push(action.payload);
        state.propsDataCommingFromApi = [...data];
      } else if (checkArray.length === data.length) {
        data.push(action.payload);
        state.propsDataCommingFromApi = [...data];
      } else {
        checkArray.push(action.payload);
        state.propsDataCommingFromApi = [...checkArray];
      }
    },
    setPropsApiCallComplete: (state, action) => {
      state.propsApiCallComplete = action;
    },
    addEachMyPropDataCommingFromApi: (state, action) => {
      state.eachMyPropDataCommingFromApi = action;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addUserInfo,
  removeUserInfo,
  startChecking,
  endChecking,
  addUserDetail,
  addSportDataCommingFromApi,
  addUpComingDataCommingFromApi,
  addLiveDataCommingFromApi,
  addCompleteDataCommingFromApi,
  addMyAccountDataCommingFromApi,
  addTxHistoryDataCommingFromApi,
  addSupportChatDataCommingFromApi,
  addKnowMoreDataCommingFromApi,
  addEmailPrefrenceDataCommingFromApi,
  setErrorPopUp,
  setUserAccountNotExist,
  setUserAccountExist,
  addPropsDataCommingFromApi,
  setPropsApiCallComplete,
  addEachMyPropDataCommingFromApi,
} = userSlice.actions;

export default userSlice.reducer;
