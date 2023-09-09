import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './BottomBar.module.css';
import snoticeSrc from '../../images/SF_notice_selected_icon.png';
import usnoticeSrc from '../../images/SF_notice_unselected_icon.png';
import smySrc from '../../images/SF_person_selected_icon.png';
import usmySrc from '../../images/SF_person_unselected_icon.png';
import homeSrc from '../../images/SF_home_icon.png';

const BottomBar = () => {
    const navigate = useNavigate();
    const [clickedValue, setClickedValue] = useState<string>('home');

    const handleClick = (value: string): void => {
        setClickedValue(value);

        if (value === 'home') return;

        navigate(`/${value}`);
    };

    return (
        <div className={styles.bottomBar}>
            <div className={styles.iconBox} onClick={() => handleClick('notice')}>
                <img src={clickedValue === 'notice' ? snoticeSrc : usnoticeSrc} alt="알림 아이콘" />
                <span className={clickedValue === 'notice' ? styles.selectedText : styles.unselectedText}>알림</span>
            </div>
            <div className={styles.homeBox} onClick={() => handleClick('home')}>
                <img src={homeSrc} alt="홈 아이콘" />
            </div>
            <div className={styles.iconBox} onClick={() => handleClick('my')}>
                <img src={clickedValue === 'my' ? smySrc : usmySrc} alt="마이 아이콘" />
                <span className={clickedValue === 'my' ? styles.selectedText : styles.unselectedText}>마이</span>
            </div>
        </div>
    );
};

export default BottomBar;
