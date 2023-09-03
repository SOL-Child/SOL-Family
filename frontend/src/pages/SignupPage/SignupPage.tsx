import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import ContentsFrame from '../../common/components/ContentsFrame/ContentsFrame';
import Pages from '../../common/constants/Pages';
import Timer from '../../features/Signup/components/Timer/Timer';
import backArrowSrc from '../../common/images/SF_back_arrow.png';
import nameSrc from '../../common/images/SF_name_icon.png';
import phoneSrc from '../../common/images/SF_phone_icon.png';
import pwSrc from '../../common/images/SF_password_icon.png';
import logoSrc from '../../common/images/SF_full_logo.png';

// css
import styles from './SignupPage.module.css';

const IntroPage = () => {
    return (
        <>
            <div className={styles.introTitle}>
                가입 후 쏠패밀리를 <br />
                마음껏 사용하세요.
            </div>
            <div className={styles.introText}>
                <span>&nbsp;회원가입</span>을 진행해주세요.
                <div className={styles.introFontBox}></div>
            </div>
        </>
    );
};

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
    const [certifNum, setCertifNum] = useState<string | undefined>(undefined); // 인증 번호
    const [isExpired, setIsExpired] = useState<boolean>(false); // 인증 번호 만료 or 실패 여부
    const [isCorrectCertifNum, setIsCorrectCertifNum] = useState<boolean>(true); // 인증번호 성공 여부

    const certifBtn = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (certifBtn.current === null) return;

        if (isPossiblePhone) {
            certifBtn.current.style.backgroundColor = '#0046FF';
        } else {
            certifBtn.current.style.backgroundColor = '#D9D9D9';
        }
    }, [isPossiblePhone]);

    useEffect(() => {
        if (phone === undefined) return;

        if (phone.length < 11 || phone.length > 11) {
            setIsPossiblePhone(false);
            return;
        }

        if (Number.isNaN(phone)) {
            setIsPossiblePhone(false);
            return;
        }

        setCurrentInput(phone);
        setIsPossiblePhone(true);
    }, [phone]);

    const handleInputPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isCheckReceive) return; // 인증 버튼 클릭 한 후임
        setPhone(e.target.value);
    };

    const handleInputCertifNum = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCertifNum(e.target.value);
    };

    const handleCertifBtn = (): void => {
        /**
         * @todo: 재발송 backend 통신
         */
        if (isCheckReceive) {
            alert('인증번호가 재발급되었습니다.');
            setIsExpired(false); // 만료 x
            return;
        }

        alert('인증번호가 전송되었습니다.');
        setIsCheckReceive(true);
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
                    />
                    <button ref={certifBtn} onClick={handleCertifBtn}>
                        {isCheckReceive ? '재발송 하기' : '인증번호 받기'}
                    </button>
                </div>
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
                    <button onClick={handleCheckCertifNum}>확인하기</button>
                </div>
                <div className={styles.orderText}>휴대폰으로 수신받은 인증번호를 입력해주세요.</div>
            </div>
        </>
    );
};

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
                        className={role === 'child' ? styles.clicked : styles.nonClicked}
                        onClick={() => {
                            setRole('child');
                        }}
                    >
                        <div>아이</div>
                    </button>
                    <button
                        className={role === 'parent' ? styles.clicked : styles.nonClicked}
                        onClick={() => setRole('parent')}
                    >
                        <div>부모</div>
                    </button>
                </div>
            </div>
        </>
    );
};

