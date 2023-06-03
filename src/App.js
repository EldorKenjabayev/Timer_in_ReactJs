import React, { Component } from 'react'
import './index.css'
import alarmSound from './alarm.mp3';
import bobmalarm from './bomb.mp3';


export default class App extends Component {
  state = {
    soat: 0,
    minut: 0,
    second: 0,
    intervalId: null,
    audio: new Audio(alarmSound),
    audio2: new Audio(bobmalarm)
  }

  playAlarm = () => {
    let audio = this.state.audio;
    audio.play();
  };
  playBomb = () => {
    let audio2 = this.state.audio2;
    audio2.play();
  };
  playStop = () => {
    let audio = this.state.audio;
    audio.pause();
    audio.currentTime = 0;
  };
  Btn_soat_pilus = () => {
    let soat = this.state.soat
    soat++
    this.setState({
      soat
    })
  }
  Btn_soat_minus = () => {
    let soat = this.state.soat
    if (soat > 0) {
      soat--
    } else
      if (soat <= 0) {
        alert('soat 0 dan kichik bolishi mumkin emas!!!')
      }
    this.setState({
      soat
    })
  }
  Btn_minut_pilus = () => {
    let { minut, soat } = this.state
    if (minut >= 0) {
      minut++
      if (minut > 59) {
        soat++
        minut = 0
      }
    }
    this.setState({
      minut,
      soat
    })
  }

  Btn_minut_minus = () => {
    let minut = this.state.minut
    if (minut > 0) {
      minut--
    } else
      if (minut <= 0) {
        alert('minut 0 dan kichik bolishi mumkin emas!!!')
      }
    this.setState({
      minut
    })
  }

  Btn_sekund_pilus = () => {
    let { minut, second, soat } = this.state
    if (second >= 0) {
      second++
      if (second > 59) {
        minut++
        second = 0
        if (minut > 59) {
          soat++
          minut = 0
        }
      }
    }
    this.setState({
      second,
      minut,
      soat
    })
  }

  Btn_sekund_minus = () => {
    let second = this.state.second
    if (second > 0) {
      second--
    } else
      if (second <= 0) {
        alert('sekund 0 dan kichik bolishi mumkin emas!!!')
      }
    this.setState({
      second
    })
  }

  btn_Taymer = () => {
    let { soat, minut, second } = this.state;
    if (second > 0) {
      this.playBomb()
      second--;
    } else if (second === 0) {
      if (minut > 0) {
        second = 59;
        minut--;
      } else if (minut === 0) {
        if (soat > 0) {
          soat--;
          minut = 59;
          second = 59;
        } else if (soat === 0) {
          this.playAlarm();
          clearInterval(this.state.intervalId);
        }
      }
    }
    this.setState({
      second,
      minut,
      soat
    });
  };

  btnStart = () => {
    if (!this.state.intervalId) {
      let { second, minut, soat } = this.state
      if (second === 0 && minut === 0 && soat === 0) {
        alert('taymer 0 dan boshlab bo`lmayadi !!!')
      } else {
        let intervalId = setInterval(this.btn_Taymer, 1000);
        this.setState({ intervalId });
      }
    }
  };

  btnStop = () => {
    clearInterval(this.state.intervalId);
    this.setState({ intervalId: null });
    if (this.state.audio) {
      this.playStop();
    }
  };
  btnRestart = () => {

    let { second, minut, soat } = this.state
    second = 0
    minut = 0
    soat = 0
    if (second === 0 || minut === 0 || soat === 0) {
      this.btnStop()
      this.playStop()
      this.setState({
        second,
        minut,
        soat
      })
    }
  }

  render() {
    return (
      <div style={{
        width: '70%',
        padding: '15px 0px',
        border: '1px solid #000',
        borderRadius: '25px',
        backgroundColor: '#171616',
        boxShadow: '5px 15px 10px 10px #000'
      }}>
        <div
          className="timer"
          style={{ width: '40%', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2vw', fontSize: '25px', marginTop: '5vh', background: '#EDFFCD', borderRadius: '15px', border: '1px solid #000' }}
        >
          <h3>{this.state.soat}</h3>
          <span>:</span>
          <h3>{this.state.minut}</h3>
          <span>:</span>
          <h3>{this.state.second}</h3>
        </div>
        <div className="divTimer" style={{ width: '90%', display: 'flex', justifyContent: 'space-evenly', margin: 'auto', paddingTop: '7vh', paddingBottom: '2vh' }}>
          <div className="timerSoat" >
            <h2>Soat</h2>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}>
              <button onClick={this.Btn_soat_pilus}>+</button>
              <h2>{this.state.soat}</h2>
              <button onClick={this.Btn_soat_minus}>-</button>
            </div>
          </div>
          <div className="timerMinut" >
            <h2>Minut</h2>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}>
              <button onClick={this.Btn_minut_pilus}>+</button>
              <h2>{this.state.minut}</h2>
              <button onClick={this.Btn_minut_minus}>-</button>
            </div>
          </div>
          <div className="timerSecond" >
            <h2>Sekund</h2>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}>
              <button onClick={this.Btn_sekund_pilus} >+</button>
              <h2>{this.state.second}</h2>
              <button onClick={this.Btn_sekund_minus}>-</button>
            </div>
          </div>
        </div>

        <div className="timer_btn" style={{ width: '70%', display: 'flex', justifyContent: 'space-evenly', margin: 'auto', paddingTop: '7vh', paddingBottom: '2vh' }}>
          <button onClick={this.btnStart}>Start</button>
          <button onClick={this.btnStop}>Stop</button>
          <button onClick={this.btnRestart}>Restart</button>
        </div>
      </div>
    )
  }
}
