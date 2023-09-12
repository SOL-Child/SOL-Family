import backIconSrc from '../../images/SF_back_icon_blue.png';
import styles from './PageHeader.module.css';

const PageHeader = ({ text, handleIcon }: { text: string; handleIcon: () => void }) => {
    return (
        <div className={styles.PageHeader}>
            <img className={styles.backIcon} onClick={handleIcon} src={backIconSrc} alt="뒤로가기 아이콘" />
            <div className={styles.text}>{text}</div>
            <div></div>
        </div>
    );
};

export default PageHeader;
