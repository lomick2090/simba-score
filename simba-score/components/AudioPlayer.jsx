import React from 'react';
import styles from '../styles/audio.module.css'
import buttonStyle from '../styles/mantras.module.css'

class AudioPlayer extends React.Component {
  state = {
    playing: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
  }

  audioRef = React.createRef()


  handlePlay = () => {
    this.audioRef.current.play()
    this.setState({ playing: true })
  }

  handlePause = () => {
    this.audioRef.current.pause()
    this.setState({ playing: false })
  }

  handleTimeUpdate = () => {
    this.setState({
      currentTime: this.audioRef.current.currentTime,
      duration: this.audioRef.current.duration
    })
  }

  handleVolumeChange = (e) => {
    this.setState({ volume: e.target.value });
    this.audioRef.current.volume = e.target.value;
  }

  handleSeek = (e) => {
    this.audioRef.current.currentTime = e.target.value;
  }

  render() {
    const { playing, currentTime, duration, volume} = this.state

    return (
      <div className={styles.audiomodule}>
        <audio
          ref={this.audioRef}
          src={this.props.url}
          onTimeUpdate={this.handleTimeUpdate}
          onEnded={this.handleNextTrack}
        />
        <div className={styles.audiobuttons}>
          <button className={buttonStyle.mantrabuttons} onClick={this.handlePrevTrack}>Prev</button>
          <button  className={buttonStyle.mantrabuttons} onClick={playing ? this.handlePause : this.handlePlay}>
            {playing ? 'Pause' : 'Play'}
          </button>
        </div>
        <div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={this.handleVolumeChange}
          />
          <input
            type="range"
            min={0}
            max={duration}
            step={0.01}
            value={currentTime}
            onChange={this.handleSeek}
          />
        </div>
      </div>
    )
  }
}

export default AudioPlayer