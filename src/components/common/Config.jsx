export const apiUrl = import.meta.env.VITE_API_URL;

export const token = () => {
  const userInfo = localStorage.getItem("ZorvynFinanceUserInfo");
  const data = JSON.parse(userInfo);
  return data.token;
};
