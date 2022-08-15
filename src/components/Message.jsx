import React from 'react'

const Message = ({ msg, bgColor }) => {
  let styles = {
    width: '50%',
    margin: '0 auto',
    backgroundColor: bgColor,
    padding: '1rem',
    color: '#fff',
    textAlign: 'center',
    boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.5)',
  }
  return (
    <div className='flex-msg'>
      <p style={styles}>{msg}</p>
    </div>
  )
}

export default Message
