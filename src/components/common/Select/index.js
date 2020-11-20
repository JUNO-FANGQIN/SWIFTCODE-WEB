import React, { useState } from 'react'
import { AutoComplete, Button } from 'antd'
import { debounce } from 'common'
const mockVal = (str, repeat = 1) => {
  return {
    value: str.repeat(repeat),
  };
};

const Select = () => {
  const [value, setValue] = useState('')
  const [options, setOptions] = useState([])

  const search = (searchText) => {
    console.log('search', searchText)
    setOptions(
      !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
    )
  }

  const debounces = debounce(search, 2000)

  const onSearch = (searchText) => {
    console.log('onSearch', searchText, debounce(search, 2000))
    debounces(searchText)
  }
  const onSelect = (data) => {
    console.log('onSelect', data)
  }
  const onChange = (data) => {
    setValue(data);
  }
  return (
    <>
      <Button type="primary">button</Button>
      <AutoComplete
        options={options}
        style={{ width: 200 }}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder="input here"
        defaultOpen={true}
      />
      {/* <br />
      <br />
      <AutoComplete
        value={value}
        options={options}
        style={{ width: 200 }}
        onSelect={onSelect}
        onSearch={onSearch}
        onChange={onChange}
        placeholder="control mode"
      /> */}
    </>
  );
};

export default Select
