'use client'
import React from 'react';
import { FilterInput } from './FIlterInput';

interface FilterProps {
  filters: {key: string, label: string}[]
}

const FilterInputs: React.FC<FilterProps> = ({filters}) => {

  return (
    <>
    <div className="flex justify-center gap-4 mb-6">
        {filters.map(key => {
            return (
                <FilterInput filter={key} key={`${key}-${key.key}`}/>
            )
        })}
    </div>
    </>
  );
};

export default FilterInputs;
