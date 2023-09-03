import { useEffect, useState } from 'react';
import pwSrc from '../../../../common/images/SF_password_icon.png';
import styles from './PasswordPage.module.css';

const PasswordPage = ({
    setIsPossibleInput,
    setCurrentInput,
}: {
    setIsPossibleInput: (flag: boolean) => void;
    setCurrentInput: (value: string | number) => void;
}) => {
    const [password, setPassword] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (password === undefined) return;

        if (password.length < 8) {
            setIsPossibleInput(false);
            return;
        }

        const hasNumber = /\d/.test(password);
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (!hasNumber || !hasLetter || !hasSpecialChar) {
            setIsPossibleInput(false);
            return;
        }

        setIsPossibleInput(true);
        setCurrentInput(password);
    }, [password]);

    const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <>
            <div className={styles.inputTitle}>비밀번호</div>
            <div className={styles.inputBox}>
                <img src={pwSrc} alt="자물쇠 아이콘" />
                <input
                    name="password"
                    value={password || ''}
                    onChange={handleInputPassword}
                    type="password"
                    placeholder="비밀번호를 입력하세요."
                />
            </div>
            <div className={styles.orderText}>
                숫자, 영문자, 특수문자를 포함한 8자리 이상의 비밀번호를 입력해주세요.
            </div>
        </>
    );
};

export default PasswordPage;
