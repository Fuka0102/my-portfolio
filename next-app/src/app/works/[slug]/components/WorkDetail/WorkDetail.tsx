'use client';

import { useRef } from 'react';
import { getWork } from '@/lib/microcms';
import Image from 'next/image';
import Link from 'next/link';
import styles from "../../../../../styles/components/WorkDetail.module.scss";
import ScrollAnimationProvider from '../../../../../components/ScrollAnimationProvider';

export default function WorkDeatil({ data }: { data: Awaited<ReturnType<typeof getWork>> }) {
     const sectionRef = useRef<HTMLDivElement>(null!);

    return (
      <div ref={sectionRef}>
        <ScrollAnimationProvider containerRef={sectionRef} />
          <section className={styles['works-hero']}>
                <div className={styles['inner']}>
                <div className={`${styles['works-hero__heading-wrap']} js-fade`}>
                    <span className={styles['works-hero__heading-dot']} aria-hidden="true"></span>
                    <h1 className={styles['works-hero__heading']}>My Works</h1>
                </div>
                 <h2 className={`${styles['works-hero__title']} js-fade`}>{data.title}</h2>
                </div>
            </section>
           
             <section className={styles['works-detail']}>
                <div className={styles['inner']}>
    
                <div className={`${styles['works-detail__meta']} js-fade`}>
                    <div className={styles['works-detail__meta-item']}>
                    <p className={styles['works-detail__meta-label']}>制作時期</p>
                    <p className={styles['works-detail__meta-value']}>{data.period}</p>
                    </div>
                    <div className={styles['works-detail__meta-item']}>
                    <p className={styles['works-detail__meta-label']}>制作範囲</p>
                    <p className={styles['works-detail__meta-value']}>{data.scope}</p>
                    </div>
                    <div className={styles['works-detail__meta-item']}>
                    <p className={styles['works-detail__meta-label']}>制作時間</p>
                    <p className={styles['works-detail__meta-value']}>{data.hours}</p>
                    </div>
                    <div className={styles['works-detail__meta-item']}>
                    <p className={styles['works-detail__meta-label']}>技術・ツール</p>
                    <p className={styles['works-detail__meta-value']}>{data.tools}</p>
                    </div>
                </div>
    
                {data.detail_images.length > 0 && (
                    <div className={`${styles['works-detail__card']} js-fade`}>
                        <Image className={styles['works-detail__card-img']} src={data.detail_images[0].url} alt={data.title} width={data.detail_images[0].width} height={data.detail_images[0].height} />
                    </div>
                )}
    
                {data.url && (
                    <Link className={`${styles['works-detail__btn']} js-fade`} href={data.url} target="_blank" rel="noopener noreferrer">
                        Go to Page
                    </Link>
                )}
    
                <p className={`${styles['works-detail__desc']} js-fade`}>
                    {data.description}
                </p>
    
                <div className={`${styles['works-detail__points']} js-fade`}>
                    <p className={styles['works-detail__points-title']}>こだわりポイント</p>
                    <ul className={styles['works-detail__points-list']}>
                        {data.points.map((point, index) => (
                            <li key={index} className={styles['works-detail__points-item']}>{point.description}</li>
                        ))}
                    </ul>
                </div>
    
                </div>
            </section>
      </div>
    );
}