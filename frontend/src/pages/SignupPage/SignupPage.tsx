import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import PageFrame from '../../common/components/PageFrame/PageFrame';
import Pages from '../../common/constants/Pages';
import IntroPage from '../../features/Signup/components/IntroPage/IntroPage';
import NamePage from '../../features/Signup/components/NamePage/NamePage';
import PasswordPage from '../../features/Signup/components/PasswordPage/PasswordPage';
import PhonePage from '../../features/Signup/components/PhonePage/PhonePage';
import RolePage from '../../features/Signup/components/RolePage/RolePage';

import backArrowSrc from '../../common/images/SF_back_arrow.png';
import logoSrc from '../../common/images/SF_full_logo.png';

import styles from './SignupPage.module.css';
import { UserInfo } from '../../common/types/user.types';

import SignupAPI from '../../features/Signup/apis/SignupAPI';
import { getTokenVal } from '../../firebase-messaging-sw';

const SignupPage = () => {
    const [page, setPage] = useState<number>(0); // 0부터 4페이지까지
    let content: null | JSX.Element = null; // 페이지 안의 컨텐츠

    const navigate = useNavigate();
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const [isPossibleInput, setIsPossibleInput] = useState<boolean>(true); // 현재 페이지에서 입력이 끝났는지 확인하는 변수
    const [currentInput, setCurrentInput] = useState<string | number | null>(null); // 현재 페이지에서 입력되고 있는 값

    const [isPossibleSend, setIsPossibleSend] = useState<boolean>(false);

    const initialState: UserInfo = {
        name: '',
        password: '',
        passwordCheck: '',
        phone: '',
        userType: '',
        fcmToken: '',
    };

    const [userInfo, setUserInfo] = useState<UserInfo>(initialState);

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
                passwordCheck: '',
            }));
        } else if (page === 3) {
            setUserInfo((prev) => ({
                ...prev,
                phone: '',
            }));
        } else if (page === 4) {
            setUserInfo((prev) => ({
                ...prev,
                userType: '',
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
                passwordCheck: currentInput ? String(currentInput) : '',
            }));
        } else if (page === 3) {
            setUserInfo((prev) => ({
                ...prev,
                phone: currentInput ? String(currentInput) : '',
            }));
        } else if (page === 4) {
            setUserInfo((prev) => ({
                ...prev,
                userType: currentInput ? String(currentInput) : '',
            }));

            setIsPossibleSend(true); // 회원가입 가능
            return;
        }

        setPage(page + 1);
    };

    useEffect(() => {
        const signup = async () => {
            if (isPossibleSend) {
                // req : userInfo
                // res : accesstoken, user정보
                const token = await getTokenVal();

                const sendData: UserInfo = {
                    name: userInfo.name,
                    password: userInfo.password,
                    passwordCheck: userInfo.passwordCheck,
                    phone: userInfo.phone,
                    userType: userInfo.userType,
                    fcmToken: token,
                };

                console.log(sendData);

                try {
                    const isComplete: boolean = await SignupAPI.registerUser(sendData);
                    if (isComplete) {
                        alert('회원 가입되었습니다.');
                        navigate('/login');
                    }
                } catch (err: any) {
                    alert(err);
                }
            }
        };

        signup();
    }, [isPossibleSend]);

    return (
        <PageFrame>
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
                        <div className={styles.progressBarText}>{`${(page / 4) * 100} %`} </div>
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
        </PageFrame>
    );
};

export default SignupPage;
