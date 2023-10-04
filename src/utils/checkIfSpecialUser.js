import specialUsers from "../constants/specialUsers";

export default (userEmail) =>
  specialUsers.some((v) => userEmail.toLowerCase().includes(v));
