import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  checking: true,
  userDetail: [],
  propsDataCommingFromApi: null,
  upComingDataCommingFromApi: null,
  liveDataCommingFromApi: null,
  completeDataCommingFromApi: null,
  myAccountDataCommingFromApi: null,
  txHistoryDataCommingFromApi: "data",
  supportChatDataCommingFromApi: null,
  knowMoreDataCommingFromApi: null,
  errorPopUp: false,
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
    addPropsDataCommingFromApi: (state, action) => {
      state.propsDataCommingFromApi = action.payload;
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
  },
});

// Action creators are generated for each case reducer function
export const {
  addUserInfo,
  removeUserInfo,
  startChecking,
  endChecking,
  addUserDetail,
  addPropsDataCommingFromApi,
  addUpComingDataCommingFromApi,
  addLiveDataCommingFromApi,
  addCompleteDataCommingFromApi,
  addMyAccountDataCommingFromApi,
  addTxHistoryDataCommingFromApi,
  addSupportChatDataCommingFromApi,
  addKnowMoreDataCommingFromApi,
  addEmailPrefrenceDataCommingFromApi,
  setErrorPopUp,
} = userSlice.actions;

export default userSlice.reducer;
