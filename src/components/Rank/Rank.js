import React from 'react';

const Rank = ({UserName, UserEntries}) => {
  return (
    <div>
        <div className='white f3'>
            {`${UserName} , your current entry count is...`}
        </div>
        <div className='white f1'>
            {UserEntries}
        </div>
    </div>
  )
}

export default Rank;