const BASE_URL = "http://127.0.0.1:5000";

// SIGNUP
export const signupUser = async (email: string, password: string) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return res.json();
};

// SEND OTP
export const sendOTP = async (email: string) => {
  const res = await fetch(`${BASE_URL}/send-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  return res.json();
};

// VERIFY OTP
export const verifyOTP = async (email: string, otp: string) => {
  const res = await fetch(`${BASE_URL}/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, otp }),
  });

  return res.json();
};