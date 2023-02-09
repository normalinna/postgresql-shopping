import instance from "./api";

export const productServices = {
  async getAllProducts(payload) {
    return await instance.get("/products", payload)
  }
}