import { config } from '../config/config.js';
import { calculateRenewableFactor } from './calculateEnergy.js';

export function calculateScore(dataCenter, urgency, timestamp) {
    const { RE, CL, C, D } = dataCenter;
    const { weights, maxDistance } = config;

    const renewableFactor = calculateRenewableFactor(RE, timestamp);

    const scoreComponents = {
        renewableEnergyScore: weights.RE * (renewableFactor / 100),
        currentLoadScore: weights.CL * (CL / C),
        distanceScore: weights.D * (D / maxDistance),
        urgencyScore: weights.U * urgency,
    };

    const totalScore = scoreComponents.renewableEnergyScore - scoreComponents.currentLoadScore - scoreComponents.distanceScore + scoreComponents.urgencyScore;

    return { totalScore, scoreComponents };
}

export function calculateEnergyUsage(dataCenter, timestamp) {
    const { CL } = dataCenter; // Current Load represents the total energy usage in kWh
    const renewableFactor = calculateRenewableFactor(dataCenter.RE, timestamp);
    const renewableEnergyKWh = CL * (renewableFactor / 100);
    const nonRenewableEnergyKWh = CL - renewableEnergyKWh;

    return {
        renewableEnergyKWh,
        nonRenewableEnergyKWh,
        totalEnergyKWh: CL
    };
}
