import { ReactNode } from 'react';
import styles from './ContentsFrame.module.css';

const ContentsFrame = ({ children }: { children: ReactNode }) => {
    return <div className={styles.ContentsFrame}>{children}</div>;
};

export default ContentsFrame;
