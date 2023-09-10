import { FC, useState, useEffect, ReactNode } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
    width: string;
    height: string;
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: FC<ModalProps> = ({ width, height, isOpen, onClose, children }) => {
    const [isRender, setIsRender] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setIsRender(true);
        }, 500);
    }, []);

    return (
        <div className={styles.backGround} onClick={onClose}>
            <div
                style={{ width: width, height: height }}
                className={isRender ? `${styles.show} ${styles.Modal}` : `${styles.unshow} ${styles.Modal}`}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;
