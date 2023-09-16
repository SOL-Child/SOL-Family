import PageFrame from '../../common/components/PageFrame/PageFrame';
import ContentsFrame from '../../common/components/ContentsFrame/ContentsFrame';
import Pages from '../../common/constants/Pages';
import BottomBar from '../../common/components/BottomBar/BottomBar';
import mySrc from '../../common/images/SF_my_icon.png';

import styles from './MyPage.module.css';
import { useNavigate } from 'react-router';

const MyPage = () => {
    const naviagate = useNavigate();

    const handleLogout = () => {
        if (window.confirm('로그아웃 하시겠습니까?')) {
            window.localStorage.removeItem('SF_accessToken');
            alert('로그아웃 되었습니다.');
            naviagate('/');
        }
    };

    return (
        <PageFrame>
            <div className={styles.header}>마이페이지</div>
            <ContentsFrame page={Pages.MY}>
                {/* 사용자 정보 */}
                <div className={styles.user}>
                    <div className={styles.userImg}>
                        <img src={mySrc} alt="마이 아이콘" />
                    </div>
                    <div className={styles.text}>
                        <span style={{ color: '#0046FF' }}>이수화</span> 님 환영합니다
                    </div>
                    <br />
                    <div className={styles.info}>
                        <div>010-8287-8562 &nbsp;&nbsp;| &nbsp;&nbsp;아이</div>
                    </div>
                </div>
                {/* 기능 버튼  */}
                <div className={styles.func}>
                    <div
                        onClick={() => {
                            handleLogout();
                        }}
                    >
                        로그아웃
                    </div>
                    <div>회원탈퇴</div>
                    <div></div>
                </div>
            </ContentsFrame>
            <BottomBar />
        </PageFrame>
    );
};

export default MyPage;
