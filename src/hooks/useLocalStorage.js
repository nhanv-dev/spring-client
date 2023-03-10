import {useState} from 'react';

function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(initialValue);

    const setValue = (value) => {
        window.localStorage.setItem(key, value);
        setStoredValue(value);
    }

    return [storedValue, setValue];
}

export default useLocalStorage;