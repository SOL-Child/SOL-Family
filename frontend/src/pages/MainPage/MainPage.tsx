import { useEffect } from 'react';

import Pages from '../../common/constants/Pages';
import PageFrame from '../../common/components/PageFrame/PageFrame';
import Header from '../../common/components/Header/Header';
import MainContents from '../../features/Main/components/MainContents/MainContents';
import BottomBar from '../../common/components/BottomBar/BottomBar';

import MainUtil from '../../features/Main/utils/MainUtil';
import styles from './MainPage.module.css';

const MainPage = () => {
    const content: JSX.Element | null = null;
    let userType: 'CHILD' | 'PARENT' | null = null; // 사용자 타입

    // 화면 렌더링 시 타입 체크
    useEffect(() => {
        if (!MainUtil.checkIsLogin()) {
            // 로그인x
            userType = null;
            return;
        }

        if (MainUtil.checkUserType() === 'CHILD') {
            userType = 'CHILD';
        } else {
            userType = 'PARENT';
        }
    }, []);

    // 현재 userType에는 아이, 부모 여부 들어감

    return (
        <PageFrame page={Pages.MAIN}>
            <Header />
            <MainContents userType={userType} />
            <BottomBar />
        </PageFrame>
    );
};

export default MainPage;
