import styles from './BottomBar.module.css';

const BottomBar = () => {
    return (
        <div className={styles.bottomBar}>
            <div className={styles.iconBox}>
                <img src="" alt="알림 아이콘" />
                <div>알림</div>
            </div>
            <div>
                <img src="" alt="홈 아이콘" />
            </div>
            <div className={styles.iconBox}>
                <img src="" alt="마이 아이콘" />
                <div>마이</div>
            </div>
        </div>
    );
};

export default BottomBar;
