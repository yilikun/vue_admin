import request from "@/utils/request";
import crypto from "crypto-js";

export function loginByUsername(username, password) {
  // console.log('username: ', username);
  password = crypto.MD5(password).toString();
  console.log("password: ", password);
  const data = {
    grant_type: "password",
    client_id: "010001",
    client_secret: "Nc12MUR6NBnoqyQMidu+iSKW/7waVWu4vC93ihRkyw8=",
    username,
    password
  };
  console.log("data: ", data);
  return request({
    url: "/v1/admin/login",
    method: "post",
    data
  });
}

export function logout() {
  return request({
    url: "/login/logout",
    method: "post"
  });
}

export function getUserInfo(token) {
  return request({
    url: "/v1/admin/user",
    method: "get",
    params: { token }
  });
}
