import { useState } from 'react';
import PageFrame from '../../common/components/PageFrame/PageFrame';
import ContentsFrame from '../../common/components/ContentsFrame/ContentsFrame';
import Pages from '../../common/constants/Pages';
import backSrc from '../../common/images/SF_back_icon_white.png';

import { TransactionInfo, TransactionDetailInfo } from '../../common/types/transaction.types';
import styles from './TransactionPage.module.css';
import { useNavigate } from 'react-router-dom';
import ToggleBox from '../../common/components/ToggleBox/ToggleBox';
import Chart from '../../features/Account/components/Chart/Chart';

// 전체 거래내역 UI
const AllTransactionInfo = () => {
    const transactionList: TransactionInfo[] = [
        {
            account: '110184999999',
            balance: '331551',
            name: '김신한',
            transactionCount: '1',
            transactionDetail: [
                {
                    date: '20230318',
                    summary: '이자',
                    withdrawalMoney: '3500',
                    depositMoney: '0',
                    description: '김밥 천국',
                    balance: '331551',
                },
                {
                    date: '20230318',
                    summary: '이자',
                    withdrawalMoney: '3500',
                    depositMoney: '0',
                    description: '김밥 천국',
                    balance: '331551',
                },
            ],
        },
    ];

    const transactionDetailList: TransactionDetailInfo[] = [
        {
            date: '20230318',
            summary: '이자',
            withdrawalMoney: '3500',
            depositMoney: '0',
            description: '김밥 천국',
            balance: '331551',
        },
        {
            date: '20230318',
            summary: '이자',
            withdrawalMoney: '3500',
            depositMoney: '0',
            description: '김밥 천국',
            balance: '331551',
        },
    ];

    return (
        <>
            <div className={styles.totalInfo}>
                <div>전체 거래 내역</div>
                <div>총 2건</div>
            </div>
            <div className={styles.transactionBox}>
                {
                    // 전체 거래 리스트'
                    transactionDetailList.map((ele, idx) => {
                        return (
                            <div className={styles.accountItem} key={idx}>
                                <div className={styles.top}>
                                    <div>{ele.description}</div>
                                    <div>
                                        {+ele.depositMoney > 0 ? (
                                            <span style={{ color: '#0046FF' }}>수입</span>
                                        ) : (
                                            <span style={{ color: '#ff0000' }}>지출</span>
                                        )}
                                    </div>
                                </div>
                                <div className={styles.box}>
                                    <div>거래 후 잔액</div>
                                    <div>{ele.balance}</div>
                                </div>
                                <div className={styles.box}>
                                    <div>거래일</div>
                                    <div>{ele.date}</div>
                                </div>
                                <div className={styles.box}>
                                    <div>거래 금액</div>
                                    <div>{+ele.depositMoney === 0 ? ele.withdrawalMoney : ele.depositMoney}</div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
};

// 지출 내역
const ExpenditureInfo = () => {
    const [isSelected, setSelected] = useState<string>('카테고리');

    // 토글 해야함
    const transactionList: TransactionInfo[] = [
        {
            account: '110184999999',
            balance: '331551',
            name: '김신한',
            transactionCount: '1',
            transactionDetail: [
                {
                    date: '20230318',
                    summary: '이자',
                    withdrawalMoney: '3500',
                    depositMoney: '0',
                    description: '김밥 천국',
                    balance: '331551',
                },
                {
                    date: '20230318',
                    summary: '이자',
                    withdrawalMoney: '3500',
                    depositMoney: '0',
                    description: '김밥 천국',
                    balance: '331551',
                },
            ],
        },
    ];

    const transactionDetailList: TransactionDetailInfo[] = [
        {
            date: '20230318',
            summary: '이자',
            withdrawalMoney: '3500',
            depositMoney: '0',
            description: '김밥 천국',
            balance: '331551',
        },
        {
            date: '20230318',
            summary: '이자',
            withdrawalMoney: '3500',
            depositMoney: '0',
            description: '김밥 천국',
            balance: '331551',
        },
    ];

    const categoryList = {
        eat: {
            percent: 45,
            money: 45000,
        },
        game: {
            percent: 30,
            money: 30000,
        },
        living: {
            percent: 20,
            money: 45000,
        },
        trans: {
            percent: 10,
            money: 45000,
        },
        etc: {
            percent: 45,
            money: 45000,
        },
    };

    const color = ['#FFCBE7', '#8CCFFF', '#B7FF8C', '#DEDEDE', '#fff587'];

    return (
        <>
            <div className={styles.totalInfo}>
                <div>지출 내역</div>
                <div>총 2건</div>
            </div>
            <div className={styles.transactionBox}>
                {
                    // 전체 거래 리스트'
                    isSelected === '상세내역' ? (
                        transactionDetailList.map((ele, idx) => {
                            return (
                                <div className={styles.accountItem} key={idx}>
                                    <div className={styles.top}>
                                        <div>{ele.description}</div>
                                        <div>
                                            {+ele.depositMoney > 0 ? (
                                                <span style={{ color: '#0046FF' }}>수입</span>
                                            ) : (
                                                <span style={{ color: '#ff0000' }}>지출</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className={styles.box}>
                                        <div>거래 후 잔액</div>
                                        <div>{ele.balance}</div>
                                    </div>
                                    <div className={styles.box}>
                                        <div>거래일</div>
                                        <div>{ele.date}</div>
                                    </div>
                                    <div className={styles.box}>
                                        <div>거래 금액</div>
                                        <div>{+ele.depositMoney === 0 ? ele.withdrawalMoney : ele.depositMoney}</div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <>
                            <div className={styles.chart}>
                                <Chart data={categoryList} />
                            </div>
                            <div className={styles.categorySummary}>
                                {Object.entries(categoryList).map(([key, value], idx) => {
                                    return (
                                        <div className={styles.categoryItem} key={idx}>
                                            <div style={{ backgroundColor: `${color[idx]}` }}></div>
                                            <div>
                                                {key == 'eat'
                                                    ? '식비'
                                                    : key === 'game'
                                                    ? '게임'
                                                    : key === 'living'
                                                    ? '생활'
                                                    : key === 'trans'
                                                    ? '교통'
                                                    : '기타'}
                                            </div>
                                            <div>{value.percent}%</div>
                                            <div>{value.money} 원</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )
                }
            </div>
            {/* 토글 박스 추가 */}
            <ToggleBox selected={isSelected} setSelected={setSelected} firstVal={'카테고리'} secondVal={'상세내역'} />
        </>
    );
};

const TransactionPage = () => {
    const navigate = useNavigate();
    const [selectedValue, setSelectedValue] = useState<string | null>('all');
    let contents: JSX.Element | null = null;

    if (selectedValue === 'all') {
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
