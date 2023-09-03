import React, { useState, useEffect } from 'react';
import styles from '../Timer/Timer.module.css';

const Timer = ({ setIsExpired }: { setIsExpired: (flag: boolean) => void }) => {
    const [seconds, setSeconds] = useState<number>(180);

    useEffect(() => {
        // clearup에서 정리하기 위해 상수 할당
        const timer = setInterval(() => {
            setSeconds(seconds - 1);
        }, 1000);

        if (seconds === 0) {
            alert('인증 시간이 만료되었습니다. 인증번호를 재발급해주세요.');
            setIsExpired(true);
        }

        return () => clearInterval(timer);
    });

    const showTimer = (): string => {
        let str = '';

        const minute = Math.floor(seconds / 60);
        const sec = seconds % 60;

        str = `0${minute} : ${sec / 10 < 1 ? `0${sec}` : sec}`;

        return str;
    };

    return <div className={seconds > 60 ? styles.blue : styles.red}>{showTimer()}</div>;
};

export default Timer;
