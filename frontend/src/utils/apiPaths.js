export const server = import.meta.env.VITE_BACKEND_URL;


export const API_PATHS = {
    EXPERIENCE: {
        GET: '/experiences',
        GETBYID:(id)=>`/experiences/${id}`
    },
    PROMO: {
        VALIDATE: '/promo/validate',
    },
    BOOKING:{
        CREATE:'/booking'
    }
}