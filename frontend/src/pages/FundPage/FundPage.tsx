import { useNavigate } from 'react-router-dom';
import ContentsFrame from '../../common/components/ContentsFrame/ContentsFrame';
import PageFrame from '../../common/components/PageFrame/PageFrame';
import PageHeader from '../../common/components/PageHeader/PageHeader';
import Pages from '../../common/constants/Pages';
import styles from './FundPage.module.css';
import SavingAccountBox from '../../features/Account/components/SavingAccountBox/SavingAccountBox';

const FundPage = () => {
    const navigate = useNavigate();

    return (
        <PageFrame>
            <PageHeader
                text="적금&펀드 조회하기"
                handleIcon={() => {
                    navigate('/');
                }}
            />
            <ContentsFrame page={Pages.FUND}>
                <div>
                    <div className={styles.title}>내 적금 통장</div>
                    <div>
                        <SavingAccountBox />
                    </div>
                </div>
                <div>
                    <div>
                        {/* 토글에 따라 변경 */}
                        <div className={styles.title}>전체 펀드 상품 알아보기</div>
                        {/* 토글 박스 */}
                    </div>
                    <div>{/* 펀드 리스트 */}</div>
                </div>
            </ContentsFrame>
        </PageFrame>
    );
};

export default FundPage;
