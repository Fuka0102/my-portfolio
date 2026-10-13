import { getWork } from '@/lib/microcms';
import WorkDetail from './components/WorkDetail/WorkDetail';

type Awaited<T> = T extends Promise<infer U> ? U : T;

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data:Awaited<ReturnType<typeof getWork>> = await getWork (slug);

    if (!data) {
        return null;
    }

    return (
        <WorkDetail data={data} />
    );
}