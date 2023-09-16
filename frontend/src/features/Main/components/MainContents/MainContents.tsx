import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import FamilyBox from '../FamilyBox/FamilyBox';
import AccountBox from '../AccountBox/AccountBox';
import MainMenuBox from '../MainMenuBox/MainMenuBox';

import useFetch from '../../../../common/hooks/useFetch';
import MainUtil from '../../utils/MainUtil';
import { url } from '../../../../common/constants/url';
import User from '../../../../common/constants/User';
import { SignedUserInfo } from '../../../../common/types/user.types';
import styles from './MainContents.module.css';

const MainContents = () => {
    const navigate = useNavigate();

    // @todo: 사용자 정보 fetch
    // useEffect(() => {
    //     try {
    //         const [userInfo]: SignedUserInfo = useFetch(`${url}/`);
    //     } catch (err) {
    //         alert(err);
    //     }
    // }, []);

    const testUserInfo: SignedUserInfo = {
        name: 'name',
        userType: 'CHILD',
        family: true,
        familyCode: 'dfaei545d4faef4a6sd',
        familyCnt: 5,
        book: true,
        bankbook: {
            account: 12345678910,
            balance: 30000,
        },
    };

    const setTitle = () => {
        const isLogin: boolean = MainUtil.checkIsLogin();

        if (!isLogin) {
            return (
                <div className={styles.titleBox}>
                    <div className={styles.textBox}>
                        <span>로그인 / 회원가입</span>을 통해 <br />
                        서비스를 이용해주세요
                    </div>
                    <div className={styles.buttonBox}>
                        <button onClick={() => navigate('/login')}>로그인</button>
                        <button onClick={() => navigate('/signup')}>회원가입</button>
                    </div>
                </div>
            );
        }

        return (
            <div className={styles.userTitleBox}>
                <span>{testUserInfo.name}</span> {testUserInfo.userType === User.CHILD ? '친구' : '님'} <br />
                어서오세요 !
            </div>
        );
    };

    return (
        <div className={styles.mainContents}>
            <>{setTitle()}</>
            <FamilyBox userInfo={testUserInfo} />
            <AccountBox userInfo={testUserInfo} />
            <MainMenuBox userType={testUserInfo.userType} />
        </div>
    );
};

export default MainContents;
