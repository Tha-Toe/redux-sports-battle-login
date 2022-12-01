import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fs: {
    xxxs: "8px",
    xxs: "10px",
    xs: "12px",
    small: "14px",
    normal: "16px",
    large: "18px",
    x_large: "20px",
    xx_large: "22px",
    xxx_large: "24px",
    mega: "32px",
  },
  goSignUpPage: false,
  user: null,
  checking: true,
  userDetail: [],
  sportDataCommingFromApi: [],
  upComingDataCommingFromApi: null,
  liveDataCommingFromApi: null,
  completeDataCommingFromApi: null,
  myAccountDataCommingFromApi: null,
  idpverified: false,
  txHistoryDataCommingFromApi: [],
  supportChatDataCommingFromApi: null,
  knowMoreDataCommingFromApi: null,
  errorPopUp: false,
  userAccountNotExist: null,
  userAccountExist: null,
  propsDataCommingFromApi: [],
  propsApiCallComplete: false,
  eachMyPropDataCommingFromApi: null,
  callClickSportApiFinish: true,
  noProjection: null,
  addressFromApi: [],
  propCartData: null,
  currentSportDataRedux: null,
  urlData: [],
  depositData: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setGoSignUpPage: (state, action) => {
      state.goSignUpPage = action.payload;
    },
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
      //console.log(action.payload);
      let newArray = [...action.payload];
      state.sportDataCommingFromApi = newArray;
    },
    addUpComingDataCommingFromApi: (state, action) => {
      state.upComingDataCommingFromApi = action.payload;
    },
    addUpComingDataCommingFromApiNewPage: (state, action) => {
      let newArray = action.payload.props;
      let combineArray = [
        ...state.upComingDataCommingFromApi.props,
        ...newArray,
      ];
      state.upComingDataCommingFromApi.props = combineArray;
    },
    addLiveDataCommingFromApi: (state, action) => {
      state.liveDataCommingFromApi = action.payload;
    },
    addLiveDataCommingFromApiNewPage: (state, action) => {
      let newArray = action.payload.props;
      let combineArray = [...state.liveDataCommingFromApi.props, ...newArray];
      state.liveDataCommingFromApi.props = combineArray;
    },
    addCompleteDataCommingFromApi: (state, action) => {
      state.completeDataCommingFromApi = action.payload;
    },
    addCompleteDataCommingFromApiNewPage: (state, action) => {
      let newArray = action.payload.props;
      let combineArray = [
        ...state.completeDataCommingFromApi.props,
        ...newArray,
      ];
      state.completeDataCommingFromApi.props = combineArray;
    },
    addMyAccountDataCommingFromApi: (state, action) => {
      state.myAccountDataCommingFromApi = action.payload;
    },
    AddIdpverified: (state, action) => {
      state.idpverified = action.payload;
    },
    addTxHistoryDataCommingFromApi: (state, action) => {
      state.txHistoryDataCommingFromApi = action.payload;
    },
    addTxHistoryDataCommingFromApiNewPage: (state, action) => {
      let newArray = action.payload;
      let combineArray = [...state.txHistoryDataCommingFromApi, ...newArray];
      state.txHistoryDataCommingFromApi = combineArray;
      console.log(combineArray);
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
    removePropsDataCommingFromApi: (state, action) => {
      state.propsDataCommingFromApi = [];
    },
    setPropsApiCallComplete: (state, action) => {
      // console.log(action.payload);
      state.propsApiCallComplete = action.payload;
    },
    addEachMyPropDataCommingFromApi: (state, action) => {
      state.eachMyPropDataCommingFromApi = action.payload;
    },
    setCallClickSportApiFinish: (state, action) => {
      state.callClickSportApiFinish = action.payload;
    },
    setNoProjection: (state, action) => {
      state.noProjection = action.payload;
    },
    setAddressFromApi: (state, action) => {
      // console.log(action.payload);
      state.addressFromApi = action.payload;
    },
    addPropCartData: (state, action) => {
      state.propCartData = action.payload;
    },
    addCurrentSportDataRedux: (state, action) => {
      state.currentSportDataRedux = action.payload;
    },
    addUrlData: (state, action) => {
      state.urlData = action.payload;
    },
    addDepositData: (state, action) => {
      state.depositData = action.payload;
    },
    logoutUser: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  setGoSignUpPage,
  addUserInfo,
  removeUserInfo,
  startChecking,
  endChecking,
  addUserDetail,
  addSportDataCommingFromApi,
  addUpComingDataCommingFromApi,
  addUpComingDataCommingFromApiNewPage,
  addLiveDataCommingFromApiNewPage,
  addLiveDataCommingFromApi,
  addCompleteDataCommingFromApi,
  addCompleteDataCommingFromApiNewPage,
  addMyAccountDataCommingFromApi,
  addTxHistoryDataCommingFromApi,
  addTxHistoryDataCommingFromApiNewPage,
  addSupportChatDataCommingFromApi,
  addKnowMoreDataCommingFromApi,
  addEmailPrefrenceDataCommingFromApi,
  setErrorPopUp,
  setUserAccountNotExist,
  setUserAccountExist,
  addPropsDataCommingFromApi,
  setPropsApiCallComplete,
  addEachMyPropDataCommingFromApi,
  removePropsDataCommingFromApi,
  setCallClickSportApiFinish,
  setNoProjection,
  AddIdpverified,
  setAddressFromApi,
  addPropCartData,
  addCurrentSportDataRedux,
  addUrlData,
  addDepositData,
  logoutUser,
} = userSlice.actions;

export default userSlice.reducer;
