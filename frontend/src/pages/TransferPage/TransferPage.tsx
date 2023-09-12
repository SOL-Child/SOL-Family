import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PageHeader from '../../common/components/PageHeader/PageHeader';
import Pages from '../../common/constants/Pages';
import PageFrame from '../../common/components/PageFrame/PageFrame';
import ContentsFrame from '../../common/components/ContentsFrame/ContentsFrame';

import useInput from '../../common/hooks/useInput';
import { SendTransferInfo } from '../../common/types/account.types';
import deleteBtnSrc from '../../common/images/SF_delete_button.png';
import styles from './TransferPage.module.css';
import AccountAPI from '../../features/Account/apis/AccountAPI';

const TransferPage = () => {
    const [accountNum, handleAccountNum, setAccountNum] = useInput('');
    const [transferMoney, handleTransferMoney, setTransferMoney] = useInput('');

    const [isSend, setIsSend] = useState(false); // 모달 띄우기 위한 flag
    const navigate = useNavigate();

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
                        <button className={styles.btn} key={idx} value={money} onClick={handleTransferMoney}>
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
        setIsSend(true);
        return;

        const sendData: SendTransferInfo = {
            accountNum: accountNum,
            transferMoney: transferMoney,
        };

        try {
            const isComplete: boolean = await AccountAPI.transferMoney(sendData);

            if (isComplete) {
                setIsSend(true);

                // @todo: 모달이 닫혔으면 메인화면으로 이동하기
            }
        } catch (err: any) {
            alert(err.response.data.dataHeader.resultMessage);
        }
    };

    return (
        <PageFrame page={Pages.TRANSFER}>
            <PageHeader text="이체 하기" handleIcon={() => navigate('/')} />
            <ContentsFrame>
                <div className={styles.inputContainer}>
                    <div className={styles.title}>출금계좌번호</div>
                    <div className={styles.subTitle}>돈을 보낼 계좌를 입력해주세요</div>
                    <div className={styles.input}>
                        <input
                            className={styles.accoutInput}
                            value={accountNum}
                            onChange={handleAccountNum}
                            placeholder="ex) 123-45-678910"
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
                    <div className={styles.orderText}>하이픈(-)이 없는 숫자 형태로 입력해주세요</div>
                </div>
                <div className={styles.inputContainer}>
                    <div className={styles.title}>이체 금액</div>
                    <div className={styles.subTitle}>보낼 금액을 입력해주세요</div>
                    <div>{makeBtn()}</div>
                    <div className={styles.input}>
                        <input
                            className={styles.moneyInput}
                            value={transferMoney}
                            onChange={handleTransferMoney}
                            placeholder=""
                        />
                        <div
                            className={styles.deleteBox}
                            onClick={() => {
                                setTransferMoney('');
                            }}
                        >
                            {transferMoney && transferMoney.length > 0 ? (
                                <img className={styles.deleteImg} src={deleteBtnSrc} alt="취소 버튼" />
                            ) : (
                                <div></div>
                            )}
                        </div>
                        <span className={styles.moneyText}>원</span>
                    </div>
                    <div
                        className={
                            transferMoney && transferMoney.length > 0
                                ? `${[styles.showline, styles.line].join(' ')}`
                                : `${[styles.unshowline, styles.line].join(' ')}`
                        }
                    ></div>
                    <div className={styles.orderText}></div>
                </div>
            </ContentsFrame>
            <button className={styles.sendBtn} onClick={handleSend}>
                보내기
            </button>
        </PageFrame>
    );
};

export default TransferPage;
