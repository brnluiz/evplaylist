import React from 'react';

import styles from './styles.css';

const MessageBox = (props) => {
  let icon = 'fa-info-circle';
  let color = 'info-box';

  if (props.type == 'error') {
    icon = 'fa-exclamation-circle';
    color = 'error-box';
  }


      console.log('oi');

  return (
    <div className='row'>
      <div className={'message-box '+color}>
        <i className={'fa '+icon} aria-hidden='true'></i> {props.message}
      </div>
    </div>
  );
}

export default MessageBox;
