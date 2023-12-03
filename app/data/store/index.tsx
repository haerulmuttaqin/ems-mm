import {useEffect, useState} from "react";

function getStorageValue(key, defaultValue) {
    // getting stored value
    const saved = localStorage.getItem(key) as any;
    const initial = saved !== "undefined" ? JSON.parse(saved) : undefined;
    return initial || defaultValue;
}

export const useLocalStorage = (key, defaultValue) => {

    const [value, setValue] = useState(() => {
        return getStorageValue(key, defaultValue);
    });

    useEffect(() => {
        // storing input name
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};