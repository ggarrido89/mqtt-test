export var signedIn = () => {
  let token = localStorage.getItem("TOKEN");
  return !!token;
};

export var setData = (data) => {
  localStorage.setItem("TOKEN", data.token);
  localStorage.setItem("EMAIL", data.email);
  localStorage.setItem("USER", data.user);
  localStorage.setItem("ID", data._id);
};

