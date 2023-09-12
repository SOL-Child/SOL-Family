import { TransferInfo } from '../../../../common/types/account.types';
import Modal from '../../../../common/components/Modal/Modal';
import styles from './TransferCheckModal.module.css';
import { useNavigate } from 'react-router-dom';

const TransferCheckModal = ({
    width,
    height,
    isOpen,
    onClose,
    info,
}: {
    width: string;
    height: string;
    isOpen: boolean;
    onClose: () => void;
    info: TransferInfo | null;
}) => {
    const testData: TransferInfo = {
        receiverName: '이수화',
        receiveMoney: '10000',
        sendAccountNum: '123-4567-3231',
        receiveAccountNum: '234-2345-23423',
    };

    const navigate = useNavigate();

    return (
        <Modal width={width} height={height} isOpen={isOpen} onClose={onClose}>
            <div className={styles.TransferCheckModal}>
                <div className={styles.topBox}>
                    <div className={styles.title}>
                        {testData?.receiverName}님에게 <br />
                        <span style={{ color: '#0046FF' }}>{testData?.receiveMoney}</span>원
                    </div>
                    <div style={{ color: '#8A8A8A', fontSize: '13px' }}>이체가 완료되었습니다</div>
                    <br />
                    <div>
                        <div className={styles.infoTitle}>출금 계좌</div>
                        <div className={styles.info}>{testData?.sendAccountNum}</div>
                    </div>
                    <div>
                        <div className={styles.infoTitle}>받는 분 정보</div>
                        <div className={styles.info}>신한은행 {testData?.receiveAccountNum}</div>
                    </div>
                </div>
                <div className={styles.btn}>
                    <button
                        onClick={() => {
                            navigate('/');
                        }}
                    >
                        홈으로 가기
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default TransferCheckModal;
