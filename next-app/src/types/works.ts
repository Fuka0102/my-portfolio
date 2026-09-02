import { MicroCMSListContent } from 'microcms-js-sdk';

type Image = {
    url: string;
    height: number;
    width: number;
}

type Points = {
    fieldId: 'points';
    check?: Image;
    description: string;
}

export type Work = MicroCMSListContent & {
    title: string;
    slug?: string;
    thumbnail?: Image;
    category?: string[];
    period?: string;
    scope?: string;
    hours?: string;
    tools?: string[];
    detail_images?: Image[];
    description?: string;
    points?: Points[];
    url?: string;
}