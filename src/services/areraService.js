import { calculateScore, calculateEnergyUsage } from '../utils/calculateScore.js';
import { calculateCarbonFootprint } from '../utils/calculateEnergy.js';

export function selectBestDataCenter(dataCenters, urgency, timestamp) {
    let bestDataCenter = null;
    let highestScore = -Infinity;
    let energyUsageDetails = null;
    let scoreDetails = null;

    dataCenters.forEach((dataCenter) => {
        const { totalScore, scoreComponents } = calculateScore(dataCenter, urgency, timestamp);
        if (totalScore > highestScore) {
            highestScore = totalScore;
            bestDataCenter = dataCenter;
            energyUsageDetails = calculateEnergyUsage(dataCenter, timestamp);
            scoreDetails = scoreComponents;
        }
    });

    const carbonFootprint = calculateCarbonFootprint(energyUsageDetails.nonRenewableEnergyKWh);

    return { bestDataCenter, highestScore, scoreDetails, energyUsageDetails, carbonFootprint };
}
