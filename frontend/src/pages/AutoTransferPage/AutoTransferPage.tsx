import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';

import PageFrame from '../../common/components/PageFrame/PageFrame';
import PageHeader from '../../common/components/PageHeader/PageHeader';
import ContentsFrame from '../../common/components/ContentsFrame/ContentsFrame';
import AutoTransferCheckModal from '../../features/Account/components/AutoTransferCheckModal/AutoTransferCheckModal';

import useInput from '../../common/hooks/useInput';
import { AutoTransferInfo } from '../../common/types/account.types';
import deleteBtnSrc from '../../common/images/SF_delete_button.png';
import styles from './AutoTransferPage.module.css';
import Pages from '../../common/constants/Pages';

const AutoTransferPage = () => {
    const navigate = useNavigate();
    const [accountNum, handleAccountNum, setAccountNum] = useInput('');
    const [transferMoney, handleTransferMoney, setTransferMoney] = useInput('');
    const [cycle, setCycle] = useState<'oneWeek' | 'twoWeek' | 'oneMonth' | string>('');
    const [selectedDate, handleSelectedDate] = useInput('');
    const [isOpenCheckModal, setIsOpenCheckModal] = useState<boolean>(false);
    const [autoTransferInfo, setAutoTransferInfo] = useState<AutoTransferInfo | null>(null);

    // @todo: 버튼 클릭 시 배경색 고정 구현
    // const cycleBtnRef = useRef<HTMLButtonElement | []>([]);

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

    const makeCycleBtn = () => {
        const btnList = [
            ['1주', 'oneWeek'],
            ['2주', 'twoWeek'],
            ['한 달', 'oneMonth'],
        ];
        return (
            <>
                {btnList.map(([text, key], idx) => {
                    return (
                        <button
                            className={styles.cyclebtn}
                            key={idx}
                            value={key || ''}
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                setCycle(e.currentTarget.value);
                            }}
                        >
                            {text}
                        </button>
                    );
                })}
            </>
        );
    };

    // 자동이체 신청 함수
    const handleSend = () => {
        // @todo: 저장된 데이터 parsing후 API 연결
        const testData: AutoTransferInfo = {
            accountNum: accountNum,
            transferMoney: transferMoney,
            cycle: cycle,
            selectedDate: selectedDate,
        };

        setAutoTransferInfo(testData);
        setIsOpenCheckModal(true);
    };

    return (
        <PageFrame>
            <PageHeader
                text="자동이체 신청하기"
                handleIcon={() => {
                    navigate('/');
                }}
            />
            <ContentsFrame page={Pages.TRANSFER}>
                {/* 아이 계좌번호 */}
                <div className={styles.inputContainer}>
                    <div className={styles.title}>아이 계좌번호</div>
                    <div className={styles.subTitle}>용돈을 지급할 아이의 계좌번호를 입력해주세요</div>
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
                {/* 자동이체 금액 */}
                <div className={styles.inputContainer}>
                    <div className={styles.title}>자동이체 금액</div>
                    <div className={styles.subTitle}>지급할 용돈을 입력해주세요</div>
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
                {/* 자동이체 주기 */}
                <div className={styles.inputContainer}>
                    <div className={styles.title}>자동이체 주기</div>
                    <div className={styles.subTitle}>아이에게 용돈을 지급할 주기를 선택해주세요</div>
                    <div className={styles.cycleBtn}>{makeCycleBtn()}</div>
                    <div className={styles.orderText}></div>
                </div>
                {/* 이체 시작일 */}
                <div className={styles.inputContainer}>
                    <div className={styles.title}>이체 시작일</div>
                    <div className={styles.subTitle}>자동이체를 시작할 날짜를 선택해주세요</div>
                    <div className={styles.input}>
                        <input
                            type="date"
                            className={styles.dateInput}
                            value={selectedDate}
                            onChange={handleSelectedDate}
                            placeholder=""
                        />
                    </div>
                    <div className={styles.orderText}></div>
                </div>
            </ContentsFrame>
            <button className={styles.sendBtn} onClick={handleSend}>
                보내기
            </button>
            {isOpenCheckModal && (
                <AutoTransferCheckModal
                    width="300px"
                    height="430px"
                    isOpen={isOpenCheckModal}
                    onClose={() => {
                        setIsOpenCheckModal(false);
                    }}
                    info={autoTransferInfo}
                />
            )}
        </PageFrame>
    );
};

export default AutoTransferPage;
