import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Pages from '../../common/constants/Pages';
import ContentsFrame from '../../common/components/ContentsFrame/ContentsFrame';

import styles from './MainPage.module.css';

const MainPage = () => {
    return <ContentsFrame page={Pages.MAIN}>메인페이지</ContentsFrame>;
};

export default MainPage;
