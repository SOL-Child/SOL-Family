import { useEffect, useState } from 'react';
import nameSrc from '../../../../common/images/SF_name_icon.png';
import styles from './NamePage.module.css';

const NamePage = ({
    setIsPossibleInput,
    setCurrentInput,
}: {
    setIsPossibleInput: (flag: boolean) => void;
    setCurrentInput: (value: string | number) => void;
}) => {
    const [name, setName] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (name === undefined) return;

        if (name.length >= 2) {
            setCurrentInput(name);
            setIsPossibleInput(true);
        } else {
            setIsPossibleInput(false);
        }
    }, [name]);

    const handleInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    return (
        <>
            <div className={styles.inputTitle}>이름</div>
            <div className={styles.inputBox}>
                <img src={nameSrc} alt="사람 아이콘" />
                <input
                    name="name"
                    value={name || ''}
                    onChange={handleInputName}
                    type="text"
                    placeholder="이름을 입력하세요."
                />
            </div>
            <div className={styles.orderText}>한글 이름을 입력해주세요.</div>
        </>
    );
};

export default NamePage;
