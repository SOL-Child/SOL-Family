import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Pages from '../../common/constants/Pages';
import ContentsFrame from '../../common/components/ContentsFrame/ContentsFrame';
import Header from '../../common/components/Header/Header';
import MainContents from '../../common/components/MainContents/MainContents';
import BottomBar from '../../common/components/BottomBar/BottomBar';

import MainUtil from '../../common/utils/MainUtil';
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
        <ContentsFrame page={Pages.MAIN}>
            <Header userType={userType} />
            <MainContents userType={userType} />
            <BottomBar />
        </ContentsFrame>
    );
};

export default MainPage;