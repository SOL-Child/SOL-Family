import { useState } from 'react';

const useInput = (initialValue: any, isValid?: () => boolean) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(e.target.value);
    };

    const setState = (value: any) => {
        setValue(value);
    };

    return [value, handleChange, setState];
};

export default useInput;
