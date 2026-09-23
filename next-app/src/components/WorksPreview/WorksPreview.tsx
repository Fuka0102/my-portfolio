'use client';

import { useRef } from 'react';
import styles from '../../styles/components/WorksPreview.module.scss';
import ScrollAnimationProvider from '../ScrollAnimationProvider';


export default function WorksPreview ({children}: {children: React.ReactNode}) {
    const sectionRef = useRef<HTMLElement>(null!);

    return (
      <section className={styles['works-preview']} id="works" ref={sectionRef}>
        <ScrollAnimationProvider containerRef={sectionRef} />
        <div className="inner">
        <div className={`${styles['works-preview__heading-wrap']} js-fade`}>
          <span className={styles['works-preview__heading-dot']} aria-hidden="true"></span>
          <h2 className={styles['works-preview__heading']}>My Works</h2>
        </div>
        <div className={styles['works-preview__grid']}>
          {children}
        </div>
        </div>
      </section>
    )
}