import { promises as fs } from 'fs';
import { readCapabilityFile, fetchFiles, getExternalAPIs } from './fetchAndProcessData';

const generateSummary = async () => {
    const capabilityData = await readCapabilityFile();

    if (capabilityData) {
        // Fetch capability and feature files
        for (const capability of capabilityData.capability.configExtension.schema) {
            await fetchFiles(capability.openApi.file, "capability", capability.name);
        }

        for (const feature of capabilityData.features.configExtension.schema) {
            await fetchFiles(feature.asyncApi.file, "feature", feature.name);
        }

        const externalAPIs = {
            capability: await getExternalAPIs("capability"),
            feature: await getExternalAPIs("feature")
        };

        await fs.writeFile('./api-summary.json', JSON.stringify(externalAPIs, null, 2));
    }
};

generateSummary();
