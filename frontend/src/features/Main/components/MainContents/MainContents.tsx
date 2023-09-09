import FamilyBox from '../FamilyBox/FamilyBox';
import AccountBox from '../AccountBox/AccountBox';
import MainMenuBox from '../MainMenuBox/MainMenuBox';

import styles from './MainContents.module.css';
import MainUtil from '../../utils/MainUtil';
import { useNavigate } from 'react-router-dom';

import useFetch from '../../../../common/hooks/useFetch';

// data: userType (null, CHILD, PARENT)
const MainContents = (userType: any) => {
    const navigate = useNavigate();
    // const userData = useFetch('');  url을 통해 메인화면 정보 받아오기

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

        const userName = MainUtil.getUserName();

        return (
            <div className={styles.userTitleBox}>
                <span>{userName}</span> {userType === 'CHILD' ? '친구' : '님'} <br />
                어서오세요 !
            </div>
        );
    };

    return (
        <div className={styles.mainContents}>
            <>{setTitle()}</>
            <FamilyBox userType={userType} />
            {/* 계좌는 데이터만 전달  */}
            <AccountBox />
            <MainMenuBox userType={userType} />
        </div>
    );
};

export default MainContents;
