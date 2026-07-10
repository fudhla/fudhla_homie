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
    /**
     * Mendaftarkan user baru dengan default CRM:
     * role: 'member', tier: 'Bronze', points: 0
     */
    async registerUser(data) {
        const payload = {
            ...data,
            role: data.role || 'member',
            tier: data.tier || 'Bronze',
            points: data.points ?? 0,
        };
        const response = await axios.post(API_URL, payload, { headers });
        return response.data;
    },
    async getUserByEmail(email) {
        const response = await axios.get(`${API_URL}?email=eq.${email}`, { headers });
        return response.data;
    },
    /** Ambil semua user (untuk dashboard admin & member list) */
    async getAllUsers() {
        const response = await axios.get(API_URL, {
            headers,
            params: { order: 'created_at.desc' },
        });
        return response.data;
    },
    async deleteUser(id) {
        await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
    }
};