import axios from "axios";

const API_URL = "http://localhost:9000/api/auth";

const login = async (credentials) => {
    const { data } = await axios.post(`${API_URL}/login`, credentials);
    localStorage.setItem("token", data.token);
};

const register = async (userData) => {
    await axios.post(`${API_URL}/register`, userData);
};

const getUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No Token found");

    try {
        const { data } = await axios.get(`${API_URL}/me`, {
            headers: {
                Authorization: token,
            },
        });
        return data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            alert("Sessing expired please log in again"); // sessing expired show alert in the browser
            localStorage.removeItem("token");
            window.location.href = "/login"; // connect to the login page 
        } else {
            throw error;
        }
    }
};

export default { login,register, getUserData };