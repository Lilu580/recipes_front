'use client'
import debounce from "@/helpers/debounce";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

interface Props {
    filter: {
        key: string,
        label: string
    }
}

export const FilterInput: React.FC<Props> = ({ filter }) => {
    const [query, setQuery] = useState('');
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    const parseSearchParams = () => {
        const parsedParams = searchParams.toString()
        if(parsedParams.length) {
            const findFilter = searchParams.toString().split('&').find(el => el.includes(filter.key))?.split('=')[1]

            if(findFilter) {
                setQuery(findFilter)
            }
        }
    }


    useEffect(() => {
        parseSearchParams()
    }, [])
    
    const handleChangeFilter = debounce((value: string) => {
        const parsedParams = searchParams.toString()
        const updatedSearchParams = new URLSearchParams(parsedParams);


        if (value) {
            updatedSearchParams.set(filter.key, value); 
        } else {
            updatedSearchParams.delete(filter.key); 
        }

        replace(`${pathname}?${updatedSearchParams.toString()}`);
    }, 500);

    return (
        <input
            type="text"
            value={query}
            onChange={(e) => {
                setQuery(e.target.value);
                handleChangeFilter(e.target.value);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-[200px]"
            placeholder={filter.label}
        />
    );
};