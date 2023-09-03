import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ContentsFrame from '../common/components/ContentsFrame/ContentsFrame';
import Pages from '../common/constants/Pages';
import Timer from '../features/Signup/components/Timer/Timer';
import backArrowSrc from '../common/images/SF_back_arrow.png';
import nameSrc from '../common/images/SF_name_icon.png';
import phoneSrc from '../common/images/SF_phone_icon.png';
import pwSrc from '../common/images/SF_password_icon.png';
import logoSrc from '../common/images/SF_full_logo.png';

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

const NamePage = () => {
    return (
        <>
            <div className={styles.inputTitle}>이름</div>
            <div className={styles.inputBox}>
                <img src={nameSrc} alt="사람 아이콘" />
                <input type="text" placeholder="이름을 입력하세요." />
            </div>
        </>
    );
};

const PasswordPage = () => {
    return (
        <>
            <div className={styles.inputTitle}>비밀번호</div>
            <div className={styles.inputBox}>
                <img src={pwSrc} alt="자물쇠 아이콘" />
                <input type="password" placeholder="비밀번호를 입력하세요." />
            </div>
        </>
    );
};

const PhonePage = () => {
    const [isCheckReceive, setIsCheckReceive] = useState<boolean>(true); // 인증번호 받기 체크 여부

    return (
        <>
            {/* 전화번호 */}
            <div>
                <div className={styles.inputTitle}>전화번호</div>
                <div className={styles.phoneBox}>
                    <img src={phoneSrc} alt="휴대폰 아이콘" />
                    <input type="number" placeholder="전화번호를 입력하세요." />
                    <button>인증번호 받기</button>
                </div>
                <div className={styles.orderText}>하이픈(-)을 제외한 11자리 숫자로 입력해주세요.</div>
            </div>
            <br />
            {/* 인증번호 */}
            <div className={isCheckReceive ? styles.show : styles.unshow}>
                <div className={styles.inputTitle}>인증번호</div>
                <div className={styles.certifBox}>
                    <input type="password" placeholder="인증번호를 입력하세요." />
                    <div>
                        <Timer />
                    </div>
                    <button>확인하기</button>
                </div>
                <div className={styles.orderText}>휴대폰으로 수신받은 인증번호를 입력해주세요.</div>
            </div>
        </>
    );
};

const RolePage = () => {
    const [role, setRole] = useState<null | string>(null);

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

    switch (page) {
        case 0:
            content = <IntroPage />;
            break;
        case 1:
            content = <NamePage />;
            break;
        case 2:
            content = <PasswordPage />;
            break;
        case 3:
            content = <PhonePage />;
            break;
        case 4:
            content = <RolePage />;
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
        setPage(page - 1);
    };

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
                    이미 가입하셨나요? &nbsp;&nbsp;&nbsp;<span>로그인하기</span>
                </div>
                <button onClick={() => setPage(page + 1)}>{setBtnText()}</button>
            </div>
        </ContentsFrame>
    );
};

export default SignupPage;
