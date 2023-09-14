import BottomSheet from '../../../../common/components/BottomSheet/BottomSheet';
import styles from './LoanUsageBottomSheet.module.css';

const LoanUsageBottomSheet = ({ height, onClose }: { height: string; onClose: () => void }) => {
    const usageArr = [
        ['book', '📚', '공부를 하기 위해 책을 사야해요'],
        ['present', '🎁', '친구의 생일 선물을 사야해요'],
        ['food', '🍪', '간식을 사먹고 싶은데 돈이 부족해요'],
        ['transportation', '🚎', '교통비에 사용할 거예요'],
    ];

    return (
        <BottomSheet height={height} onClose={onClose}>
            <div className={styles.LoanUsageBottomSheet}>
                <div className={styles.header}>대출 용도</div>
                <div className={styles.contents}>
                    {usageArr.map(([key, icon, text], idx) => {
                        return (
                            <button key={idx} id={key} className={styles.loanBtn}>
                                <span>{icon}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span>{text}</span>
                            </button>
                        );
                    })}
                    <div className={styles.text}>그 외 다른 용도로 사용할 예정이예요</div>
                    <input className={styles.input} placeholder="    직접 입력하기" />
                </div>
                <div className={styles.btn}>
                    <button>확인하기</button>
                </div>
            </div>
        </BottomSheet>
    );
};

export default LoanUsageBottomSheet;
