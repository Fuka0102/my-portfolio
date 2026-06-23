import styles from '../../styles/components/Hero.module.scss';

export default function Header () {
    return (
        <section className={`${styles.hero} js-hero`} id="hero">
            <canvas className={`${styles['hero__canvas']} js-metaball-canvas`} aria-hidden="true"></canvas>
            <div className={styles.inner}>
            <div className={`${styles['hero__content']} js-fade`}>
                <div className={styles['hero__name-wrap']}>
                <span className={styles['hero__name-dot']} aria-hidden="true"></span>
                <h1 className={styles['hero__name']}>TANAKA FUKA</h1>
                </div>
                <p className={styles['hero__portfolio']}>Portfolio</p>
                <p className={styles['hero__tagline']}>web designer / developer</p>
            </div>
            </div>
            <div className={styles['hero__scroll']} aria-hidden="true">
            <span className={styles['hero__scroll-text']}>scroll</span>
            <span className={styles['hero__scroll-line']}></span>
            </div>
        </section>
    );
}