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
      for (const key in ah) {
        config.headers[key] = ah[key];
      }
    });
  }
  return config;
};
