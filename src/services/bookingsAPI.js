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

const LOCAL_KEY = "glowcare_local_bookings";

function getLocalBookings() {
    try {
        return JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    } catch { return []; }
}

function saveLocalBookings(bookings) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(bookings));
}

export const bookingsAPI = {
    async fetchAll() {
        try {
            const response = await axios.get(BOOKINGS_URL, {
                headers,
                params: { order: "booking_date.desc" },
            });
            return response.data;
        } catch {
            console.warn("Gagal fetch bookings dari Supabase, pakai data lokal");
            return getLocalBookings();
        }
    },
    async getByUserId(userId) {
        try {
            const response = await axios.get(`${BOOKINGS_URL}?user_id=eq.${userId}`, {
                headers,
                params: { order: "booking_date.desc" },
            });
            const apiBookings = response.data || [];
            // Gabung dengan booking lokal milik user ini, hindari duplikat
            const local = getLocalBookings().filter(b => b.user_id === userId);
            const apiIds = new Set(apiBookings.map(b => b.id));
            const uniqueLocal = local.filter(b => !apiIds.has(b.id));
            return [...apiBookings, ...uniqueLocal];
        } catch {
            console.warn("Gagal fetch bookings dari Supabase, pakai data lokal");
            return getLocalBookings().filter(b => b.user_id === userId);
        }
    },
    async create(data) {
        // Tambah timestamp & id lokal
        const localData = {
            ...data,
            id: Date.now(),
            created_at: new Date().toISOString(),
        };

        try {
            const response = await axios.post(BOOKINGS_URL, data, { headers });
            // Supaya konsisten, simpan juga lokal
            const lokal = getLocalBookings();
            lokal.unshift(localData);
            saveLocalBookings(lokal);
            return response.data;
        } catch (err) {
            console.warn("Supabase INSERT gagal, simpan booking ke localStorage:", err.message);
            // Fallback: simpan ke localStorage
            const lokal = getLocalBookings();
            lokal.unshift(localData);
            saveLocalBookings(lokal);
            return { success: true, local: true, id: localData.id };
        }
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

    /**
     * Update payment method & status booking, langsung ubah status jadi Dikonfirmasi
     */
    async updatePayment(id, data) {
        try {
            const response = await axios.patch(
                `${BOOKINGS_URL}?id=eq.${id}`,
                {
                    payment_method: data.payment_method,
                    payment_status: data.payment_status || "Lunas",
                    status: data.status || "Dikonfirmasi",
                },
                { headers: { ...headers, Prefer: "return=representation" } }
            );
            
            // Update juga di localStorage
            const lokal = getLocalBookings();
            const idx = lokal.findIndex(b => b.id === id);
            if (idx !== -1) {
                lokal[idx].payment_method = data.payment_method;
                lokal[idx].payment_status = data.payment_status || "Lunas";
                lokal[idx].status = data.status || "Dikonfirmasi";
                saveLocalBookings(lokal);
            }
            
            return response.data;
        } catch (err) {
            console.warn("Gagal update payment ke Supabase, simpan lokal:", err.message);
            // Fallback: update localStorage
            const lokal = getLocalBookings();
            const idx = lokal.findIndex(b => b.id === id);
            if (idx !== -1) {
                lokal[idx].payment_method = data.payment_method;
                lokal[idx].payment_status = data.payment_status || "Lunas";
                lokal[idx].status = data.status || "Dikonfirmasi";
                saveLocalBookings(lokal);
            }
            return { success: true, local: true };
        }
    },

    async delete(id) {
        await axios.delete(`${BOOKINGS_URL}?id=eq.${id}`, { headers });
    },
};
