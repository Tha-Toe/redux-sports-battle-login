export const setAxiosConfig = (idToken, additionalHeaders) => {
  var config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: idToken,
      // 'app-version': DeviceInfo.getVersion(),
      // 'app-build': DeviceInfo.getBuildNumber(),
    },
  };

  //additional headers
  if (additionalHeaders) {
    additionalHeaders.forEach((ah) => {
      config.headers[ah.key] = ah.value;
    });
  }
  return config;
};
