import './MultiCheck.css';

import React from 'react';

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
  return <div className='MultiCheck'>
    {/* TODO */}
    Multiselect
  </div>
}

export default MultiCheck;
