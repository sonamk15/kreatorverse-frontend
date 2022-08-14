const authInitialState = {
  authToken: localStorage.getItem("token") || "",
  role: localStorage.getItem("role") || "",
};

export default authInitialState;
