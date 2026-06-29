import styles from '../../styles/components/About.module.scss';
import Image from 'next/image';

export default function About () {
    return (
        <section className={styles.about} id="about">
            <div className="inner">
                <div className={`${styles['about__heading-wrap']} js-fade`}>
                    <span className={styles['about__heading-dot']} aria-hidden="true"></span>
                    <h2 className={styles['about__heading']}>About Me</h2>
                </div>

                <div className={`${styles['about__intro']} js-fade`}>
                    <p className={styles['about__name']}>TANAKA FUKA</p>
                    <p className={styles['about__text']}>
                        1994年生まれ、広島県育ち。大学では国際学部で学びました。<br />
                        新卒でIT系の営業職に就くが、エンジニアの方と一緒に働くうちにクリエイティブ業に興味を持ち、<br />
                        アルバイトを経て現在に至ります。
                    </p>
                    </div>

                    <div className={styles['about__cards']}>
                    <div className={`${styles['about__card']} js-fade`}>
                        <Image className={`${styles['about__card-svg']} ${styles['shape-a']}`} src="/images/point1.svg" aria-hidden="true" width={286} height={248} alt="" />
                        <div className={styles['about__card-content']}>
                            <p className={styles['about__card-title']}>
                                <span className={styles['about__card-num']}>01</span>仕様を超えてご提案
                            </p>
                            <p className={styles['about__card-text']}>単にお客様のご要望に応えるだけでなく、改善ポイントがあれば積極的に提案いたします。<br/>「ここも直した方がいいのでは」と一歩踏み込む姿勢で、<strong>一緒により良い制作物を目指します。</strong></p>
                        </div>
                    </div>
                    <div className={`${styles['about__card']} js-fade`}>
                        <Image className={`${styles['about__card-svg']} ${styles['shape-b']}`} src="/images/point2.svg" aria-hidden="true" width={286} height={248} alt="" />
                        <div className={styles['about__card-content']}>
                        <p className={styles['about__card-title']}>
                            <span className={styles['about__card-num']}>02</span>読まれるコードを書く
                        </p>
                        <p className={styles['about__card-text']}>動けばいいではなく、<strong>読みやすく、そして変更しやすいコード</strong>を意識します。<br/>命名・js実装など、長期運用や保守性を見据えた実装を心がけています。</p>
                        </div>
                    </div>
                    <div className={`${styles['about__card']} js-fade`}>
                        <Image className={`${styles['about__card-svg']} ${styles['shape-c']}`} src="/images/point3.svg" aria-hidden="true" width={286} height={248} alt="" />
                        <div className={styles['about__card-content']}>
                            <p className={styles['about__card-title']}>
                                <span className={styles['about__card-num']}>03</span>課題発見＆仕組み化
                            </p>
                            <p className={styles['about__card-text']}>開発フローや作業効率に課題を感じたとき、放置せず改善策を検討・提案してきました。<br/>AIを活用したレビュー効率化など、<strong>再現性のある仕組みづくり</strong>を意識して取り組んでいます。</p>
                        </div>
                    </div>
                    </div>

                    <div className={`${styles['about__skills-box']} js-fade`}>
                    <p className={styles['about__skills-label']}>SKILLS・TOOLS</p>
                    <div className={styles['about__tools']}>
                        <div className={styles['about__tool']} data-tool="html">HTML</div>
                        <div className={styles['about__tool']} data-tool="css">CSS</div>
                        <div className={styles['about__tool']} data-tool="js">JavaScript</div>
                        <div className={styles['about__tool']} data-tool="ts">TypeScript</div>
                        <div className={styles['about__tool']} data-tool="wordpress">WordPress</div>
                        <div className={styles['about__tool']} data-tool="github">Git</div>
                        <div className={styles['about__tool']} data-tool="claude">Claude</div>
                        <div className={styles['about__tool']} data-tool="figma">Figma</div>
                        <div className={styles['about__tool']} data-tool="photoshop">Photoshop</div>
                        <div className={styles['about__tool']} data-tool="canva">Canva</div>
                        <div className={styles['about__tool']} data-tool="wix">Wix</div>
                    </div>
                </div>
            </div>
        </section>
    )
}
