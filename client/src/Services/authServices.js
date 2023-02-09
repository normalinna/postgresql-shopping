import instance from "./api";

export const authServices = {
  async signIn(payload) {
    return await instance.post("/auth/login", payload);
  }
}