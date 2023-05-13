import axios from "axios";
const BASE_URL = "https://cors-proxy.fringe.zone/http://api.wisey.app/api/v1/";

class AuthService {
  static async getToken() {
    const res = await axios.get(BASE_URL + "auth/anonymous", {
      params: { platform: "subscriptions" },
    });
    return res.data;
  }
}

export default AuthService;
