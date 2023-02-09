import instance from "./api";

export const cartServices = {
  async getProductsInCart(payload) {
    return await instance.post("/cart", payload)
  },
  async addProductToCart(payload) {
    return await instance.post("/cart/add", payload)
  }
}
