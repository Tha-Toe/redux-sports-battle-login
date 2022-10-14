var env = "prod";
var endPoint = "https://api.onecricket.app";
var ocApiGatewayGames = endPoint + "/game/";
var ocApiGatewayusers = endPoint + "/user/";
var ocApiGatewayPayment = endPoint + "/payment/";
var ocApiGatewayContests = endPoint + "/contest/";
var ocApiGatewayCommon = endPoint + "/common/";





//all urls

//get user details by id
export const getUserInfo = ocApiGatewayusers + 'id/{userId}';

//get all sports
export const getAllSports = ocApiGatewayCommon + 'sports';

//get props of sport
export const getPropsSport = ocApiGatewayGames + 'props';

//get myprops of user
export const getMyProps = ocApiGatewayCommon + 'user/props/{userId}/{status}';