import { selectBestDataCenter } from '../services/areraService.js';

export function routeDataCenter(req, res) {
    const { urgency, dataCenters, timestamp } = req.body;
    console.log("in",dataCenters)
    if (typeof urgency !== 'number') {
        return res.status(400).send({ error: 'Urgency must be a number' });
    }

    if (!Array.isArray(dataCenters) || dataCenters.length === 0) {
        return res.status(400).send({ error: 'Data centers must be a non-empty array' });
    }

    if (!timestamp || isNaN(Date.parse(timestamp))) {
        return res.status(400).send({ error: 'Timestamp must be a valid date string' });
    }

    const { bestDataCenter, highestScore, scoreDetails, energyUsageDetails, carbonFootprint } = selectBestDataCenter(dataCenters, urgency, timestamp);

    if (bestDataCenter) {
        res.send({
            datacenterId: bestDataCenter.id,
            highestScore,
            scoreDetails,
            energyUsageDetails,
            carbonFootprint
        });
    } else {
        res.status(404).send({ error: 'No data center found' });
    }
}
