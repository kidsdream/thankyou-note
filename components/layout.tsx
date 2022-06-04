import styles from '/styles/layout.module.scss'

function Layout({ children }: {children: any}) {
  let year = new Date().getFullYear();
  return (
    <>
      <div className={styles.body} id="outer-container">
        <header>
          <div className={styles.headerContent}>
            <div className={styles.titleArea}>
              <div className={styles.mainTitle}>
                <span>感謝ノート</span>
              </div>
              <p className={styles.subTitle}>直接伝えられないけれど、ありがとうを残したいあなたへ</p>
            </div>
          </div>
        </header>
        <main>
          {children}
        </main>
        <footer>
          <div className={styles.footerCopy}>
            <small>&copy; {year} 感謝ノート</small>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Layout
