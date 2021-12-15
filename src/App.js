import React, { useEffect, useContext } from 'react'
import Button from './components/Button'
import CountdownAnimation from './components/CountdownAnimation'
import SetPomodoro from './components/SetPomodoro'
import { SettingsContext } from './context/SettingsContext'

const App = () => {

  const {
    pomodoro,
    executing,
    startAnimate,
    children,
    startTimer,
    pauseTimer,
    updateExecute,
    setCurrentTimer,
    SettingsBtn } = useContext(SettingsContext)

    useEffect(() => {updateExecute(executing)}, [executing, startAnimate])

  return (
    <div className="main_class">
      <div className="container1">
        
      </div>

      <div className="container">
        
        <img
          src="http://www.avicys.com/assets/logo_avicys2.png"
          alt="AVICYS logo"
        />
        <h1>Offre Special Salon <br/><small>Ventes flash</small></h1>
        
        {/* <small>Ventes Flash</small> */}
        {pomodoro !== 0 ?
        <>
          {/* <ul className="labels">
            <li>
              <Button 
                title="Work" 
                activeClass={executing.active === 'work' ? 'active-label' : undefined} 
                _callback={() => setCurrentTimer('work')} 
              />
            </li>
            <li>
              <Button 
                title="Short Break" 
                activeClass={executing.active === 'short' ? 'active-label' : undefined} 
                _callback={() => setCurrentTimer('short')} 
              />
            </li>
            <li>
              <Button 
                title="Long Break" 
                activeClass={executing.active === 'long' ? 'active-label' : undefined} 
                _callback={() => setCurrentTimer('long')} 
              />
            </li>
          </ul> */}
          
          <div className="timer-container">
            <div className="time-wrapper">
                <CountdownAnimation
                  key={pomodoro} 
                  timer={pomodoro} 
                  animate={startAnimate}
                >
                  {children}
                </CountdownAnimation>
            </div>
          </div>
          <h2 className="time_limited">DUREE LIMITEE</h2>
          <div className="button-wrapper">
            <Button title="S" activeClass={!startAnimate ? 'active' : undefined} _callback={startTimer} />
            <Button title="P" activeClass={startAnimate ? 'active' : undefined} _callback={pauseTimer} />
            <Button title="S" _callback={SettingsBtn} />
          </div>
        </> : <SetPomodoro />}
      </div>
    </div>
    
  )
}

export default App
