import axios from 'axios';

const API_URL = "https://ittryhdkqoxnlokfuwet.supabase.co/rest/v1/treatments";
const API_KEY = "sb_publishable_74EguD9f5-AWfGf-TYDcjg_W16BaZpG";

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
};

export const treatmentsAPI = {
    async fetchAll() {
        const response = await axios.get(API_URL, { headers });
        return response.data;
    },
    async getById(id) {
        const response = await axios.get(`${API_URL}?id=eq.${id}`, { headers });
        return response.data[0] || null;
    },
    async create(data) {
        const response = await axios.post(API_URL, data, { headers });
        return response.data;
    },
    async update(id, data) {
        const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, {
            headers: { ...headers, Prefer: "return=representation" },
        });
        return response.data;
    },
    async delete(id) {
        await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
    },
};
