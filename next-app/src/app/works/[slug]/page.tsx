import { getWork } from '@/lib/microcms';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = await getWork (slug);

    if (!data) {
        return null;
    }
    return (
        <div>
            <h1>{data.title}</h1>
            <p>{data.summary}</p>
        </div>
    )
}