import { getWork } from '@/lib/microcms';
import Image from 'next/image';
import Link from 'next/link';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = await getWork (slug);

    if (!data) {
        return null;
    }


    return (
    <>
        <h2 className="works-hero__title js-fade">{data.title}</h2>

        <section className="works-detail">
            <div className="inner">

            <div className="works-detail__meta js-fade">
                <div className="works-detail__meta-item">
                <p className="works-detail__meta-label">制作時期</p>
                <p className="works-detail__meta-value">{data.period}</p>
                </div>
                <div className="works-detail__meta-item">
                <p className="works-detail__meta-label">制作範囲</p>
                <p className="works-detail__meta-value">{data.scope}</p>
                </div>
                <div className="works-detail__meta-item">
                <p className="works-detail__meta-label">制作時間</p>
                <p className="works-detail__meta-value">{data.hours}</p>
                </div>
                <div className="works-detail__meta-item">
                <p className="works-detail__meta-label">技術・ツール</p>
                <p className="works-detail__meta-value">{data.tools}</p>
                </div>
            </div>

            <div className="works-detail__card js-fade">
                {/* <Image className="works-detail__card-img" src={data.detail_images} alt={data.title} /> */}
            </div>

            {data.url && (
                <Link className="works-detail__btn js-fade" href={data.url} target="_blank" rel="noopener noreferrer">
                    Go to Page
                </Link>
            )}

            <p className="works-detail__desc js-fade">
                架空のLP専門の制作会社「W.R.C.」のコーポレートサイトです。<br />
                ヒアリングから公開後の運用まで一気通貫でサポートするサービスの魅力を伝えるため、課題提起・選ばれる理由・制作フロー・実績・お客様の声・FAQと、<span className="works-detail__desc-link">ユーザーの不安を段階的に解消するセクション構成</span>を設計しました。
            </p>

            <div className="works-detail__points js-fade">
                <p className="works-detail__points-title">こだわりポイント</p>
                <ul className="works-detail__points-list">
                    {data.points.map((point, index) => (
                        <li key={index} className="works-detail__points-item">{point.description}</li>
                    ))}
                </ul>
            </div>

            </div>
        </section>
    </>
    );
}