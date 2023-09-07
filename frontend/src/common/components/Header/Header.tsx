import styles from './Header.module.css';
import logoSrc from '../../images/SF_full_logo.png';

const Header = (data: any) => {
    return (
        <div className={styles.header}>
            <div>
                <img src={logoSrc} alt="로고 이미지" />
            </div>
        </div>
    );
};

export default Header;
