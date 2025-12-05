import axios from "axios";

const API_BASE_URL = 'http://localhost:5196';

export const apiClient = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    timeout: 10000,
    withCredentials: true,
    headers: {'Content-Type': 'application/json',},
})

