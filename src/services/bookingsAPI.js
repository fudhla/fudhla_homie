import axios from 'axios';

const BOOKINGS_URL = "https://ittryhdkqoxnlokfuwet.supabase.co/rest/v1/bookings";
const USERS_URL = "https://ittryhdkqoxnlokfuwet.supabase.co/rest/v1/users";
const API_KEY = "sb_publishable_74EguD9f5-AWfGf-TYDcjg_W16BaZpG";

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
};

// Poin loyalty yang didapat pasien per treatment
const POINTS_PER_TREATMENT = 50;

export const bookingsAPI = {
    async fetchAll() {
        const response = await axios.get(BOOKINGS_URL, {
            headers,
            params: { order: "booking_date.desc" },
        });
        return response.data;
    },
    async getByUserId(userId) {
        const response = await axios.get(`${BOOKINGS_URL}?user_id=eq.${userId}`, {
            headers,
            params: { order: "booking_date.desc" },
        });
        return response.data;
    },
    async create(data) {
        const response = await axios.post(BOOKINGS_URL, data, { headers });
        return response.data;
    },
    async updateStatus(id, newStatus) {
        const response = await axios.patch(
            `${BOOKINGS_URL}?id=eq.${id}`,
            { status: newStatus },
            { headers: { ...headers, Prefer: "return=representation" } }
        );
        return response.data;
    },

    /**
     * Mengubah status booking + secara otomatis menambah GlowPoints
     * ke akun pasien jika status diubah menjadi 'Selesai'
     */
    async completeBooking(bookingId) {
        // 1. Ambil data booking
        const bookingRes = await axios.get(`${BOOKINGS_URL}?id=eq.${bookingId}`, { headers });
        const booking = bookingRes.data[0];
        if (!booking) throw new Error("Booking tidak ditemukan");

        // 2. Update status jadi 'Selesai'
        await axios.patch(
            `${BOOKINGS_URL}?id=eq.${bookingId}`,
            { status: "Selesai" },
            { headers }
        );

        // 3. Tambah poin ke user terkait
        const userRes = await axios.get(`${USERS_URL}?id=eq.${booking.user_id}`, { headers });
        const user = userRes.data[0];
        if (user) {
            const currentPoints = user.points || 0;
            const newPoints = currentPoints + POINTS_PER_TREATMENT;

            // Update tier otomatis berdasarkan akumulasi poin
            let newTier = "Bronze";
            if (newPoints >= 500) newTier = "Gold";
            else if (newPoints >= 200) newTier = "Silver";

            await axios.patch(
                `${USERS_URL}?id=eq.${user.id}`,
                {
                    points: newPoints,
                    tier: newTier,
                },
                { headers }
            );
        }

        return { success: true, pointsAdded: POINTS_PER_TREATMENT };
    },

    async delete(id) {
        await axios.delete(`${BOOKINGS_URL}?id=eq.${id}`, { headers });
    },
};
