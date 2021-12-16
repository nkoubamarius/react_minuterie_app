import React, { useEffect, useContext ,useState} from 'react'
import Button from './components/Button'
import CountdownAnimation from './components/CountdownAnimation'
import SetPomodoro from './components/SetPomodoro'
import { SettingsContext } from './context/SettingsContext'
import {CountdownCircleTimer} from 'react-countdown-circle-timer'

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

    var minutes_ck=0;
    var date_ck=new Date(), d2=new Date(date_ck);

    var current_date=new Date();

    const [minutes_to_start, setMinutesToStart] = useState()
    const [seconds_to_start, setSecondsToStart] = useState()

    const [diff_hour, setDiffHour] = useState()

    const [total_seconds, setTotalSeconds]= useState()

    useEffect(() => {
      var ls = require('local-storage');

      date_ck= new Date(ls.get('finish_time'));
      d2=new Date(date_ck);
      minutes_ck= ls.get('finish_minutes');

      d2.setMinutes( date_ck.getMinutes()+ls.get('finish_minutes') );

      var d2_year = d2.getFullYear();
      var d2_month = d2.getMonth();
      var d2_days = d2.getDay();
      var d2_hour = d2.getHours();
      var d2_minutes = d2.getMinutes();
      var d2_seconds = d2.getSeconds();

      var current_date_year = current_date.getFullYear();
      var current_date_month = current_date.getMonth();
      var current_date_days = current_date.getDay();
      var current_date_hour = current_date.getHours();
      var current_date_minutes = current_date.getMinutes();
      var current_date_seconds = current_date.getSeconds();

      var new_d2 = d2_year+"/"+d2_month+"/"+d2_days+" "+d2_hour+":"+d2_minutes+":"+d2_seconds
      var new_current_date = current_date_year+"/"+current_date_month+"/"+current_date_days+" "+current_date_hour+":"+current_date_minutes+":"+current_date_seconds

      console.log(new_d2);
      console.log(new_current_date);

      if(new Date(new_d2) > new Date(new_current_date)){
        var diff = Math.abs(new Date(new_d2) - new Date(new_current_date));

        var minutes= ((diff) / 1000) / 60;

        var seconds = ((diff) / 1000) % 60;

        var total_seconds = (Math.floor(minutes)*60)+Math.floor(seconds);
        setTotalSeconds(total_seconds)

        setMinutesToStart(Math.floor(minutes));
        setSecondsToStart(Math.floor(seconds));

        setDiffHour(Math.floor(minutes)+" : "+Math.floor(seconds));

        console.log(Math.floor(minutes)+" : "+Math.floor(seconds))
        console.log(total_seconds);

      }else{
        console.log("weird")
        ls('finish_minutes', 1);
        ls('finish_time', new Date());
      }
    },[]);

    useEffect(() => {
      updateExecute(executing)
    }, [executing, startAnimate])
  
    const formatRemainingTime = time => {
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = time % 60;
    
      return `${minutes}:${seconds}`;
    };
    
    const renderTime = ({ remainingTime }) => {
    
      return (
        <div className="timer">
          <div className="value">{formatRemainingTime(remainingTime)}</div>
        </div>
      );
    };
    

  return (
    <div className="main_class">
      <div className="container1">
        
      </div>

      <div className="container">
        
        <img
          src="http://www.avicys.com/assets/logo_avicys2.png"
          alt="AVICYS logo"
        />
        <h1>OFFRE SPECIAL SALON<br/><small>VENTES FLASH</small></h1>

        {minutes_to_start > 0 ?
          <>
            <div className="timer-container">
              <div className="time-wrapper">
                <CountdownCircleTimer
                  isPlaying
                  duration={total_seconds}
                  colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                  strokeWidth={8}
                  size={360}
                  trailColor="#FFF"
                  onComplete={() => [true, 1000]}
                >
                  {renderTime}
                </CountdownCircleTimer>
              </div>
            </div>
            <h2 className="time_limited">DUREE&nbsp;&nbsp;LIMITEE</h2>

            <div className="button-wrapper">
              <Button title="S" _callback={SettingsBtn} />
            </div>
            
          </>
          :
          <>
          {pomodoro !== 0 ?
            <>
              <div className="timer-container">
                <div className="time-wrapper">
                    <CountdownAnimation
                      key={pomodoro} 
                      timer={pomodoro} 
                      animate={startAnimate}
                    >
                      {children }
                    </CountdownAnimation>
                </div>
              </div>
              <h2 className="time_limited">DUREE&nbsp;&nbsp;LIMITEE</h2>
              <div className="button-wrapper">
                <Button title="S" activeClass={!startAnimate ? 'active' : undefined} _callback={startTimer} />
                <Button title="P" activeClass={startAnimate ? 'active' : undefined} _callback={pauseTimer} />
                <Button title="S" _callback={SettingsBtn} />
              </div>
            </> : <SetPomodoro />}
          </>
        }
        
      </div>
    </div>
    
  )
}

export default App
