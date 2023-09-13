import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageFrame from '../../common/components/PageFrame/PageFrame';
import PageHeader from '../../common/components/PageHeader/PageHeader';
import ContentsFrame from '../../common/components/ContentsFrame/ContentsFrame';
import styles from './AccountConnectPage.module.css';
import Pages from '../../common/constants/Pages';

// 계좌 입력 페이지
const AccNumInputPage = () => {
    return (
        <>
            <div className={styles.topTitle}>
                계좌를 연결하기 위해
                <br /> 계좌 인증을 진행해주세요
            </div>
            <div className={styles.space}></div>
            <div>
                <div className={styles.title}>계좌번호</div>
                <div className={styles.subtitle}>기존에 등록된 신한은행 계좌번호를 입력해주세요</div>
                <div className={styles.inputBox}>
                    <input type="text" placeholder="계좌번호 입력" />
                </div>
            </div>
            <div className={styles.bottomText}>
                아직 등록된 계좌가 없으신가요? <span>신한은행 가기</span>
            </div>
        </>
    );
};

// 계좌 1원 인증 페이지
const OneCertifInputPage = () => {
    return (
        <>
            <div className={styles.topTitle}>
                계좌 입금내역에 있는
                <br /> 4자리 글자를 입력해주세요
            </div>
            <div className={styles.space}></div>
            <div>
                <div className={styles.title}>입금자명</div>
                <div className={styles.subtitle}>거래 내역에 있는 입금자명을 확인해주세요</div>
                <div className={styles.inputBox}>
                    <input type="text" placeholder="계좌번호 입력" />
                </div>
            </div>
            <div className={styles.bottomText}>
                다른 계좌로 변경하시겠어요? <span>계좌 변경하기</span>
            </div>
        </>
    );
};

const AccountConnectPage = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);

    const makeContents = () => {
        if (page === 0) return <AccNumInputPage />;
        else if (page === 1) return <OneCertifInputPage />;
    };

    const handleBtn = () => {
        if (page === 0) {
            // @todo : 1원 인증정보 전송

            // 성공 시 다음페이지로
            setPage(1);
        } else if (page === 1) {
            // @todo : 인증하기
            // 인증 성공 시 계좌 생성 후 메인페이지로
            // 인증 실패 시 재인증 버튼으로 바꾸기
        }
    };

    return (
        <PageFrame>
            <PageHeader
                text="계좌 연결하기"
                handleIcon={() => {
                    navigate('/');
                }}
            />
            <div className={styles.page}>
                <div className={styles.contents}>{makeContents()}</div>
                <div className={styles.btnBox}>
                    <button onClick={handleBtn}>내 계좌로 1원 보내기</button>
                </div>
            </div>
        </PageFrame>
    );
};

export default AccountConnectPage;
