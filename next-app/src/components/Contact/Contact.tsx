import styles from "../../styles/components/Contact.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function Contact() {
  return (
    <section className={styles.contact} id="contact">
      <canvas
        className={`${styles['contact__canvas']} js-contact-canvas`}
        aria-hidden="true"
      ></canvas>
      <div className="inner">
        <div className={`${styles['contact__heading-wrap']} js-fade`}>
          <span className={styles['contact__heading-dot']} aria-hidden="true"></span>
          <h2 className={styles['contact__heading']}>Contact</h2>
        </div>
        <Link
          className={`${styles['contact__btn']} js-fade`}
          href="https://forms.gle/HtUP9WXgkUYSV5Vy9"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className={styles['contact__btn-icon']}
            src="/images/contact.svg"
            alt=""
            aria-hidden="true"
            width={18}
            height={14}
          />
          Contact Here
        </Link>
      </div>
      <footer className={styles['contact__footer']}>
        <p>© 2026 TANAKA FUKA</p>
      </footer>
    </section>
  );
}
