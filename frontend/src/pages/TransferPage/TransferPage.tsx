import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PageHeader from '../../common/components/PageHeader/PageHeader';
import Pages from '../../common/constants/Pages';
import PageFrame from '../../common/components/PageFrame/PageFrame';
import ContentsFrame from '../../common/components/ContentsFrame/ContentsFrame';

import useInput from '../../common/hooks/useInput';
import { SendTransferInfo, TransferInfo } from '../../common/types/account.types';
import deleteBtnSrc from '../../common/images/SF_delete_button.png';
import styles from './TransferPage.module.css';
import AccountAPI from '../../features/Account/apis/AccountAPI';
import TransferCheckModal from '../../features/Account/components/TransferCheckModal/TransferCheckModal';

const TransferPage = () => {
    const [accountNum, handleAccountNum, setAccountNum] = useInput('');
    const [transferMoney, handleTransferMoney, setTransferMoney] = useInput('');

    const [isOpenCheckModal, setIsOpenCheckModal] = useState<boolean>(false); // 확인 모달 flag
    const navigate = useNavigate();
    const [transferInfo, setTransferInfo] = useState<TransferInfo | null>(null);

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
        setIsOpenCheckModal(true);
        return;

        const sendData: SendTransferInfo = {
            accountNum: accountNum,
            transferMoney: transferMoney,
        };

        try {
            const data: TransferInfo = await AccountAPI.transferMoney(sendData);
            // @todo: 모달이 닫혔으면 메인화면으로 이동하기
            setTransferInfo(data); // 받은 데이터
            setIsOpenCheckModal(true);
        } catch (err: any) {
            alert(err.response.data.dataHeader.resultMessage);
        }
    };

    return (
        <PageFrame>
            <PageHeader text="이체 하기" handleIcon={() => navigate('/')} />
            <ContentsFrame page={Pages.TRANSFER}>
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
            {isOpenCheckModal && (
                <TransferCheckModal
                    width="300px"
                    height="380px"
                    isOpen={isOpenCheckModal}
                    onClose={() => {
                        setIsOpenCheckModal(false);
                    }}
                    info={transferInfo}
                />
            )}
        </PageFrame>
    );
};

export default TransferPage;
