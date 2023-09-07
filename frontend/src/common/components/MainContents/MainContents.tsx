import FamilyBox from '../FamilyBox/FamilyBox';
import Carousel from '../Carousel/Carousel';
import AccountBox from '../AccountBox/AccountBox';
import MainMenuBox from '../MainMenuBox/MainMenuBox';

import styles from './MainContents.module.css';
import MainUtil from '../../utils/MainUtil';

// data: userType (null, CHILD, PARENT)
const MainContents = (userType: any) => {
    const setTitle = () => {
        const userName = MainUtil.getUserName();
        if (userName === null) {
            return (
                <div className={styles.titleBox}>
                    <div>
                        <span>로그인 / 회원가입을 통해</span> <br />
                        서비스를 이용해주세요
                    </div>
                    <button>로그인</button>
                    <button>회원가입</button>
                </div>
            );
        } else {
            return (
                <div className={styles.titleBox}>
                    <span>{userName}</span> {userType === 'CHILD' ? '친구' : '님'}
                    <br />
                    어서오세요 !
                </div>
            );
        }
    };

    return (
        <div className={styles.mainContents}>
            <>{setTitle()}</>
            <FamilyBox userType={userType} />
            {/* todo: data : 통장 박스 추가 */}
            <Carousel />
            <MainMenuBox userType={userType} />
        </div>
    );
};

export default MainContents;
