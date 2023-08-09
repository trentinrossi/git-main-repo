import { promises as fs } from 'fs';
import yaml from 'js-yaml';

// Type definitions for better type safety
interface CapabilityData {
    capability: {
        configExtension: {
            schema: Array<{
                openApi: { file: string; name: string; };
            }>;
        };
    };
    features: {
        configExtension: {
            schema: Array<{
                asyncApi: { file: string; name: string; };
            }>;
        };
    };
}

interface ExternalAPI {
    path: string;
    method: string;
    description: string;
}

// Read capability.yaml
const readCapabilityFile = async (): Promise<CapabilityData | undefined> => {
    try {
        const data = await fs.readFile('path_to_capability/capability.yaml', 'utf8');
        return yaml.safeLoad(data) as CapabilityData;
    } catch (error) {
        console.error("Error reading capability.yaml:", error);
        return;
    }
};

// Fetch files from given URLs
const fetchFiles = async (url: string, folderName: string, fileName: string): Promise<void> => {
    try {
        const response = await fetch(url);
        const data = await response.text();

        await fs.writeFile(`./${folderName}/${fileName}.yaml`, data);
    } catch (error) {
        console.error(`Error fetching ${url} file:`, error);
    }
};

// Extract APIs with x-external tag
const getExternalAPIs = async (folderName: string): Promise<ExternalAPI[]> => {
    const externalAPIs: ExternalAPI[] = [];

    const files = await fs.readdir(folderName);

    for (const file of files) {
        const fileData = await fs.readFile(`${folderName}/${file}`, 'utf8');
        const parsedData = yaml.safeLoad(fileData);

        for (const [path, methods] of Object.entries(parsedData.paths)) {
            for (const [method, details] of Object.entries(methods)) {
                if (details['x-external']) {
                    externalAPIs.push({
                        path,
                        method,
                        description: details.description
                    });
                }
            }
        }
    }

    return externalAPIs;
};

export { readCapabilityFile, fetchFiles, getExternalAPIs };
