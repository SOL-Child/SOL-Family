import User from '../../../../common/constants/User';
import styles from './MainMenuBox.module.css';
import pinMoneySrc from '../../../../common/images/SF_pinmoney_icon.png';
import loanSrc from '../../../../common/images/SF_loan_icon.png';
import linkSrc from '../../../../common/images/SF_link_icon.png';
import missionSrc from '../../../../common/images/SF_mission_icon.png';
import shinhanSrc from '../../../../common/images/SF_shinhan_icon.png';
import { useNavigate } from 'react-router-dom';

const MainMenuBox = (userType: any) => {
    const navigate = useNavigate();

    const testUserType = User.CHILD;

    const childMenu = [
        {
            title: '내 용돈<br/>확인하기',
            src: pinMoneySrc,
            color: '#EF6565',
            bgColor: '#FFDCDC',
            onClick: () => navigate('/account/transaction'),
        },
        {
            title: '대출<br/>받으러 가기',
            src: loanSrc,
            color: '#FFB800',
            bgColor: '#FFF3D2',
            onClick: () => navigate('/loan/request'),
        },
        {
            title: '적금<br/>&펀드 조회',
            src: linkSrc,
            color: '#29BE11',
            bgColor: '#D5FFCE',
            onClick: () => navigate('/fund'),
        },
        {
            title: '미션<br/>수행가기',
            src: missionSrc,
            color: '#527AE2',
            bgColor: '#DEE7FF',
            onClick: () => navigate('/mission'),
        },
    ];

    const parentMenu = [
        {
            title: '아이 용돈<br/>확인하기',
            src: pinMoneySrc,
            color: '#EF6565',
            bgColor: '#FFDCDC',
            onClick: () => navigate('/account/transaction'),
        },
        {
            title: '아이 용돈<br/>이체하기',
            src: loanSrc,
            color: '#FFB800',
            bgColor: '#FFF3D2',
            onClick: () => navigate('/account/transfer'),
        },
        {
            title: '자동이체<br/>신청하기',
            src: linkSrc,
            color: '#29BE11',
            bgColor: '#D5FFCE',
            onClick: () => navigate('/account/autotransfer'),
        },
        {
            title: '신한은행<br/>바로가기',
            src: shinhanSrc,
            color: '#527AE2',
            bgColor: '#white',
            onClick: () => navigate('/'),
        },
    ];

    return (
        <div className={styles.MainMenuBox}>
            {testUserType === User.CHILD
                ? childMenu.map((ele, idx) => {
                      return (
                          <div
                              key={idx}
                              className={styles.menuBox}
                              style={{ color: ele.color, backgroundColor: ele.bgColor }}
                              onClick={ele.onClick}
                          >
                              <div className={styles.menuIcon}>
                                  <img src={ele.src} alt="메뉴 아이콘" />
                              </div>
                              <div className={styles.menuText} dangerouslySetInnerHTML={{ __html: ele.title }}></div>
                          </div>
                      );
                  })
                : parentMenu.map((ele, idx) => {
                      return (
                          <div
                              key={idx}
                              className={styles.menuBox}
                              style={{ color: ele.color, backgroundColor: ele.bgColor }}
                              onClick={ele.onClick}
                          >
                              <div className={styles.menuIcon}>
                                  <img src={ele.src} alt="메뉴 아이콘" />
                              </div>
                              <div className={styles.menuText} dangerouslySetInnerHTML={{ __html: ele.title }}></div>
                          </div>
                      );
                  })}
        </div>
    );
};

export default MainMenuBox;
