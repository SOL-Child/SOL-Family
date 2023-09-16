import { useState } from 'react';
import QRScanner from '../QRScanner/QRScanner';
import QRModal from '../QRModal/QRModal';
import User from '../../../../common/constants/User';
import { SignedUserInfo } from '../../../../common/types/user.types';
import styles from './FamilyBox.module.css';

const FamilyBox = ({ userInfo }: { userInfo: SignedUserInfo }) => {
    const [isOpenQrScanModal, setIsOpenQrScanModal] = useState<boolean>(false); // qr 스캔 모달
    const [isQrScan, setIsQrScan] = useState<boolean>(false);

    if (!userInfo.family) {
        return (
            <div className={styles.FamilyBox}>
                <div>연결된 가족 모임이 없어요</div>
                {userInfo.userType === User.CHILD ? (
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
            <span className={styles.groupName}>🚀 우리는 쏠패밀리</span>&nbsp;&nbsp;
            <span style={{ color: '#FDC500' }}>{userInfo.familyCnt}</span>
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
