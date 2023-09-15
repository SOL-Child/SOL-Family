import { useState } from 'react';
import BottomBar from '../../common/components/BottomBar/BottomBar';
import ContentsFrame from '../../common/components/ContentsFrame/ContentsFrame';
import PageFrame from '../../common/components/PageFrame/PageFrame';
import Pages from '../../common/constants/Pages';
import AlarmModal from '../../features/Alarm/components/AlarmModal/AlarmModal';
import alarmSrc from '../../common/images/SF_alarm_icon.png';
import { AlarmInfo } from '../../common/types/alarm.types';

import styles from './AlarmPage.module.css';

const AlarmPage = () => {
    const [isOpenAlarmModal, setIsOpenAlarmModal] = useState<boolean>(false);
    const [alarmInfo, setAlarmInfo] = useState<AlarmInfo | null>(null);

    const alarmList = [
        {
            loan: '65',
            message: '당신의 자녀에게서 대출 요청이 발생했습니다.',
        },
        {
            loan: '65',
            message: '당신의 자녀에게서 대출 요청이 발생했습니다.',
        },
    ];

    const testAlarmInfo: AlarmInfo = {
        account: '11048299999',
        identification: 'daf4dsf54dsf5',
        requestDate: '20230801',
        purpose: 'description',
        requestMoney: 'money',
        solution: 'description',
        state: '0',
    };

    // 알람 클릭 시 뜨는 모달
    const handleAlarm = (loanId: string): void => {
        // 일단 id를 클릭하면 해당 정보를 불러와서 모달에 띄우기
        // axios로 알림 상세 정보 불러오기
        // 상세 정보를 alarmInfo에 지정
        // 모달 flag true로 변경
        setIsOpenAlarmModal(true);
    };

    return (
        <PageFrame>
            <div className={styles.header}>알림내역 확인</div>
            <ContentsFrame page={Pages.ALARM}>
                {alarmList.map(({ loan, message }, idx) => {
                    return (
                        <div
                            key={idx}
                            className={styles.noticeItem}
                            onClick={() => {
                                handleAlarm(loan);
                            }}
                        >
                            <div className={styles.img}>
                                <img src={alarmSrc} />
                            </div>
                            <div>{message}</div>
                        </div>
                    );
                })}
            </ContentsFrame>
            <BottomBar />
            {isOpenAlarmModal && (
                <AlarmModal
                    width="300px"
                    height="420px"
                    isOpen={isOpenAlarmModal}
                    onClose={() => {
                        setIsOpenAlarmModal(false);
                    }}
                    alarmInfo={testAlarmInfo}
                />
            )}
        </PageFrame>
    );
};

export default AlarmPage;
