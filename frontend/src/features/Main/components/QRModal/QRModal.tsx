import { useEffect, useState } from 'react';
import Modal from '../../../../common/components/Modal/Modal';
import styles from './QRModal.module.css';
import QrcodeAPI from '../../apis/QrcodeAPI';

const QRModal = ({
    width,
    height,
    isOpen,
    onClose,
}: {
    width: string;
    height: string;
    isOpen: boolean;
    onClose: () => void;
}) => {
    const [qrUrl, setQrUrl] = useState<string>(''); // qr코드 모달

    // qr코드 생성하는 함수
    const createQRCode = async () => {
        // @todo: url 넣기
        try {
            const url: Blob = await QrcodeAPI.createQrImage('');

            // blob type의 값을 이미지 주소로 변환하여 저장
            const windowUrl = window.URL || window.webkitURL;
            setQrUrl(windowUrl.createObjectURL(url));
        } catch (err) {
            alert(err);
        }
    };

    useEffect(() => {
        // createQRCode();
    }, []);

    return (
        <Modal width={width} height={height} isOpen={isOpen} onClose={onClose}>
            <div className={styles.QRModal}>
                <div className={styles.tempBox}></div>
                <div className={styles.contentBox}>
                    <div className={styles.qrText}>QR코드 생성</div>
                    <div className={styles.qrsubText}>
                        QR코드를 스캔하여
                        <br />
                        가족 모임에 가입해보세요
                    </div>
                    {/* QR코드 */}
                    <div className={styles.qrBox}>
                        <img src={qrUrl ? qrUrl : ''} alt="QR코드 이미지" />
                    </div>
                </div>
                <div className={styles.buttonBox}>
                    <button onClick={onClose}>닫기</button>
                </div>
            </div>
        </Modal>
    );
};

export default QRModal;
