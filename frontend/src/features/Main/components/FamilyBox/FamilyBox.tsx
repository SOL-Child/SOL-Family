import { useState } from 'react';
import QRScanner from '../QRScanner/QRScanner';
import QRModal from '../QRModal/QRModal';
import User from '../../../../common/constants/User';
import { UserFamilyInfo } from '../../../../common/types/user.types';
import styles from './FamilyBox.module.css';

const FamilyBox = (userType: any) => {
    const unConnected = true; // 연결되어있는지 아닌지 판단하는 flag
    const testUserType: string = User.PARENT;

    const [isOpenQrScanModal, setIsOpenQrScanModal] = useState<boolean>(false); // qr 스캔 모달
    const [isQrScan, setIsQrScan] = useState<boolean>(false);

    // back에서 받아온 사용자 가족 정보
    const familyInfo: UserFamilyInfo = {
        groupName: '🚀 우리는 쏠패밀리',
        groupCnt: '4',
    };

    if (unConnected) {
        return (
            <div className={styles.FamilyBox}>
                <div>연결된 가족 모임이 없어요</div>
                {testUserType === User.CHILD ? (
                    <div className={styles.qrBox}>
                        <div>
                            부모님이 생성한 QR 코드를 스캔해
                            <br />
                            가족 모임에 가입할 수 있어요
                        </div>
                        <button
                            onClick={() => {
                                setIsQrScan(!isQrScan);
                            }}
                        >
                            QR 스캔
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className={styles.qrBox}>
                            <div>
                                QR코드를 생성하여 새로운
                                <br />
                                가족 모임을 생성해 보아요
                            </div>
                            <button
                                onClick={() => {
                                    setIsOpenQrScanModal(!isOpenQrScanModal);
                                }}
                            >
                                QR 생성
                            </button>
                        </div>
                        <div className={styles.qrBox}>
                            <div>기존에 배우자가 생성한 모임이 있으신가요?</div>
                            <button
                                onClick={() => {
                                    setIsQrScan(!isQrScan);
                                }}
                            >
                                QR 스캔
                            </button>
                        </div>
                    </div>
                )}
                {isOpenQrScanModal && (
                    <QRModal
                        width="280px"
                        height="350px"
                        isOpen={isOpenQrScanModal}
                        onClose={() => {
                            setIsOpenQrScanModal(false);
                        }}
                    />
                )}
                {isQrScan && <QRScanner />}
            </div>
        );
    }

    return (
        <div className={styles.FamilyBox}>
            <span className={styles.groupName}>{familyInfo.groupName}</span>&nbsp;&nbsp;
            <span style={{ color: '#FDC500' }}>{familyInfo.groupCnt}</span>
            {isOpenQrScanModal && (
                <QRModal
                    width="280px"
                    height="350px"
                    isOpen={isOpenQrScanModal}
                    onClose={() => {
                        setIsOpenQrScanModal(false);
                    }}
                />
            )}
            {isQrScan && <QRScanner />}
        </div>
    );
};

export default FamilyBox;
