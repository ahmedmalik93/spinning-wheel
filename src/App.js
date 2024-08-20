import React, { useEffect, useState } from 'react'
import {Modal} from 'antd';
import LionIcon from './assets/images/PropFirmLion.png'
import DiscoLight from './assets/images/disco.gif'
import SpotLight from './assets/images/spotlight.gif'
import SpotLightFrozy from './assets/images/spotlight-forzy.gif'
import SpotLightPink from './assets/images/spotlight-pink.gif'
import SpotLightYellow from './assets/images/spotlight-yellow.gif'
import SpotLightGreen from './assets/images/spotlight-green.gif'
import FacebookIcon from './assets/icons/facebook.png'
import TelegramIcon from './assets/icons/telegram.webp'
import YoutubeIcon from './assets/icons/youtube.png'
import DiscordIcon from './assets/icons/discord.png'

import WheelSound from './assets/audio/wheel.mp3'
import DiscoSound from './assets/audio/casino.mp3'
import Applause from './assets/audio/applause.mp3'

import './App.css';

function App() {
  const [casinoMusic, setCasinoMusic] = useState(null);
  const [wheelNumbers, setWheelNumbers] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [isSpining, setIsSpining] = useState(false);
  const [assignedNumber, setAssignedNumber] = useState(null);

  const resetWheel = () => {
    setIsStarted(false);
    setIsOpenModal(false);
  }
  
  const assignNumbers = () => {
    const randomNumbers = new Set();

    while (randomNumbers.size < 10) {
      const randomNumber = Math.floor(Math.random() * (9999 - 100 + 1)) + 100;
      randomNumbers.add(randomNumber);
    }
    setWheelNumbers(Array.from(randomNumbers))
  }

  const getLuckyDrawNumber = () => {
    return (
      <>
          <img src={LionIcon} style={{height:'40px', display:'inline-block'}} />
          <h2>Hey! <br />Here's Your Lucky Draw Number</h2>
          <h1 className='neonText mt-5'>{assignedNumber}</h1>
          <div className='mt-5'>
            <ul className='socialList'>
              <li>
                <a href="#" target='_blank'>
                  <img src={FacebookIcon} alt="Social Icon" />
                </a>
              </li>
              <li>
                <a href="#" target='_blank'>
                  <img src={YoutubeIcon} alt="Social Icon" />
                </a>
              </li>
              <li>
                <a href="#" target='_blank'>
                  <img src={DiscordIcon} alt="Social Icon" />
                </a>
              </li>
              <li>
                <a href="#" target='_blank'>
                  <img src={TelegramIcon} alt="Social Icon" />
                </a>
              </li>
            </ul>
          </div>
      </>
    )
  }

  const toggleLoadingStatus = async () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000)
  }


  useEffect(() => {  
    toggleLoadingStatus();
    assignNumbers();
    const audio = new Audio(DiscoSound); // Replace 'your-audio-file.mp3' with your audio file path
    audio.loop = true;
    setCasinoMusic(audio);

    // Clean up function
    return () => {
      // Pause and reset the audio when the component unmounts
      audio.pause();
      audio.currentTime = 0;
    };
  }, [])

  useEffect(() => {
    // Clean up audio when the component unmounts or when the URL changes
    return () => {
      if (casinoMusic) {
        casinoMusic.pause();
        casinoMusic.currentTime = 0;
      }
    };
  }, [casinoMusic, window.location.pathname]);

  const playAudio = () => {
    const audioElement = new Audio(WheelSound); // Replace 'your-audio-file.mp3' with your actual audio file path
    audioElement.play();
  };

  const playApplause = () => {
    const audioElement = new Audio(Applause); // Replace 'your-audio-file.mp3' with your actual audio file path
    audioElement.play();
  };
 
  const shuffle = (array) => {
    var currentIndex = array.length,
    randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  
    return array;
  }

  const spin = async () => { 
    playAudio();
    setIsSpining(true);
    // Inisialisasi variabel
    const box = document.getElementById("box");
    const element = document.getElementById("mainbox");
    let SelectedItem = "";

    let box2 = shuffle([1570, 1930, 2290]);
    let box3 = shuffle([1890, 2250, 2610]);
    let box4 = shuffle([1850, 2210, 2570]);
    let box5 = shuffle([1810, 2170, 2530]);
    let box6 = shuffle([1770, 2130, 2490]);
    let box7 = shuffle([1750, 2110, 2470]);
    let box10 = shuffle([1630, 1990, 2350]);

    // Bentuk acak
    let Hasil = shuffle([
      box2[0],
      box3[0],
      box4[0],
      box5[0],
      box6[0],
      box7[0],
      box10[0],
    ]); 

   
    if (box2.includes(Hasil[0])) SelectedItem = wheelNumbers[1];
    if (box3.includes(Hasil[0])) SelectedItem = wheelNumbers[2];
    if (box4.includes(Hasil[0])) SelectedItem = wheelNumbers[3];
    if (box5.includes(Hasil[0])) SelectedItem = wheelNumbers[4];
    if (box6.includes(Hasil[0])) SelectedItem = wheelNumbers[5];
    if (box7.includes(Hasil[0])) SelectedItem = wheelNumbers[6];
    if (box10.includes(Hasil[0])) SelectedItem = wheelNumbers[9];
    setAssignedNumber(SelectedItem);
    box.style.setProperty("transition", "all ease 15s");
    box.style.transform = "rotate(" + Hasil[0] + "deg)";
    element.classList.remove("animate");

    try {
      element.classList.add("animate");
      setTimeout(function () {
        setIsOpenModal(true);
        playApplause();
        setIsSpining(false);
      }, 15000);
     
     
       setTimeout(function () {
          box.style.setProperty("transition", "initial");
          box.style.transform = "rotate(90deg)";
        }, 16000);
    } catch (error) {
      console.log("error====", error);
    } 
  };

  const enterIntoWheel = () => {
    casinoMusic.play()
    setIsStarted(true)
  }

  return (
    <div className="wheelContainer">

      <img className='topSpotLight' src={SpotLightFrozy} />
      <img className='topSpotLight2' src={SpotLightPink} />

      {isStarted ? 
      <>
        <img className='discoLight' src={DiscoLight} />
        <img className='rightDisco' src={DiscoLight} />
        <img className='spotLight' src={SpotLight} />
        <img className='spotLight2' src={SpotLight} />
        <img className='spotLight3' src={SpotLight} />
        <img className='spotLight4' src={SpotLight} />
          <div className="mainbox" id="mainbox">
            <div className="box" id="box">
              <div className="box1">
                <span className="span font span1"><b>{wheelNumbers[0]}</b></span>
                <span className="span font span2"><b>{wheelNumbers[1]}</b></span>
                <span className="span font span3"><b>{wheelNumbers[2]}</b></span>
                <span className="span font span4"><b>{wheelNumbers[3]}</b></span>
                <span className="span font span5"><b>{wheelNumbers[4]}</b></span>
              </div>
              <div className="box2"> 
                <span className="span font span1"><b>{wheelNumbers[5]}</b></span>
                <span className="span font span2"><b>{wheelNumbers[6]}</b></span>
                <span className="span font span5"><b>{wheelNumbers[7]}</b></span>
                <span className="span font span4"><b>{wheelNumbers[8]}</b></span>
                <span className="span font span3"><b>{wheelNumbers[9]}</b></span>
              </div>
            </div>
            <button className="spin" onClick={() => spin()} disabled={isSpining} style={{background:isSpining?'black':'white'}}>
                <img style={{marginTop:'5px', marginLeft:'5px', height:'60px'}} src={LionIcon} alt='LOGO' />
            </button>
          </div> 
        </>
        :
        <>
        {!isLoading ? 
          <>
            <img className='discoLightCenter' src={DiscoLight} />
            <img className='topSpotLight0' src={SpotLightGreen} />
            <img className='topSpotLight3' src={SpotLightYellow} />
            <div className='starter'>
              <img src={LionIcon} style={{height:'60px', marginBottom:'30px', display:'inline-block'}} />
              <h2>Spin The Wheel & Get Your <strong>Lucky Draw Number!</strong></h2>
              <button className='startGameBtn' onClick={() => enterIntoWheel()} >Start Now</button>
            </div>
          </> 
        :
          <>
            <div className="squares-common square-one"></div>
            <div className="squares-common square-two"></div> 
            <p className='neonTextSimple' style={{ marginTop:'80px'}}>LOADING</p>
          </>
        }
        </>
      }


        <Modal maskClosable={false} closable={false} open={isOpenModal} footer={null} onCancel={() => setIsOpenModal(false)}>
            {getLuckyDrawNumber()}
            <button className={'themeBtn'} onClick={() => resetWheel()}>
              Try Again
            </button>
        </Modal>
    </div>
  )
}

export default App;
