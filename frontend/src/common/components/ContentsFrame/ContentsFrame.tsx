import React from 'react';
import styles from './ContentsFrame.module.css';

const ContentsFrame = ({ page, children }: { page: string; children: React.ReactNode }) => {
    /**
     * @todo: page에 따라 frame 다르게 처리
     */

    // 공통 페이지 frame
    return <div className={styles.ContentsFrame}>{children}</div>;
};

export default ContentsFrame;
