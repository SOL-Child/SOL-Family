import Modal from '../../../../common/components/Modal/Modal';
import { AlarmInfo } from '../../../../common/types/alarm.types';
import AlarmSrc from '../../../../common/images/SF_alarm_icon.png';

import styles from './AlarmModal.module.css';

const AlarmModal = ({
    width,
    height,
    isOpen,
    onClose,
    alarmInfo,
}: {
    width: string;
    height: string;
    isOpen: boolean;
    onClose: () => void;
    alarmInfo: AlarmInfo;
}) => {
    return (
        <Modal width={width} height={height} isOpen={isOpen} onClose={onClose}>
            <div className={styles.top}>
                <img src={AlarmSrc} alt="알림 정보" />
                <div>
                    대출 요청 정보는
                    <br />
                    다음과 같습니다
                </div>
            </div>
            <div className={styles.texts}>
                <div className={styles.title}>아이 계좌 번호</div>
                <div className={styles.subTitle}>{alarmInfo.account}</div>
                <div className={styles.title}>대출 용도</div>
                <div className={styles.subTitle}>{alarmInfo.purpose}</div>
                <div className={styles.title}>대출 금액</div>
                <div className={styles.subTitle}>{alarmInfo.requestMoney}</div>
                <div className={styles.title}>구제 방법</div>
                <div className={styles.subTitle}>{alarmInfo.solution}</div>
                <div className={styles.title}>신청일</div>
                <div className={styles.subTitle}>{alarmInfo.requestDate}</div>
            </div>
            <div className={styles.btn}>
                <button>반려하기</button>
                <button>승인하기</button>
            </div>
        </Modal>
    );
};

export default AlarmModal;
