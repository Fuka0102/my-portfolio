import styles from '../../styles/components/WorksPreview.module.scss';
import Link from 'next/link';
import Image from 'next/image';

export default function WorksPreview () {
    return (
      <section className={styles['works-preview']} id="works">
        <div className="inner">
        <div className={`${styles['works-preview__heading-wrap']} js-fade`}>
          <span className={styles['works-preview__heading-dot']} aria-hidden="true"></span>
          <h2 className={styles['works-preview__heading']}>My Works</h2>
        </div>
        <div className={styles['works-preview__grid']}>
          <Link className={`${styles['works-preview__card']} js-fade`} href="works.html#work-01">
            <div className={styles['works-preview__card-img-wrap']}>
              <Image
                className={styles['works-preview__card-thumb']}
                src="/images/work-01-thumb.png"
                alt="（架空）LP制作会社サイト"
                width={600}
                height={338}
              />
              <span className={`${styles['works-preview__card-label']} ${styles['works-preview__card-label--lp']}`}>LP</span>
            </div>
            <div className={styles['works-preview__card-body']}>
              <p className={styles['works-preview__card-title']}>（架空）LP制作会社サイト</p>
              <p className={styles['works-preview__card-desc']}>架空のLP制作会社のLPをレスポンシブ対応で制作</p>
              <div className={styles['works-preview__card-techs']}>
                <span className={styles['works-preview__card-tech']}>HTML</span>
                <span className={styles['works-preview__card-tech']}>CSS</span>
                <span className={styles['works-preview__card-tech']}>JavaScript</span>
              </div>
            </div>
          </Link>
          <Link className={`${styles['works-preview__card']} js-fade`} href="works2.html#work-02">
            <div className={styles['works-preview__card-img-wrap']}>
              <Image
                className={styles['works-preview__card-thumb']}
                src="/images/work-02-thumb.png"
                alt="（架空）アイスショップバナー"
                width={600}
                height={338}
              />
              <span className={`${styles['works-preview__card-label']} ${styles['works-preview__card-label--banner']}`}>バナー</span>
            </div>
            <div className={styles['works-preview__card-body']}>
              <p className={styles['works-preview__card-title']}>（架空）アイスショップバナー</p>
              <p className={styles['works-preview__card-desc']}>架空のアイスショップのECサイト用バナー</p>
              <div className={styles['works-preview__card-techs']}>
                <span className={styles['works-preview__card-tech']}>Figma</span>
                <span className={styles['works-preview__card-tech']}>Photoshop</span>
              </div>
            </div>
          </Link>
        </div>
        </div>
      </section>
    )
}