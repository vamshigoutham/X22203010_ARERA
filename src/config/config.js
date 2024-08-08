export const config = {
    weights: {
        RE: 0.4, // Importance of renewable energy
        CL: 0.3, // Importance of current load
        D: 0.2,  // Importance of distance
        U: 0.1   // Importance of urgency
    },
    maxDistance: 70, // Maximum possible distance for normalization
    solarPeakHours: { start: 6, end: 18 }, // Solar power availability from 6 AM to 6 PM
    windAvailability: { start: 0, end: 24 }, // Assuming wind power is available all day
    hydroAvailability: { start: 0, end: 24 }, // Assuming hydro power is available all day
    carbonFootprintPerKWh: 0.5 // Example value in kg CO2 per kWh
};
