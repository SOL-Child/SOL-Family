import axios from 'axios';

const QrcodeAPI = {
    // QrCode/get
    // req : 유저 정보
    // res : qr 이미지 (byte)
    createQrImage: async (data: any): Promise<Blob> => {
        const res: any = axios.get('', {
            // byte로 받아오기 때문에 blob으로 response
            responseType: 'blob',
            headers: {},
        });

        if (res.dataHeader.successCode) {
            throw new Error(res.dataHeader.resultMessage);
        }

        return res.dataBody;
    },
};

export default QrcodeAPI;
