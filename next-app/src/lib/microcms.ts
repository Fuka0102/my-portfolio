import { createClient } from 'microcms-js-sdk';
import { Work, Points } from '@/types/works';

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
    throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.MICROCMS_API_KEY) {
    throw new Error('MICROCMS_API_KEY is required');
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

function isWork (value: unknown): value is Work  {
    return typeof value === 'object' && value !== null && 'id' in value && typeof value.id === 'string';
}

function isPointsArray(value: unknown): value is Points[] {
  if(!Array.isArray(value)) {
    return false;
  };

  return value.every((item) => {
    return 'fieldId' in item && item.fieldId === 'points' && 'description' in item && typeof item.description === 'string';
  });
}

export async function getWorks() {
    const data = await client.getList<Work>({
        endpoint: 'my-works',
    });

    return data.contents.filter(isWork);
}

type WorkWithParsedPoints = Omit<Work, 'points'> & {
  points: Points[];
};

export async function getWork(slug: string) {
    const data = await client.getList<Work>({
        endpoint: 'my-works',
        queries: {
            filters: `slug[equals]${slug}`,
        },
    });
    const workData = data.contents[0];

    if (!workData || isWork(workData) === false) {
        throw new Error(`Work with slug "${slug}" not found`);
    }

    let pointsData: unknown;
    try {
        pointsData = JSON.parse(workData.points);
    } catch (error) {
        throw new Error(`Error fetching work with slug "${slug}": ${error}`);
    }

    if (!isPointsArray(pointsData)) {
        throw new Error(`Points data for work with slug "${slug}" is not in the expected format`);
    }

    const workWithPoints: WorkWithParsedPoints = {
        ...workData,
        points: pointsData,
    };

    return workWithPoints;
}