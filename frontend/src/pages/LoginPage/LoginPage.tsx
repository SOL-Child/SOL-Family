import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import ContentsFrame from '../../common/components/ContentsFrame/ContentsFrame';
import LoginAPI from '../../features/Login/apis/LoginAPI';
import LocalStorageUtil from '../../features/Login/utils/LocalStorageUtil';
import { ReceiveUserInfo, SendUserInfo } from '../../common/types/user.types';

import Pages from '../../common/constants/Pages';
import logoSrc from '../../common/images/SF_full_logo.png';
import phoneSrc from '../../common/images/SF_phone_icon.png';
import pwSrc from '../../common/images/SF_password_icon.png';

import styles from './LoginPage.module.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const [phone, setPhone] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [isPossibleSend, setIsPossibleSend] = useState<boolean>(false);

    const handlePhone = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPhone(e.target.value);
    };

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
    };

    useEffect(() => {
        if (phone === null || phone === '' || phone.length < 11 || Number.isNaN(phone)) {
            setIsPossibleSend(false);
            return;
        }

        const num = /^[0-9]+$/;

        if (!num.test(phone)) {
            setIsPossibleSend(false);
            return;
        }

        if (password === null || password === '' || password.length < 8) {
            setIsPossibleSend(false);
            return;
        }
        setIsPossibleSend(true);
    }, [phone, password]);

    useEffect(() => {
        if (buttonRef.current === null) return;

        if (isPossibleSend) {
            buttonRef.current.style.backgroundColor = '#0046FF';
            buttonRef.current.style.cursor = 'pointer';
        } else {
            buttonRef.current.style.backgroundColor = '#D9D9D9';
            buttonRef.current.style.cursor = 'auto';
        }
    }, [isPossibleSend]);

    const handleLogin = async () => {
        if (!isPossibleSend) return;

        const userInfo: SendUserInfo = {
            phone: phone || '',
            password: password || '',
        };

        try {
            const data: ReceiveUserInfo = await LoginAPI.loginUser(userInfo);
            LocalStorageUtil.saveLocalStorage(data);
        } catch (err) {
            alert(err);
        }
    };

    return (
        <ContentsFrame page={Pages.LOGIN}>
            {/* 헤더 */}
            <div className={styles.headBox}>
                <div className={styles.prevImgBox}>
                    <img src={logoSrc} className={styles.logoImg} alt="로고 아이콘" onClick={() => navigate('/')} />
                </div>
            </div>
            {/* 컨텐츠 */}
            <div className={styles.contentBox}>
                <div className={styles.loginTitle}>
                    돌아오신것을 <br />
                    환영해요 !
                </div>
                <div className={styles.loginText}>
                    <span>&nbsp;로그인</span>을 진행해주세요.
                    <div className={styles.loginFontBox}></div>
                </div>
                <>
                    <div className={styles.inputTitle}>전화번호</div>
                    <div className={styles.inputBox}>
                        <img src={phoneSrc} alt="전화 아이콘" />
                        <input
                            name="phone"
                            value={phone || ''}
                            onChange={handlePhone}
                            type="text"
                            placeholder="전화번호를 입력하세요."
                        />
                    </div>
                    <div
                        className={
                            phone && phone?.length > 0
                                ? [styles.bottomBlueBorder, styles.bottomLine].join(' ')
                                : [styles.nonBorder, styles.bottomLine].join(' ')
                        }
                    ></div>
                    <div className={styles.orderText}>하이픈(-)을 제외한 11자리 숫자로 입력해주세요.</div>
                </>
                <br />
                <>
                    <div className={styles.inputTitle}>비밀번호</div>
                    <div className={styles.inputBox}>
                        <img src={pwSrc} alt="자물쇠 아이콘" />
                        <input
                            name="password"
                            value={password || ''}
                            onChange={handlePassword}
                            type="password"
                            placeholder="비밀번호를 입력하세요."
                        />
                    </div>
                    <div
                        className={
                            password && password?.length > 0
                                ? [styles.bottomBlueBorder, styles.bottomLine].join(' ')
                                : [styles.nonBorder, styles.bottomLine].join(' ')
                        }
                    ></div>
                    <div className={styles.orderText}></div>
                </>
            </div>
            {/* 하단 버튼 */}
            <div className={styles.buttonBox}>
                <div>
                    아직 회원이 아니신가요? &nbsp;&nbsp;&nbsp;{' '}
                    <span onClick={() => navigate('/signup')}>회원가입하기</span>
                </div>
                <button ref={buttonRef} onClick={handleLogin}>
                    로그인 하러가기
                </button>
            </div>
        </ContentsFrame>
    );
};

export default LoginPage;
