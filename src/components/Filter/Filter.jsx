import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeValueFilter } from 'redux/filter/filterSlice';
import { Label, Input } from './Filter.styled';

const Filter = () => {
  const filterText = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const handleChange = e => {
    dispatch(changeValueFilter(e.target.value));
  };

  return (
    <Label>
      Find contacts by name:
      <Input type="text" value={filterText} onChange={handleChange} />
    </Label>
  );
};

export default Filter;
