import styles from './Header.module.css';
import logoSrc from '../../images/SF_full_logo.png';
import { useNavigate } from 'react-router-dom';

const Header = (data: any) => {
    const navigate = useNavigate();

    return (
        <div className={styles.header}>
            <div>
                <img src={logoSrc} alt="로고 이미지" onClick={() => navigate('/')} />
            </div>
        </div>
    );
};

export default Header;
