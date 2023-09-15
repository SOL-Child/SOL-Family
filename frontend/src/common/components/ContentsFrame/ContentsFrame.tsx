import { ReactNode } from 'react';
import Pages from '../../constants/Pages';
import styles from './ContentsFrame.module.css';

const ContentsFrame = ({ page, children }: { page: string; children: ReactNode }) => {
    const hasBtnPage = [Pages.TRANSFER, Pages.AUTO_TRANSFER, Pages.LOAN_REQUEST, Pages.ALARM, Pages.MY];

    let style = styles.ContentsFrame;

    if (hasBtnPage.includes(page)) {
        style += ` ${styles.hasBtn}`;
    }

    return <div className={style}>{children}</div>;
};

export default ContentsFrame;
