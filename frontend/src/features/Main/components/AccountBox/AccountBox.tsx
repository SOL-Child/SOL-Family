import { useNavigate } from 'react-router-dom';
import User from '../../../../common/constants/User';
import styles from './AccountBox.module.css';

const AccountBox = (userType: any) => {
    const navigate = useNavigate();
    const isAccountExist = true; // 통장이 존재하는지 확인하는 flag

    const handleCreateAccount = () => {
        if (window.confirm('계좌 개설을 위해 신한 쏠(SOL)로 이동하시겠습니까?')) {
            window.location.href = 'https://nsol.shinhan.com/link.html?pr_id=SP1180S0009F01';
        }
    };

    const handleConnectAccount = () => {
        if (window.confirm('계좌를 연결하시겠습니까?\n신한은행 계좌가 없다면 생성 후 연결을 진행해주세요.')) {
            // 계좌 정보 입력 창 띄우기
        }
    };

    const handleSeeAccount = () => {
        navigate('/account/detail');
    };

    const handleSendMoney = () => {
        // 이체하기
    };

    if (!isAccountExist) {
        return (
            <div className={styles.AccountBox}>
                <div className={styles.title}>연결된 계좌가 없어요</div>
                <div>
                    쏠차일드를 이용하려면 <br />
                    <span style={{ color: '#0046FF' }}>신한은행</span>에서 계좌를 개설하거나 <br />
                    기존 계좌를 연결해주세요
                </div>
                <div className={styles.buttonBox}>
                    <button onClick={handleCreateAccount}>계좌 만들기</button>
                    <button onClick={handleConnectAccount}>계좌 연결하기</button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.AccountBox}>
            <div className={styles.accountTopBox}>
                <div>
                    <div className={styles.title}>쏠차일드의 통장</div>
                    <div className={styles.accountNum}>123-45-678910</div>
                </div>
                <div className={styles.accountType}>입출금 통장</div>
            </div>
            <div className={styles.accountBtBox}>
                <div className={styles.accountCharge}>30,000원</div>
                <div className={styles.buttonBox}>
                    <button onClick={handleSeeAccount}>내역 확인</button>
                    <button onClick={handleSendMoney}>이체하기</button>
                </div>
            </div>
        </div>
    );
};

export default AccountBox;
