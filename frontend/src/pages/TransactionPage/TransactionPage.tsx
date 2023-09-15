import { useState } from 'react';
import PageFrame from '../../common/components/PageFrame/PageFrame';
import ContentsFrame from '../../common/components/ContentsFrame/ContentsFrame';
import Pages from '../../common/constants/Pages';
import backSrc from '../../common/images/SF_back_icon_white.png';

import styles from './TransactionPage.module.css';
import { useNavigate } from 'react-router-dom';

const AllTransactionInfo = () => {
    const transactionInfo = [];

    return (
        <>
            <div>
                <div>전체 거래 내역</div>
                <div>총 2건</div>
            </div>
            <div>{}</div>
        </>
    );
};

const ExpenditureInfo = () => {
    return <div>지출 내역</div>;
};

const TransactionPage = () => {
    const navigate = useNavigate();
    const [selectedValue, setSelectedValue] = useState<string | 'expenditure' | 'all'>('all');
    let contents: JSX.Element | null = null;

    if (selectedValue === 'expenditure') {
        contents = <AllTransactionInfo />;
    } else {
        contents = <ExpenditureInfo />;
    }

    return (
        <PageFrame>
            <div className={styles.header}>
                <div className={styles.icon}>
                    <img
                        src={backSrc}
                        onClick={() => {
                            navigate('/');
                        }}
                        alt="뒤로가기 이미지"
                    />
                </div>
                <div className={styles.headText}>{selectedValue === 'all' ? '거래내역 확인' : '지출내역 확인'}</div>
                <div></div>
            </div>
            <ContentsFrame page={Pages.TRANSACTION}>
                {/* 요약 정보 */}
                <div className={styles.summary}>
                    <div className={styles.money}>
                        <div>8월 거래 내역</div>
                        {selectedValue === 'all' ? (
                            <div>
                                <div className={styles.text}>
                                    수입 &nbsp;&nbsp;<span>120,000원</span>
                                </div>
                                <div className={styles.text}>
                                    지출 &nbsp;&nbsp;<span>100,000원</span>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className={styles.expmoney}>
                                    <span>100,000원</span>
                                </div>
                                <div className={styles.pinMoney}>
                                    <span>이번달 용돈 &nbsp;&nbsp;100,000원</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={styles.btn}>
                        <div
                            className={selectedValue === 'all' ? styles.selected : styles.unselected}
                            onClick={() => {
                                setSelectedValue('all');
                            }}
                        >
                            거래 내역
                        </div>
                        <div
                            className={selectedValue === 'expenditure' ? styles.selected : styles.unselected}
                            onClick={() => {
                                setSelectedValue('expenditure');
                            }}
                        >
                            지출
                        </div>
                    </div>
                </div>
                {contents}
            </ContentsFrame>
        </PageFrame>
    );
};

export default TransactionPage;
