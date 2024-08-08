import { config } from '../config/config.js';

function isEnergyAvailable(timestamp, startHour, endHour) {
    const date = new Date(timestamp);
    const hours = date.getHours();
    return hours >= startHour && hours < endHour;
}

export function calculateRenewableFactor(RE, timestamp) {
    let renewableFactor = RE;


    if (!isEnergyAvailable(timestamp, config.solarPeakHours.start, config.solarPeakHours.end)) {
        renewableFactor *= 0.5;
    }

    if (!isEnergyAvailable(timestamp, config.windAvailability.start, config.windAvailability.end)) {
        renewableFactor *= 0.8;
    }

    if (!isEnergyAvailable(timestamp, config.hydroAvailability.start, config.hydroAvailability.end)) {
        renewableFactor *= 0.9;
    }

    return renewableFactor;
}

export function calculateCarbonFootprint(nonRenewableEnergyKWh) {
    return nonRenewableEnergyKWh * config.carbonFootprintPerKWh;
}
