import { useNavigate } from 'react-router-dom';
import ContentsFrame from '../../common/components/ContentsFrame/ContentsFrame';
import PageFrame from '../../common/components/PageFrame/PageFrame';
import PageHeader from '../../common/components/PageHeader/PageHeader';
import Pages from '../../common/constants/Pages';
import styles from './FundPage.module.css';
import SavingAccountBox from '../../features/Account/components/SavingAccountBox/SavingAccountBox';
import { useState } from 'react';

interface Fund {
    src: string;
    title: string;
    tag: string;
}

const FundPage = () => {
    const navigate = useNavigate();
    const [selectedView, setSelectedView] = useState<string>('전체');

    const funds: Fund[] = [
        {
            src: '/',
            title: '신한BEST개인용MMF제1호(종류)',
            tag: '국내',
        },
        {
            src: '/',
            title: '신한BEST개인용MMF제1호(종류)',
            tag: '국내',
        },
    ];

    const myfunds: Fund[] = [
        {
            src: '/',
            title: '신한BEST개인용MMF제1호(종류)',
            tag: '국외',
        },
        {
            src: '/',
            title: '신한BEST개인용MMF제1호(종류)',
            tag: '국내',
        },
    ];

    return (
        <PageFrame>
            <PageHeader
                text="적금&펀드 조회하기"
                handleIcon={() => {
                    navigate('/');
                }}
            />
            <ContentsFrame page={Pages.FUND}>
                <div className={styles.up}>
                    <div className={styles.title}>내 적금 통장</div>
                    <div>
                        <SavingAccountBox />
                    </div>
                </div>
                <br />
                <div className={styles.up}>
                    <div className={styles.flex}>
                        <div className={styles.title}>
                            {selectedView === '전체' ? '전체 펀드 상품 알아보기' : '내 펀드 확인하기'}
                        </div>
                        <div className={styles.toggle}>
                            <div
                                className={selectedView === '전체' ? styles.selected : styles.unselected}
                                onClick={() => {
                                    setSelectedView('전체');
                                }}
                            >
                                전체
                            </div>
                            <div
                                className={selectedView === '내 펀드' ? styles.selected : styles.unselected}
                                onClick={() => {
                                    setSelectedView('내 펀드');
                                }}
                            >
                                내 펀드
                            </div>
                        </div>
                    </div>
                    <div className={styles.fundList}>
                        {selectedView === '전체'
                            ? funds.map(({ src, title, tag }, idx) => {
                                  return (
                                      <div className={styles.funItem} key={idx}>
                                          <div className={styles.img}>
                                              <img src={src} alt="펀드" />
                                          </div>
                                          <div className={styles.text}>
                                              <div>{title}</div>
                                              <div style={{ color: '#A7BFFF' }}>{tag}</div>
                                          </div>
                                      </div>
                                  );
                              })
                            : myfunds.map(({ src, title, tag }, idx) => {
                                  return (
                                      <div className={styles.funItem} key={idx}>
                                          <div className={styles.img}>
                                              <img src={src} alt="펀드" />
                                          </div>
                                          <div className={styles.text}>
                                              <div>{title}</div>
                                              <div style={{ color: '#A7BFFF' }}>{tag}</div>
                                          </div>
                                      </div>
                                  );
                              })}
                    </div>
                </div>
            </ContentsFrame>
        </PageFrame>
    );
};

export default FundPage;
