import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url: string) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res: any = axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.dataHeader.successCode) {
                throw new Error(res.dataHeader.resultMessage);
            }

            // @todo: 응답받는 데이터 프로퍼티명으로 수정
            // setData(res);
        };

        fetchData();
    }, []);

    return data;
};

export default useFetch;
