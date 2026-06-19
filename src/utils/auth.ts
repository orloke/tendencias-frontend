export const setAuthCookie = (token: string) => {
  document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Strict; Secure`;
};

export const redirectToDashboard = () => {
  window.location.href = "/dashboard";
};
