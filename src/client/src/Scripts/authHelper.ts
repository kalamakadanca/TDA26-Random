import axios from 'axios'

export async function me() {
    const res = await axios.get('http://localhost:5196/api/auth/me');

    return res.status >= 200 && res.status < 300
}

export async function logout() {
    const res = await axios.post("http://localhost:5196/api/auth/logout");
    
    return res.status === 200
}