import fetch, { Headers } from 'node-fetch';
import { Feature } from '../entities/azure.types';

const MANDATORY_VARIABLES = [
  'ATM_AZURE_ORGANISATION',
  'ATM_AZURE_PROJECT',
  'ATM_AZURE_API_TOKEN',
];

const validateEnvironmentVariables = () => {
  for (const variable of MANDATORY_VARIABLES) {
    if (!process.env[variable]) {
      console.error(`${variable} is mandatory but is not set.`);
      return false;
    }
  }
  return true;
};

export const fetchFeature = async (featureId: string): Promise<Feature[]> => {
  if (!validateEnvironmentVariables()) {
    return [];
  }

  const apiTokenBase64 = Buffer.from(
    `:${process.env.ATM_AZURE_API_TOKEN}`
  ).toString('base64');

  try {
    const url = `https://analytics.dev.azure.com/${process.env.ATM_AZURE_ORGANISATION}/${process.env.ATM_AZURE_PROJECT}/_odata/v2.0/WorkItems?$select=WorkItemId,Title,State,WorkItemType&$expand=Children($select=WorkItemId,Title,State,Effort,RemainingWork,WorkItemType)&$filter=WorkItemId eq ${featureId}`;
    const headers = new Headers();

    headers.append('Authorization', `Basic ${apiTokenBase64}`);
    const response = await fetch(url, {
      headers,
    });

    const data: { value: Feature[] } = (await response.json()) as {
      value: Feature[];
    };

    if (!data?.value?.length) {
      throw new Error(`Feature ${featureId} not found`);
    }

    return data.value;
  } catch (error) {
    console.warn(error);
  }

  return [];
};
