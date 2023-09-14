import React, { useState, FC, Dispatch, SetStateAction } from 'react';
import styles from './ToggleBox.module.css';

interface ToggleBoxProps {
    selected: string;
    setSelected: Dispatch<SetStateAction<string>>;
    firstVal: string;
    secondVal: string;
}

const ToggleBox: FC<ToggleBoxProps> = ({ selected, setSelected, firstVal, secondVal }) => {
    return (
        <div className={styles.ToggleBox}>
            <div className={styles.toggle}>
                <button
                    onClick={() => {
                        setSelected(firstVal);
                    }}
                    className={selected === firstVal ? styles.active : ''}
                >
                    {firstVal}
                </button>
                <button
                    onClick={() => {
                        setSelected(secondVal);
                    }}
                    className={selected === secondVal ? styles.active : ''}
                >
                    {secondVal}
                </button>
            </div>
            <div className={`${styles.slider} ${selected === firstVal ? styles.left : styles.right}`}></div>
        </div>
    );
};

export default ToggleBox;
