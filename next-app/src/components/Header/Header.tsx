import styles from '../../styles/components/Header.module.scss';
import React from "react";

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
                <img className={styles['header__contact-btn-icon']} src="images/contact.svg" alt="" aria-hidden="true" />
                Contact
            </a>
            <a className={styles['header__mail-icon']} href="https://forms.gle/HtUP9WXgkUYSV5Vy9" target="_blank" rel="noopener noreferrer" aria-label="お問い合わせフォームへ">
                <img className={styles['header__mail-icon-img']} src="images/contact.svg" alt="" aria-hidden="true" />
            </a>
        </header>
    );
}