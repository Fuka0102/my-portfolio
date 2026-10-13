import { MicroCMSListContent } from 'microcms-js-sdk';

type Image = {
    url: string;
    height: number;
    width: number;
}

export type Points = {
    fieldId: 'points';
    check?: Image;
    description: string;
}

type CategoryModifier = Record<'LP' | 'WEBサイト' | 'バナー' , string>;
export const categoryModifier: CategoryModifier = {
    LP: "lp",
    WEBサイト: "web",
    バナー: "banner"
};

export type Work = MicroCMSListContent & {
    title: string;
    slug: string;
    thumbnail: Image;
    category: ('LP' | 'WEBサイト' | 'バナー')[];
    period: string;
    scope: string;
    hours: string;
    tools: string[];
    detail_images: Image[];
    description: string;
    points: string;
    url?: string;
    summary: string;
}

