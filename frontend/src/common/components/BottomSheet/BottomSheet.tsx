import { useState, useEffect, ReactNode } from 'react';
import styles from './BottomSheet.module.css';

const BottomSheet = ({ height, onClose, children }: { height: string; onClose: () => void; children: ReactNode }) => {
    const [isRender, setIsRender] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setIsRender(true);
        }, 500);
    }, []);

    return (
        <div className={styles.backGround} onClick={onClose}>
            <div
                style={{ height: height }}
                className={isRender ? `${styles.show} ${styles.BottomSheet}` : `${styles.unshow} ${styles.BottomSheet}`}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default BottomSheet;
