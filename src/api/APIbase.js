var env = "prod";
var endPoint = "https://api.onecricket.app";
var ocApiGatewayGames = endPoint + "/game/";
var ocApiGatewayusers = endPoint + "/user/";
var ocApiGatewayPayment = endPoint + "/payment/";
var ocApiGatewayContests = endPoint + "/contest/";
var ocApiGatewayCommon = env === endPoint + "/common/";





//all urls

//get user details by id
export const getUserInfo = ocApiGatewayusers + 'id/{userId}';

//get all sports
export const getAllSports = ocApiGatewayCommon + 'sports';