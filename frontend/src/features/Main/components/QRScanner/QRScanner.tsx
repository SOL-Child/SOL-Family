import { useEffect, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import styles from './QRScanner.module.css';

const QRScanner = () => {
    const webcamRef = useRef<Webcam | null>(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef?.current?.getScreenshot();
        if (imageSrc) {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                const ctx = canvas.getContext('2d');

                if (ctx) {
                    ctx.drawImage(img, 0, 0);
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const code = jsQR(imageData.data, imageData.width, imageData.height);

                    if (code) {
                        alert(`Found QR code! Data: ${code.data}`);
                    }
                }
            };
            img.src = imageSrc;
        }
    }, [webcamRef]);

    useEffect(() => {
        setTimeout(() => {
            capture();
            console.log('캡쳐');
        }, 2000);
    }, []);

    return (
        <div className={styles.camera}>
            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
            {/* <button onClick={capture}>Capture</button> */}
        </div>
    );
};

export default QRScanner;
