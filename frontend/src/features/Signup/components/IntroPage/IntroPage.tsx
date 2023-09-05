import styles from './IntroPage.module.css';

const IntroPage = () => {
    return (
        <>
            <div className={styles.introTitle}>
                가입 후 쏠패밀리를 <br />
                마음껏 사용하세요.
            </div>
            <div className={styles.introText}>
                <span>&nbsp;회원가입</span>을 진행해주세요.
                <div className={styles.introFontBox}></div>
            </div>
        </>
    );
};

export default IntroPage;
