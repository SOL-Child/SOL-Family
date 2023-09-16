import { useEffect, useState, useRef } from 'react';
import User from '../../../../common/constants/User';
import styles from './RolePage.module.css';

const RolePage = ({
    setIsPossibleInput,
    setCurrentInput,
}: {
    setIsPossibleInput: (flag: boolean) => void;
    setCurrentInput: (value: string | number) => void;
}) => {
    const [role, setRole] = useState<null | string>(null);

    useEffect(() => {
        if (role === null) return;
        setCurrentInput(role);
        setIsPossibleInput(true);
    }, [role]);

    return (
        <>
            <div className={styles.inputTitle}>아이 / 부모</div>
            <div className={styles.roleBox}>
                <div className={styles.roleText}>아이 또는 부모 자격을 선택해주세요.</div>
                <div className={styles.roleButtonBox}>
                    <button
                        className={role === User.CHILD ? styles.clicked : styles.nonClicked}
                        onClick={() => {
                            setRole(User.CHILD);
                        }}
                    >
                        <div>아이</div>
                    </button>
                    <button
                        className={role === User.PARENT ? styles.clicked : styles.nonClicked}
                        onClick={() => setRole(User.PARENT)}
                    >
                        <div>부모</div>
                    </button>
                </div>
            </div>
        </>
    );
};

export default RolePage;
