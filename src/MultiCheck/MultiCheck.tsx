import './MultiCheck.css';

import React, { useState } from 'react';

export type Option = {
  label: string,
  value: string
}

/**
 * Notice:
 * @param {string} label - the label text of this component
 * @param {Option[]} options - options
 * @param {string[]} values - default checked option values
 * @param {Function} onChange - when checked options are changed, they should be passed to outside
 */
type Props = {
  label?: string,
  options: Option[],
  values?: string[]
  onChange?: (options: Option[]) => void,
}

const MultiCheck: React.FunctionComponent<Props> = (props): JSX.Element => {
  // 控制全选框是否选中的状态
  const [isSelectAll, setIsSelectAll] = useState(props.options.length > 0 && props.options.length === (props.values? props.values.length : 0))

  // 点击某个选项change回调
  const singleCheckboxChange = (e: any, option: Option) => {
    // 当前选中的所有选项
    const defauleOptions: Option[] = props.options.filter(val => props?.values?.includes(val.value))
    if(e.target.checked) { //当前这个选项勾选了
      defauleOptions.push(option)
      if(defauleOptions.length === props.options.length) {
        // 如果这个选项选中后，全部都选中的话
        setIsSelectAll(true)
      }
    } else { //当前这个选项不勾选
      const i = defauleOptions.findIndex(val => option.value === val.value)
      defauleOptions.splice(i, 1) //删除所有选中项数组里的当前选项
      setIsSelectAll(false) //此时肯定不是全选
    }
    // 传回给父组件，告诉此时它此时选中的是哪些
    props.onChange && props.onChange(defauleOptions)
  }

  // 点击全选勾选框
  const allChange = (e:any) => {
    if(e.target.checked) {
      //勾选了相当于全部勾选
      setIsSelectAll(true)
      props.onChange && props.onChange(props.options)
    } else {
      //勾选了相当于全部没勾选
      setIsSelectAll(false)
      props.onChange && props.onChange([])
    }
  }

  return (
  <div className='MultiCheck'>
    <div className="MultiCheck-item">
      <input type="checkbox" checked={isSelectAll} onChange={allChange} /> 
      <span style={{fontWeight: 'bolder'}}>Select-All</span>
    </div>
    {
      props.options.map(obj => {
        return (
        <div className="MultiCheck-item" key={obj.value}>
          <input type="checkbox" checked={props.values && props.values.includes(obj.value)} onChange={(e) => singleCheckboxChange(e, obj)} /> 
          <span style={{fontWeight: 'bolder'}}>{obj.label}</span>
        </div>
        )
      })
    }
  </div>
  )
}

export default MultiCheck;
