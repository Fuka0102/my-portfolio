import { createClient } from 'microcms-js-sdk';
import { Work } from '../types/works';

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

export async function getWorks() {
    const data = await client.getList<Work>({
        endpoint: 'my-works',
    });

    return data.contents.filter(isWork);
}

export async function getWork(slug: string) {
    const data = await client.getList<Work>({
        endpoint: 'my-works',
        queries: {
            filters: `slug[equals]${slug}`,
        },
    });
    const  workData = data.contents[0];

    if (!workData || isWork(workData) === false) {
        throw new Error(`Work with slug "${slug}" not found`);
    }
    return workData;
}