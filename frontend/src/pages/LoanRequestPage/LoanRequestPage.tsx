import { useState } from 'react';
import { useNavigate } from 'react-router';
import PageFrame from '../../common/components/PageFrame/PageFrame';
import PageHeader from '../../common/components/PageHeader/PageHeader';
import ContentsFrame from '../../common/components/ContentsFrame/ContentsFrame';
import Pages from '../../common/constants/Pages';
import LoanUsageBottomSheet from '../../features/Loan/components/LoanUsageBottomSheet/LoanUsageBottomSheet';

import styles from './LoanRequestPage.module.css';
import useInput from '../../common/hooks/useInput';

const LoanRequestPage = () => {
    const navigate = useNavigate();
    const [usage, setUsage] = useState<string>(''); // 용도 선택 값
    const [isOpenUsageModal, setIsOpenUsageModal] = useState<boolean>(false); // 용돈 사용 용도 모달 flag
    const [reqMoney, handleReqMoney, setReqMoney] = useInput('');
    const [repay, handleSetRepay, setRepay] = useInput('');

    return (
        <PageFrame>
            <PageHeader
                text="대출 받기"
                handleIcon={() => {
                    navigate('/');
                }}
            />
            <ContentsFrame page={Pages.LOAN_REQUEST}>
                <div className={styles.toptitle}>대출 용도 및 현재 자산의 상태를 입력해주세요</div>
                <div className={styles.inputContainer}>
                    <div className={styles.title}>대출받은 용돈을 어디에 쓸 계획이신가요?</div>
                    <div
                        className={styles.inputBox}
                        onClick={() => {
                            setIsOpenUsageModal(true);
                        }}
                    >
                        <span>대출 용도</span>
                        <button>선택하기</button>
                    </div>
                </div>
                <div className={styles.inputContainer}>
                    <div className={styles.title}>얼마의 돈을 빌릴 계획인가요?</div>
                    <div className={styles.inputBox}>
                        <input placeholder="대출 요청 금액" />
                        <button>입력하기</button>
                    </div>
                </div>
                <div className={styles.inputContainer}>
                    <div className={styles.title}>어떻게 돈을 갚으실 예정이신가요?</div>
                    <div className={styles.inputBox}>
                        <input placeholder="구제 방법" />
                        <button>입력하기</button>
                    </div>
                </div>
            </ContentsFrame>
            <div className={styles.btn}>
                <button>신청하기</button>
            </div>
            {isOpenUsageModal && (
                <LoanUsageBottomSheet
                    height="500px"
                    onClose={() => {
                        setIsOpenUsageModal(false);
                    }}
                />
            )}
        </PageFrame>
    );
};

export default LoanRequestPage;
