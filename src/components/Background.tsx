import React from 'react'

const Background = ({ children }) => {
  const gradientStyle = {
    background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
    width: '100vh',
    height: '100vh', // Adjust the height as needed
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    postion: 'absolute',
  }

  return <div style={gradientStyle}>{children && children}</div>
}

export default Background
