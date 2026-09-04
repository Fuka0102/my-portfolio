import styles from '../../styles/components/WorksPreview.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { getWorks } from '@/lib/microcms';
import { categoryModifier } from '@/types/works';

export default async function WorksPreview () {

    const works = await getWorks();

    return (
      <section className={styles['works-preview']} id="works">
        <div className="inner">
        <div className={`${styles['works-preview__heading-wrap']} js-fade`}>
          <span className={styles['works-preview__heading-dot']} aria-hidden="true"></span>
          <h2 className={styles['works-preview__heading']}>My Works</h2>
        </div>
        <div className={styles['works-preview__grid']}>
          {works.map((work) => (
            <Link key={work.id} className={`${styles['works-preview__card']} js-fade`} href={`works/${work.slug}`}>
              <div className={styles['works-preview__card-img-wrap']}>
                <Image
                  className={styles['works-preview__card-thumb']}
                  src={work.thumbnail.url}
                  alt={work.title}
                  width={600}
                  height={338}
                />
                <span className={`${styles['works-preview__card-label']} ${styles[`works-preview__card-label--${categoryModifier[work.category[0]]}`]}`}>{work.category[0]}</span>
              </div>
              <div className={styles['works-preview__card-body']}>
                <p className={styles['works-preview__card-title']}>{work.title}</p>
                <p className={styles['works-preview__card-desc']}>{work.summary}</p>
                <div className={styles['works-preview__card-techs']}>
                  {work.tools.map((tech) => (
                    <span key={tech} className={styles['works-preview__card-tech']}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
        </div>
      </section>
    )
}