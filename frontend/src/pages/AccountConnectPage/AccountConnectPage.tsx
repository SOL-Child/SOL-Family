import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageFrame from '../../common/components/PageFrame/PageFrame';
import PageHeader from '../../common/components/PageHeader/PageHeader';
import styles from './AccountConnectPage.module.css';
import deleteBtnSrc from '../../common/images/SF_delete_button.png';
import useInput from '../../common/hooks/useInput';
import Timer from '../../features/Signup/components/Timer/Timer';

// 계좌 입력 페이지
const AccNumInputPage = () => {
    const [accountNum, handleAccountNum, setAccountNum] = useInput('');

    return (
        <div className={styles.contents}>
            <div className={styles.topTitle}>
                계좌를 연결하기 위해
                <br /> 계좌 인증을 진행해주세요
            </div>
            <div className={styles.space}></div>
            <div>
                <div className={styles.title}>계좌번호</div>
                <div className={styles.subtitle}>기존에 등록된 신한은행 계좌번호를 입력해주세요</div>
                <div className={styles.inputBox}>
                    <div className={styles.input}>
                        <input
                            className={styles.moneyInput}
                            value={accountNum}
                            onChange={handleAccountNum}
                            placeholder="계좌번호 입력"
                        />
                        <div
                            className={styles.deleteBox}
                            onClick={() => {
                                setAccountNum('');
                            }}
                        >
                            {accountNum && accountNum.length > 0 ? (
                                <img className={styles.deleteImg} src={deleteBtnSrc} alt="취소 버튼" />
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                    <div
                        className={
                            accountNum && accountNum.length > 0
                                ? `${[styles.showline, styles.line].join(' ')}`
                                : `${[styles.unshowline, styles.line].join(' ')}`
                        }
                    ></div>
                </div>
            </div>
        </div>
    );
};

// 계좌 1원 인증 페이지
const OneCertifInputPage = () => {
    const [certifText, handleCertifText, setCertifText] = useInput('');

    return (
        <div className={styles.contents}>
            <div className={styles.topTitle}>
                계좌 입금내역에 있는
                <br /> 4자리 글자를 입력해주세요
            </div>
            <div className={styles.space}></div>
            <div>
                <div className={styles.title}>입금자명</div>
                <div className={styles.subtitle}>거래 내역에 있는 입금자명을 확인해주세요</div>
                <div className={styles.inputBox}>
                    <div className={styles.input}>
                        <input
                            className={styles.moneyInput}
                            value={certifText}
                            onChange={handleCertifText}
                            placeholder="입금자명 입력"
                        />
                        <div
                            className={styles.deleteBox}
                            onClick={() => {
                                setCertifText('');
                            }}
                        >
                            {certifText && certifText.length > 0 ? (
                                <img className={styles.deleteImg} src={deleteBtnSrc} alt="취소 버튼" />
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                    <div
                        className={
                            certifText && certifText.length > 0
                                ? `${[styles.showline, styles.line].join(' ')}`
                                : `${[styles.unshowline, styles.line].join(' ')}`
                        }
                    ></div>
                </div>
            </div>
        </div>
    );
};

const AccountConnectPage = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(0);
    let content: null | JSX.Element = null;

    const [isExpired, setIsExpired] = useState<boolean>(false);

    if (page === 0) content = <AccNumInputPage />;
    else if (page === 1) content = <OneCertifInputPage />;

    const handleBtn = () => {
        if (page === 0) {
            // @todo : 1원 인증정보 전송

            // 성공 시 다음페이지로
            setPage(page + 1);
        } else if (page === 1) {
            // 만료 시 재발급
            if (isExpired) {
                if (window.confirm('재발송되었습니다. 계좌의 입금 내역을 확인해주세요')) {
                    // @todo: 재발급 통신
                    setIsExpired(false);
                }
            }

            // 만료 안됨
            else {
                // @todo: 인증 확인 통신
                // 인증 성공 시 계좌 생성 후 메인페이지로
                // 인증 실패 시 재인증 버튼으로 바꾸기
            }
        }
    };

    const handleIcon = () => {
        if (page === 0) {
            navigate('/');
        } else if (page === 1) {
            setPage(page - 1);
        }
    };

    const setText = () => {
        if (page === 0) {
            return '내 계좌로 1원 보내기';
        } else {
            if (isExpired) return '재발송 하기';
            return '인증하기';
        }
    };

    return (
        <PageFrame>
            <PageHeader text="계좌 연결하기" handleIcon={handleIcon} />
            <div className={styles.page}>
                <>{content}</>
                <div className={styles.bottomText}>
                    {page === 0 ? (
                        <>
                            아직 등록된 계좌가 없으신가요? &nbsp;&nbsp;&nbsp;
                            <span
                                onClick={() => {
                                    navigate('');
                                }}
                            >
                                신한은행 가기
                            </span>
                        </>
                    ) : (
                        <>
                            다른 계좌로 변경하시겠어요? &nbsp;&nbsp;&nbsp;
                            <span
                                onClick={() => {
                                    setPage(0);
                                }}
                            >
                                계좌 변경하기
                            </span>
                        </>
                    )}
                </div>
                <div className={styles.btnBox}>
                    <button onClick={handleBtn}>
                        {setText()}{' '}
                        {page === 1 && (
                            <span>
                                (
                                {!isExpired ? (
                                    <div className={styles.timer}>
                                        <Timer setIsExpired={setIsExpired} />
                                    </div>
                                ) : (
                                    '00:00'
                                )}
                                )
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </PageFrame>
    );
};

export default AccountConnectPage;
