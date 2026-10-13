'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '../../styles/components/Header.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function Header () {
    const [isScrolling, setIsScrolling] = useState(false);
    const [isInHero, setisInHero] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const headerRef = useRef<HTMLElement>(null);

    // TODO: resize処理を後続で追加予定
    useEffect(() => {
        const header = headerRef.current;

        if (!header) return;

        const isSp = () => window.innerWidth < 768;

        if (!isSp()) {
            header.classList.remove('is-hidden');
            return;
        }

        const hero = document.querySelector('.js-hero');
        if (!hero) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setisInHero(true);
                    } else {
                        setisInHero(false);
                    }
                });
            },
            {
                threshold: 0,
                rootMargin: "0px 0px -80px 0px",
            },
        );
        
        const handleScroll = () => {
            setIsScrolling(true);

            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            timeoutRef.current = setTimeout(() => {
                setIsScrolling(false);
            }, 150);
        };

        observer.observe(hero);
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            observer.disconnect();
        };
    }, []);


    return (
        <header className={`${styles.header} ${ isScrolling && !isInHero ? styles['is-hidden'] : ''} js-header`} ref={headerRef}>
            <Link href="/" className={styles['header__logo']}>
                <span className={styles['header__logo-dot']} aria-hidden="true"></span>
                <span className={styles['header__logo-text']}>TANAKA FUKA</span>
            </Link>
            <nav className={styles['header__nav']}>
                <Link href="/#works" className={styles['header__nav-link']}>
                    My Works
                </Link>
                <Link href="/#about" className={styles['header__nav-link']}>
                    About Me
                </Link>
                <Link href="/#experience" className={styles['header__nav-link']}>
                    My Experiences
                </Link>
            </nav>
            <a className={styles['header__contact-btn']} href="https://forms.gle/HtUP9WXgkUYSV5Vy9" target="_blank" rel="noopener noreferrer">
                <Image className={styles['header__contact-btn-icon']} src="/images/contact.svg" alt="" width="50" height="50" aria-hidden="true" />
                Contact
            </a>
            <a className={styles['header__mail-icon']} href="https://forms.gle/HtUP9WXgkUYSV5Vy9" target="_blank" rel="noopener noreferrer" aria-label="お問い合わせフォームへ">
                <Image className={styles['header__mail-icon-img']} src="/images/contact.svg" alt="" width="50" height="50" aria-hidden="true" />
            </a>
        </header>
    );
}