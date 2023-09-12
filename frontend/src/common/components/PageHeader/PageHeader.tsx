import backIconSrc from '../../images/SF_back_icon_blue.png';
import styles from './PageHeader.module.css';

const PageHeader = ({ text }: { text: string }) => {
    return (
        <div className={styles.PageHeader}>
            <img className={styles.backIcon} src={backIconSrc} alt="뒤로가기 아이콘" />
            <div className={styles.text}>{text}</div>
            <div></div>
        </div>
    );
};

export default PageHeader;
