import Link from 'next/link'
import Image from 'next/image'
import { Github } from 'lucide-react'
import styles from './Footer.module.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brandSection}>
            <Link href="/" className={styles.logoLink}>
              <Image
                src="/icons/favicon-32x32.png"
                alt="Shizuru Logo"
                width={40}
                height={40}
                className={styles.logoImage}
              />
            </Link>
            <p className={styles.brandDescription}>
              Your ultimate destination for anime and manga. Experience seamless streaming with our modern, fast, and intuitive platform designed for the community.
            </p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Navigation</h3>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <Link href="/" className={styles.link}>Home</Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/discover" className={styles.link}>Discover</Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/schedule" className={styles.link}>Schedule</Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/manga" className={styles.link}>Manga</Link>
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Community</h3>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <Link 
                  href="https://dcd.gg/shizuru" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.socialLink}
                >
                  <span className={styles.socialText}>Discord</span>
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.socialLink}
                >
                  <span className={styles.socialText}>Twitter</span>
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.socialLink}
                >
                  <Github className={styles.socialIcon} />
                  <span className={styles.socialText}>GitHub</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} Shizuru. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}