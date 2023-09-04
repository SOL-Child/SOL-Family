import { useEffect, useState, useRef } from 'react';
import phoneSrc from '../../../../common/images/SF_phone_icon.png';
import Timer from '../Timer/Timer';
import SignupAPI from '../../apis/SignupAPI';
import styles from './PhonePage.module.css';

const PhonePage = ({
    setIsPossibleInput,
    setCurrentInput,
}: {
    setIsPossibleInput: (flag: boolean) => void;
    setCurrentInput: (value: string | number) => void;
}) => {
    const [isCheckReceive, setIsCheckReceive] = useState<boolean>(false); // 인증번호 받기 체크 여부
    const [isPossiblePhone, setIsPossiblePhone] = useState<boolean>(false); // 가능한 전화번호인지 확인
    const [phone, setPhone] = useState<string | undefined>(undefined); // 전화 번호
    const [isPossibleCertifNum, setIsPossibleCertifNum] = useState<boolean>(false); // 가능한 인증번호인지 확인
    const [certifNum, setCertifNum] = useState<string | undefined>(undefined); // 인증 번호
    const [isExpired, setIsExpired] = useState<boolean>(false); // 인증 번호 만료 or 실패 여부
    const [isCorrectCertifNum, setIsCorrectCertifNum] = useState<boolean>(true); // 인증번호 성공 여부

    const certifBtn = useRef<HTMLButtonElement | null>(null);
    const certifChkBtn = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (certifBtn.current === null) return;

        if (isPossiblePhone) {
            certifBtn.current.style.backgroundColor = '#0046FF';
        } else {
            certifBtn.current.style.backgroundColor = '#D9D9D9';
        }
    }, [isPossiblePhone]);

    useEffect(() => {
        if (certifChkBtn.current === null) return;

        if (isPossibleCertifNum) {
            certifChkBtn.current.style.backgroundColor = '#0046FF';
        } else {
            certifChkBtn.current.style.backgroundColor = '#D9D9D9';
        }
    }, [isPossibleCertifNum]);

    useEffect(() => {
        if (phone === undefined) return;

        if (phone.length < 11 || phone.length > 11) {
            setIsPossiblePhone(false);
            return;
        }

        const num = /^[0-9]+$/;

        if (!num.test(phone)) {
            setIsPossiblePhone(false);
            return;
        }

        setCurrentInput(phone);
        setIsPossiblePhone(true);
    }, [phone]);

    useEffect(() => {
        if (certifNum === undefined) return;

        if (certifNum.length < 6) {
            setIsPossibleCertifNum(false);
            return;
        }

        /**
         * @todo: 인증번호 유효성 검사 추가
         */

        setIsPossibleCertifNum(true);
    }, [certifNum]);

    const handleInputPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isCheckReceive) return; // 인증 버튼 클릭 한 후임
        setPhone(e.target.value);
    };

    const handleInputCertifNum = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCertifNum(e.target.value);
    };

    const handleCertifBtn = async () => {
        /**
         * @todo: 재발송 backend 통신
         */
        if (isCheckReceive) {
            alert('인증번호가 재발급되었습니다.');
            setIsExpired(false); // 만료 x
            return;
        }

        /**
         * @todo: 인증번호 발송 backend 통신
         */

        if (!phone) return;
        const isComplete = await SignupAPI.certifyPhoneNumber(phone);

        if (isComplete) {
            alert('인증번호가 전송되었습니다.');
            setIsCheckReceive(true);
        }
    };

    /**
     * @todo: 인증번호 확인 backend 통신
     */
    const handleCheckCertifNum = (): void => {
        // 현재 입력받은 인증번호 : certifNum
        // req : certifNum, phone
        // res : 성공 여부
    };

    useEffect(() => {
        if (isCorrectCertifNum) {
            setIsPossibleInput(true);
        }
    }, [isCorrectCertifNum]);

    return (
        <>
            {/* 전화번호 */}
            <div>
                <div className={styles.inputTitle}>전화번호</div>
                <div className={styles.phoneBox}>
                    <img src={phoneSrc} alt="휴대폰 아이콘" />
                    <input
                        name="phone"
                        value={phone || ''}
                        onChange={handleInputPhone}
                        type="text"
                        placeholder="전화번호를 입력하세요."
                        autoFocus
                    />
                    <button ref={certifBtn} onClick={handleCertifBtn}>
                        {isCheckReceive ? '재발송 하기' : '인증번호 받기'}
                    </button>
                </div>
                <div
                    className={
                        phone && phone?.length > 0
                            ? [styles.bottomBlueBorder, styles.bottomLine].join(' ')
                            : [styles.nonBorder, styles.bottomLine].join(' ')
                    }
                ></div>
                <div className={styles.orderText}>하이픈(-)을 제외한 11자리 숫자로 입력해주세요.</div>
            </div>
            <br />
            {/* 인증번호 */}
            <div className={isCheckReceive ? styles.show : styles.unshow}>
                <div className={styles.inputTitle}>인증번호</div>
                <div className={styles.certifBox}>
                    <input
                        name="certifNum"
                        value={certifNum || ''}
                        onChange={handleInputCertifNum}
                        type="password"
                        placeholder="인증번호를 입력하세요."
                    />
                    <div>{isCheckReceive && !isExpired ? <Timer setIsExpired={setIsExpired} /> : '00:00'}</div>
                    <button ref={certifChkBtn} onClick={handleCheckCertifNum}>
                        확인하기
                    </button>
                </div>
                <div
                    className={
                        certifNum && certifNum?.length > 0
                            ? [styles.bottomBlueBorder, styles.bottomLine].join(' ')
                            : [styles.nonBorder, styles.bottomLine].join(' ')
                    }
                ></div>
                <div className={styles.orderText}>휴대폰으로 수신받은 인증번호를 입력해주세요.</div>
            </div>
        </>
    );
};

export default PhonePage;
