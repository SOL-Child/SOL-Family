import { useState, useEffect } from 'react';
import axios from 'axios';
import MainUtil from '../../features/Main/utils/MainUtil';

const useFetch = (url: string) => {
    const [data, setData] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            const res: any = axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${MainUtil.getAccessToken()}`,
                },
            });

            if (res.data.dataHeader.successCode) {
                throw new Error(res.dataHeader.resultMessage);
            }

            setData(res.data.dataBody);
        };

        fetchData();
    }, []);

    return data;
};

export default useFetch;
