import axios from 'axios';

const API_URL = "https://ittryhdkqoxnlokfuwet.supabase.co/rest/v1/users";
const API_KEY = "sb_publishable_74EguD9f5-AWfGf-TYDcjg_W16BaZpG";

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
};

export const usersAPI = {
    async fetchUsers() {
        const response = await axios.get(API_URL, { headers });
        return response.data;
    },
    async registerUser(data) {
        const response = await axios.post(API_URL, data, { headers });
        return response.data;
    },
    async getUserByEmail(email) {
        const response = await axios.get(`${API_URL}?email=eq.${email}`, { headers });
        return response.data;
    },
    async deleteUser(id) {
        await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
    }
};