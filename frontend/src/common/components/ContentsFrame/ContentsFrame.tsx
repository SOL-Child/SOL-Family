import React from 'react';
import styles from './ContentsFrame.module.css';
import Pages from '../../constants/Pages';

const ContentsFrame = ({ page, children }: { page: string; children: React.ReactNode }) => {
    /**
     * @todo: page에 따라 frame 다르게 처리
     */

    let style: any = styles.ContentsFrame;

    if (page === Pages.MAIN) {
        style += ' ' + `${styles.main}`;
    }

    // 공통 페이지 frame
    return <div className={style}>{children}</div>;
};

export default ContentsFrame;
