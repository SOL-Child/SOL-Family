import React from 'react';
import styles from './PageFrame.module.css';

const PageFrame = ({ children }: { children: React.ReactNode }) => {
    return <div className={styles.PageFrame}>{children}</div>;
};

export default PageFrame;
