import { useEffect } from 'react';

import PageFrame from '../../common/components/PageFrame/PageFrame';
import Header from '../../common/components/Header/Header';
import MainContents from '../../features/Main/components/MainContents/MainContents';
import BottomBar from '../../common/components/BottomBar/BottomBar';

const MainPage = () => {
    return (
        <PageFrame>
            <Header />
            <MainContents />
            <BottomBar />
        </PageFrame>
    );
};

export default MainPage;
