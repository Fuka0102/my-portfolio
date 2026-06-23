import styles from '../../styles/components/Header.module.scss';
import Image from 'next/image'

export default function Header () {
    return (
        <header className={`${styles.header} js-header`}>
            <a className={styles['header__logo']} href="#">
                <span className={styles['header__logo-dot']} aria-hidden="true"></span>
                <span className={styles['header__logo-text']}>TANAKA FUKA</span>
            </a>
            <nav className={styles['header__nav']}>
                <a className={styles['header__nav-link']} href="#works">My Works</a>
                <a className={styles['header__nav-link']} href="#about">About Me</a>
                <a className={styles['header__nav-link']} href="#experience">My Experiences</a>
            </nav>
            <a className={styles['header__contact-btn']} href="https://forms.gle/HtUP9WXgkUYSV5Vy9" target="_blank" rel="noopener noreferrer">
                <Image className={styles['header__contact-btn-icon']} src="/contact.svg" alt="" width="50" height="50" aria-hidden="true" />
                Contact
            </a>
            <a className={styles['header__mail-icon']} href="https://forms.gle/HtUP9WXgkUYSV5Vy9" target="_blank" rel="noopener noreferrer" aria-label="お問い合わせフォームへ">
                <Image className={styles['header__mail-icon-img']} src="/contact.svg" alt="" width="50" height="50" aria-hidden="true" />
            </a>
        </header>
    );
}