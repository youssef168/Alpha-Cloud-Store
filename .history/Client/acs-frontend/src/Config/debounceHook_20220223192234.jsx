import { useState, useCallback } from 'react';

const debounce = (fn, delay) => {
    let timer = null;

    return function() {
        const context = this,
            args = arguments;
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(context, args)
            }, delay)
    }
}

export default function useSearchDebounce() {
    const [search, setSearch] = useState('');
    const [searchOn, setSearchOn] = useState(search);

    const onEnter = e => {
        if (e.keyCode === 13) {
            e.preventDefault();
            setSearchOn(search)
        }
    }

};