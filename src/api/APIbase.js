var env = "prod";
var endPoint = "https://api.onecricket.app";
var ocApiGatewayGames = endPoint + "/game/";
var ocApiGatewayusers = endPoint + "/user/";
var ocApiGatewayPayment = endPoint + "/payment/";
var ocApiGatewayContests = endPoint + "/contest/";
var ocApiGatewayCommon = endPoint + "/common/";

//all urls

//get user details by id
export const getUserInfo = ocApiGatewayusers + "id/{userId}";

//get all sports
export const getAllSports = ocApiGatewayCommon + "sports";

//get props of sport
export const getPropsSport = ocApiGatewayGames + "props";

//get myprops of user
export const getMyProps = ocApiGatewayCommon + "user/props/{userId}/{status}";

//get each prop details in myprops
export const getEachProp = ocApiGatewayCommon + "user/props/{userId}/{status}";

//withdraw prop less than 2 mins
export const withdrawProp = ocApiGatewayContests + "withdraw/id/undefined";

//get FPS per sport
export const getFpsSport = ocApiGatewayCommon + "fps/{sportcode}";

//get fantasy points breakdown per prop entry

export const getFantasyPoints = ocApiGatewayGames + "props/fps/{propId}";

//get user addresses

export const getUserAddress = ocApiGatewayPayment + "user/{userId}/address";

//add user new address

export const addUserAddress = ocApiGatewayPayment + "address/add";

// get states

export const getStates = ocApiGatewayPayment + "states";

// verify identity

export const addIdentityVerify = ocApiGatewayPayment + "user/verify/age";

//submitProjections
export const submitProjections = ocApiGatewayContests + "join/v2/id/undefined";

//get Faq
export const getFaq = ocApiGatewayCommon + "faq/all";

//get social media urls
export const getUrls = ocApiGatewayCommon + "app/urls";

//get referal history
export const getRefHistory = ocApiGatewayusers + "id/{userId}/referrals";

//get add phone number
export const getAddPhone = ocApiGatewayusers + "phone/{phonenumber}";

//post send sms
export const postSendSms = ocApiGatewayPayment + "sms/new";

//post verify sms
export const postVerifySms = ocApiGatewayPayment + "sms/verify";

//get tx history
export const getTxHistory = ocApiGatewayusers + "id/{userId}/txn/{pageNo}";

//get withdraw history
export const getWithdrawHistory = ocApiGatewayusers + "id/{userId}/withdrawals";

//post redeem referal code
export const postRedeemCode = ocApiGatewayusers + "redeem/code";

//get withdraw cash
export const getWithdrawCash = ocApiGatewayPayment + "options/Withdraw";

//get withdraw method
export const getWithdrawMethod =
  ocApiGatewayPayment + "options/withdraw/{amount}";

//get deposit cash
export const getDepositCash = ocApiGatewayPayment + "options/Payment";

//post deposit
export const postDeposit = ocApiGatewayPayment + "/session/new";