const SignupPage = () => {
    const [page, setPage] = useState<number>(0); // 0부터 4페이지까지
    let content: null | JSX.Element = null; // 페이지 안의 컨텐츠

    const navigate = useNavigate();
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const [isPossibleInput, setIsPossibleInput] = useState<boolean>(true); // 현재 페이지에서 입력이 끝났는지 확인하는 변수
    const [currentInput, setCurrentInput] = useState<string | number | null>(null); // 현재 페이지에서 입력되고 있는 값

    const [isPossibleSend, setIsPossibleSend] = useState<boolean>(false);

    interface UserInfo {
        name: string;
        password: string;
        phone: string;
        user_type: string;
    }

    const initialState: UserInfo = {
        name: '',
        password: '',
        phone: '',
        user_type: '',
    };

    const [userInfo, setUserInfo] = useState<UserInfo>(initialState);

    console.log(userInfo);
    useEffect(() => {
        if (page === 0) {
            setIsPossibleInput(true);
        } else {
            setIsPossibleInput(false);
        }
    }, [page]);

    useEffect(() => {
        if (buttonRef.current === null) return;

        if (isPossibleInput) {
            buttonRef.current.style.backgroundColor = '#0046FF';
            buttonRef.current.style.cursor = 'pointer';
        } else {
            buttonRef.current.style.backgroundColor = '#D9D9D9';
            buttonRef.current.style.cursor = 'auto';
        }
    }, [isPossibleInput]);

    switch (page) {
        case 0:
            content = <IntroPage />;
            break;
        case 1:
            content = <NamePage setIsPossibleInput={setIsPossibleInput} setCurrentInput={setCurrentInput} />;
            break;
        case 2:
            content = <PasswordPage setIsPossibleInput={setIsPossibleInput} setCurrentInput={setCurrentInput} />;
            break;
        case 3:
            content = <PhonePage setIsPossibleInput={setIsPossibleInput} setCurrentInput={setCurrentInput} />;
            break;
        case 4:
            content = <RolePage setIsPossibleInput={setIsPossibleInput} setCurrentInput={setCurrentInput} />;
            break;
    }

    const setBtnText = (): string => {
        let str = '다음으로 가기';

        if (page === 0) {
            str = '가입 하러가기';
        } else if (page === 4) {
            str = '회원가입 하기';
        }

        return str;
    };

    // 이전 페이지로 이동하는 함수
    const handleClickPrev = (): void => {
        if (page === 1) {
            setUserInfo((prev) => ({
                ...prev,
                name: '',
            }));
        } else if (page === 2) {
            setUserInfo((prev) => ({
                ...prev,
                password: '',
            }));
        } else if (page === 3) {
            setUserInfo((prev) => ({
                ...prev,
                phone: '',
            }));
        } else if (page === 4) {
            setUserInfo((prev) => ({
                ...prev,
                user_type: '',
            }));
        }

        setPage(page - 1);
    };

    const handleClickNext = (): void => {
        if (!isPossibleInput) return;

        if (page === 1) {
            setUserInfo((prev) => ({
                ...prev,
                name: currentInput ? String(currentInput) : '',
            }));
        } else if (page === 2) {
            setUserInfo((prev) => ({
                ...prev,
                password: currentInput ? String(currentInput) : '',
            }));
        } else if (page === 3) {
            setUserInfo((prev) => ({
                ...prev,
                phone: currentInput ? String(currentInput) : '',
            }));
        } else if (page === 4) {
            setUserInfo((prev) => ({
                ...prev,
                user_type: currentInput ? String(currentInput) : '',
            }));

            setIsPossibleSend(true); // 회원가입 가능
            return;
        }

        setPage(page + 1);
    };

    useEffect(() => {
        if (isPossibleSend) {
            /**
             * @todo: 회원가입 백엔드 통신
             */
            // req : userInfo
            // res : accesstoken, user정보
        }
    }, [isPossibleSend]);

    return (
        <ContentsFrame page={Pages.SIGN_UP}>
            {/* 헤더 */}
            <div className={styles.headBox}>
                <div className={styles.prevImgBox}>
                    {page === 0 ? (
                        <img src={logoSrc} className={styles.logoImg} alt="로고 아이콘" onClick={() => navigate('/')} />
                    ) : (
                        <img
                            src={backArrowSrc}
                            className={styles.backImg}
                            alt="뒤로가기 아이콘"
                            onClick={handleClickPrev}
                        />
                    )}
                </div>
            </div>
            {/* 컨텐츠 */}
            <div className={styles.contentBox}>
                {page != 0 && typeof page === 'number' && (
                    <>
                        <div className={styles.progressBar}>
                            <div style={{ width: `${(page / 4) * 100}%` }}></div>
                        </div>
                        <div className={styles.progressBarText}>{page} / 4</div>
                    </>
                )}
                {/* 실제 컨텐츠 */}
                <div className={styles.contentFrame}>{content}</div>
            </div>
            {/* 하단 버튼 */}
            <div className={styles.buttonBox}>
                <div>
                    이미 가입하셨나요? &nbsp;&nbsp;&nbsp; <span onClick={() => navigate('/login')}>로그인하기</span>
                </div>
                <button ref={buttonRef} onClick={handleClickNext}>
                    {setBtnText()}
                </button>
            </div>
        </ContentsFrame>
    );
};

export default SignupPage;
