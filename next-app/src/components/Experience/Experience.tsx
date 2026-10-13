'use client';
import { useRef } from 'react';
import ScrollAnimationProvider from '../ScrollAnimationProvider';
import styles from '../../styles/components/Experience.module.scss';

export default function Experience () {
    const sectionRef = useRef<HTMLElement>(null!);

    return (
        <section className={styles.experience} id="experience" ref={sectionRef}>
            <ScrollAnimationProvider containerRef={sectionRef} />
            <div className="inner">
            <div className={`${styles['experience__heading-wrap']} js-fade`}>
                <span className={styles['experience__heading-dot']} aria-hidden="true"></span>
                <h2 className={styles['experience__heading']}>My Experiences</h2>
            </div>

            <div className={styles['experience__list']}>

                <div className={`${styles['experience__row']} ${styles['experience__row--current']} js-fade`}>
                <div className={styles['experience__year']}>
                    <div className={styles['experience__year-line']}>
                    <span className={styles['experience__year-num']}>2022</span>
                    <span className={styles['experience__month-label']}>Jan</span>
                    </div>
                    <span className={styles['experience__period']}>→ now</span>
                </div>
                <div className={styles['experience__dot-wrap']}>
                    <span className={styles['experience__dot']} aria-hidden="true"></span>
                </div>
                <div className={styles['experience__card']}>
                    <p className={styles['experience__card-title']}>不動産・住宅情報サイトのフロント実装を担当</p>
                    <p className={styles['experience__card-text']}>ユーザーの反響を増やすことをゴールに画面UI / UXのブラッシュアップを行なっています。私は主にhtml / scss / jQueryを使ったコーディングをメイン業務としています。<strong>最近はAIを用いてより効率的な実装を検討</strong>することも増えてきました。加えて実装だけでなく、見積もりの算出やメンバーのマネジメント、また時としてディレクションにも関わります。</p>
                </div>
                </div>

                <div className={`${styles['experience__row']} js-fade`}>
                <div className={styles['experience__year']}>
                    <div className={styles['experience__year-line']}>
                    <span className={styles['experience__year-num']}>2018</span>
                    <span className={styles['experience__month-label']}>Nov</span>
                    </div>
                    <span className={styles['experience__period']}>→ 2021 Dec</span>
                </div>
                <div className={styles['experience__dot-wrap']}>
                    <span className={styles['experience__dot']} style={{ animationDelay: '0.4s' }} aria-hidden="true"></span>
                </div>
                <div className={styles['experience__card']}>
                    <p className={styles['experience__card-title']}>EC運営支援の制作部門でディレクター &amp; コーディングを担当</p>
                    <p className={styles['experience__card-text']}>お客様のEC店舗（楽天・yahoo・makeshopなど）に必要なセールLPやバナー、その他ヘッダーやフッターといったパーツの制作に関わりました。この頃からお客様の要望の実現だけでなく、より<strong>閲覧しやすい店舗や売上UPにつながることを意識</strong>して提案をしてきました。また対お客様だけでなく、社内での業務改善を積極的に検討し、日々の業務を円滑に進めることも心がけました。</p>
                </div>
                </div>

                <div className={`${styles['experience__row']} js-fade`}>
                <div className={styles['experience__year']}>
                    <div className={styles['experience__year-line']}>
                    <span className={styles['experience__year-num']}>2016</span>
                    <span className={styles['experience__month-label']}>Apr</span>
                    </div>
                    <span className={styles['experience__period']}>→ 2018 Oct</span>
                </div>
                <div className={styles['experience__dot-wrap']}>
                    <span className={styles['experience__dot']} style={{ animationDelay: '0.8s' }} aria-hidden="true"></span>
                </div>
                <div className={styles['experience__card']}>
                    <p className={styles['experience__card-title']}>新卒で営業職に就くが、クリエイティブ職への興味から業種転換</p>
                    <p className={styles['experience__card-text']}>SaaS販売の新規開拓営業に就きましたが、エンジニアの方と働いていたこともあって徐々に制作への興味が出てきました。そんな中でオンラインのWebデザインスクールを受講してみたところ自分に合っていそうな手応えを感じたため、スクールで制作したポートフォリオをもとにクリエイティブ業界へ転職することにしました。</p>
                </div>
                </div>

            </div>
            </div>
        </section>
    );
}
