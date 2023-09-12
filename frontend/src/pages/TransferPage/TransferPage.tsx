import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PageHeader from '../../common/components/PageHeader/PageHeader';
import Pages from '../../common/constants/Pages';
import PageFrame from '../../common/components/PageFrame/PageFrame';
import ContentsFrame from '../../common/components/ContentsFrame/ContentsFrame';

import useInput from '../../common/hooks/useInput';
import { SendTransferInfo } from '../../common/types/account.types';
import styles from './TransferPage.module.css';
import AccountAPI from '../../features/Account/apis/AccountAPI';

const TransferPage = () => {
    const [accountNum, setAccountNum] = useInput('');
    const [transferMoney, setTransferMoney] = useInput('');

    const [isSend, setIsSend] = useState(false); // 모달 띄우기 위한 flag

    const makeBtn = () => {
        const btnList = [
            ['+100만', 1000000],
            ['+10만', 100000],
            ['+5만', 50000],
            ['+1만', 10000],
            ['전액', 0],
        ];

        return (
            <>
                {btnList.map(([text, money], idx) => {
                    return (
                        <button key={idx} value={money} onClick={setTransferMoney}>
                            {text}
                        </button>
                    );
                })}
            </>
        );
    };

    /**
     * 계좌 이체 back 통신
     */
    const handleSend = async () => {
        const sendData: SendTransferInfo = {
            accountNum: accountNum,
            transferMoney: transferMoney,
        };

        try {
            const isComplete: boolean = await AccountAPI.transferMoney(sendData);

            if (isComplete) {
                setIsSend(true);
            }
        } catch (err) {
            // @todo: 에러 메세지 추가
            alert(err);
        }
    };

    return (
        <PageFrame page={Pages.TRANSFER}>
            <PageHeader text="이체 하기" />
            <ContentsFrame>
                <div className={styles.inputContainer}>
                    <div className={styles.title}>출금계좌번호</div>
                    <div className={styles.subTitle}>돈을 보낼 계좌를 입력해주세요</div>
                    <div className={styles.input}>
                        <input value={accountNum} onChange={setAccountNum} placeholder="ex) 123-45-678910" />
                    </div>
                </div>
                <div className={styles.inputContainer}>
                    <div className={styles.title}>이체 금액</div>
                    <div className={styles.subTitle}>보낼 금액을 입력해주세요</div>
                    <div>{makeBtn()}</div>
                    <div className={styles.input}>
                        <input value={transferMoney} onChange={setTransferMoney} placeholder="" />
                        <span>원</span>
                    </div>
                </div>
            </ContentsFrame>
            {/* 보내기 버튼 */}
            <button className={styles.sendBtn} onClick={handleSend}>
                보내기
            </button>
        </PageFrame>
    );
};

export default TransferPage;
