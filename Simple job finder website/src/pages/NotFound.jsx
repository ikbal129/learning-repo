import styles from '../styling/NotFound.module.css';

export default function NotFound() {
    return (
    <div className={styles.wrapper}>
      {/* Angka dekorasi background */}
        <div className={styles.bgNumber}>404</div>

      {/* Konten Utama */}
        <div className={styles.content}>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.description}>
            The page you are looking for doesn't exist, or has been moved.
        </p>

        <div className={styles.buttonGroup}>
            <a href="/" className={styles.btnPrimary}>
            Back to Home
            </a>
            <a href="/jobs" className={styles.btnSecondary}>
            Browse Jobs
            </a>
        </div>
        </div>
    </div>
    );
}