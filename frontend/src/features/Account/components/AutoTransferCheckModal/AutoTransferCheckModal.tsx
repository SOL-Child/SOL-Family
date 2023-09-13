import Modal from '../../../../common/components/Modal/Modal';
import { AutoTransferInfo } from '../../../../common/types/account.types';
import checkSrc from '../../../../common/images/SF_check_icon.png';
import styles from './AutoTransferCheckModal.module.css';

const AutoTransferCheckModal = ({
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
    info: AutoTransferInfo | null;
}) => {
    console.log(info);

    return (
        <Modal width={width} height={height} isOpen={isOpen} onClose={onClose}>
            <div className={styles.topContent}>
                <div className={styles.topTitle}>
                    <img className={styles.checkImg} src={checkSrc} alt="체크 아이콘" />
                    <div>
                        자동이체 신청 정보를
                        <br />
                        확인해주세요
                    </div>
                </div>
                <div>
                    <div className={styles.title}>아이 계좌번호</div>
                    <div className={styles.subTitle}>{info?.accountNum}</div>
                    <div className={styles.title}>자동이체 금액</div>
                    <div className={styles.subTitle}>{info?.transferMoney}</div>
                    <div className={styles.title}>자동이체 주기</div>
                    <div className={styles.subTitle}>{info?.selectedDate}</div>
                    <div className={styles.title}>이체 시작일</div>
                    <div className={styles.subTitle}>{info?.selectedDate}</div>
                </div>
                <div className={styles.checkTitle}>입력한 정보가 맞으신가요?</div>
            </div>
            <div className={styles.btn}>
                <button>다시 입력하기</button>
                <button>이체하기</button>
            </div>
        </Modal>
    );
};

export default AutoTransferCheckModal;
