import React from 'react'

const Footer = ({onNewGameClick, onAiCLick}) => {
  return (
    <div className="panel footer">
        <button onClick={onNewGameClick}>New Game</button>
        <button onClick={onAiCLick}>AI</button>
    </div>
  )
}

export default Footer;