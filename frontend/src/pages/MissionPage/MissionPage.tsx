import { useNavigate } from 'react-router';
import PageFrame from '../../common/components/PageFrame/PageFrame';
import PageHeader from '../../common/components/PageHeader/PageHeader';
import ContentsFrame from '../../common/components/ContentsFrame/ContentsFrame';
import Pages from '../../common/constants/Pages';

import styles from './MissionPage.module.css';

const MissionPage = () => {
    const navigate = useNavigate();

    const missions = [
        ['📕', '부모님과 함께 어린이 저축 통장을 만들어보아요'],
        ['💸', '용돈이 부족하다면 부모님께 대출 신청을 해보아요.'],
        ['📙', '적금 통장을 신청하지 않았다면, 신청하고 돈을 모아보아요.'],
        ['💡', '관심가는 펀드를 정하고 1개의 종목에 투자해보아요.'],
    ];

    return (
        <PageFrame>
            <PageHeader
                text="미션 수행하기"
                handleIcon={() => {
                    navigate('/');
                }}
            ></PageHeader>
            <div style={{ backgroundColor: 'rgba(220, 220, 220, 0.3)' }}>
                <ContentsFrame page={Pages.MISSION}>
                    {missions.map((ele, idx) => {
                        return (
                            <div className={styles.missionCard} key={idx}>
                                <div>{ele[0]}</div>
                                <div>{ele[1]}</div>
                            </div>
                        );
                    })}
                </ContentsFrame>
            </div>
        </PageFrame>
    );
};

export default MissionPage;
