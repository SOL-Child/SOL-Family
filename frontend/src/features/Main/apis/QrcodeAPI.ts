import authInstance from '../../../common/apis/authInstance';

const QrcodeAPI = {
    // QrCode/get
    // req : 유저 정보
    // res : qr 이미지 (byte)
    createQrImage: async (): Promise<Blob> => {
        const res: any = await authInstance.get('/auth/v1/family/qr', {
            responseType: 'blob',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('SF_accessToken')}`,
                'Content-Type': 'application/json',
            },
        });

        return res.data;
    },
};

export default QrcodeAPI;
