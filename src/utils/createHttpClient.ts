import ky from "ky";

export const createHttpClient = () => {
  return ky.extend({
    prefixUrl: "/api",
    timeout: 1000,
  });
};
