'use client';

import { useRef, useEffect } from 'react';
import styles from '../../styles/components/About.module.scss';
import Image from 'next/image';

const MORPH_CONFIGS = [
        {
        color: '#5BC4E8',
        from: 'M8,30 C5,10 20,2 45,4 C70,6 96,8 98,38 C100,65 92,95 60,97 C28,99 5,90 4,65 C3,48 11,50 8,30 Z',
        to:   'M5,28 C8,8 25,0 50,3 C75,6 98,15 97,42 C96,68 85,98 55,97 C25,96 2,85 3,58 C4,38 2,48 5,28 Z',
        },
        {
        color: '#FFD166',
        from: 'M10,25 C12,5 30,0 55,3 C80,6 98,20 97,48 C96,72 80,98 50,97 C20,96 3,80 4,55 C5,35 8,45 10,25 Z',
        to:   'M7,22 C10,3 32,1 58,5 C82,9 100,22 98,50 C96,75 78,100 48,97 C18,94 1,75 3,50 C5,30 4,42 7,22 Z',
        },
        {
        color: '#7ED957',
        from: 'M12,28 C10,8 28,1 52,4 C76,7 98,18 97,45 C96,70 82,98 52,97 C22,96 3,82 4,56 C5,36 14,48 12,28 Z',
        to:   'M8,24 C11,4 30,0 55,4 C80,8 99,20 98,48 C97,73 83,99 53,97 C23,95 2,78 3,52 C4,32 5,44 8,24 Z',
        },
    ];

export default function About () {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const cleanUps: (() => void)[] = [];

        function extractNumbers(pathStr: string) : number[] {
            const result = pathStr.match(/-?[\d.]+/g)?.map(Number);

            if (!result) {
                return [];
            }

            return result;
        }
        
        function buildPath(template: string, numbers: number[]) {
            let i = 0;
            return template.replace(/-?[\d.]+/g, () => numbers[i++].toFixed(2));
        }
        
        function lerp(a: number, b: number, t: number) {
            return a + (b - a) * t;
        }
        
        function easeInOut(t: number) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }
        

        const cards = sectionRef.current?.querySelectorAll('.js-about__card');

        if (!cards) {
            return;
        }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        
        Array.from(cards).forEach((card: Element, i: number) => {
            const svgEl = card.querySelector('.js-morph-svg');
            if (!svgEl) return;
        
            const cfg = MORPH_CONFIGS[i % MORPH_CONFIGS.length];
            const duration = (4 + i * 0.8) * 1000;
        
            svgEl.setAttribute('viewBox', '0 0 100 100');
            svgEl.setAttribute('preserveAspectRatio', 'none');
            svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        
            const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            pathEl.setAttribute('fill', cfg.color);
            pathEl.setAttribute('opacity', '0.75');
            pathEl.setAttribute('d', cfg.from);
            svgEl.appendChild(pathEl);
        
            const fromNums = extractNumbers(cfg.from);
            const toNums = extractNumbers(cfg.to);
            let startTime: number | null = null;
            let animationId: number | null = null;

        
            function animate(timestamp: number) {
              if (!startTime) startTime = timestamp;
              const elapsed = (timestamp - startTime) % (duration * 2);
              const t = elapsed < duration
                ? elapsed / duration
                : (duration * 2 - elapsed) / duration;
        
              const nums = fromNums?.map((from, j) => lerp(from, toNums[j], easeInOut(t)));
              
              if (!nums) {
                return;
              }

              pathEl.setAttribute('d', buildPath(cfg.from, nums));
        
              animationId = requestAnimationFrame(animate);
            }
        
            animationId = requestAnimationFrame(animate);

            cleanUps.push(() => {
                if (!animationId) {
                    return;
                }
                cancelAnimationFrame(animationId);
            });
        });

        return () => {
            cleanUps.forEach((fnc) => {
                fnc();
            });
        };

     }, []);

    return (
        <section className={styles.about} id="about" ref={sectionRef}>
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
                    <div className={`${styles['about__card']} js-about__card js-fade`}>
                        <Image className={`${styles['about__card-svg']} ${styles['shape-a']}`} src="/images/point1.svg" aria-hidden="true" width={286} height={248} alt="" />
                        <div className={styles['about__card-content']}>
                            <p className={styles['about__card-title']}>
                                <span className={styles['about__card-num']}>01</span>仕様を超えてご提案
                            </p>
                            <p className={styles['about__card-text']}>単にお客様のご要望に応えるだけでなく、改善ポイントがあれば積極的に提案いたします。<br/>「ここも直した方がいいのでは」と一歩踏み込む姿勢で、<strong>一緒により良い制作物を目指します。</strong></p>
                        </div>
                    </div>
                    <div className={`${styles['about__card']} js-about__card js-fade`}>
                        <Image className={`${styles['about__card-svg']} ${styles['shape-b']}`} src="/images/point2.svg" aria-hidden="true" width={286} height={248} alt="" />
                        <div className={styles['about__card-content']}>
                        <p className={styles['about__card-title']}>
                            <span className={styles['about__card-num']}>02</span>読まれるコードを書く
                        </p>
                        <p className={styles['about__card-text']}>動けばいいではなく、<strong>読みやすく、そして変更しやすいコード</strong>を意識します。<br/>命名・js実装など、長期運用や保守性を見据えた実装を心がけています。</p>
                        </div>
                    </div>
                    <div className={`${styles['about__card']} js-about__card js-fade`}>
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
