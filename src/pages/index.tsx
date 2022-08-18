import { useState, useRef, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Header from 'components/Header';
import ReactAudioPlayer from 'react-audio-player';
import isClient from 'utils/isClient';
import Image from 'next/image';

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['home'])),
    },
  };
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 40px 80px 40px;
`;

const Watame = styled.div<{ isPlaying: boolean }>`
  position: relative;
  width: 400px;
  height: 400px;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    animation-name: janken;
    animation-duration: 10s;
    animation-delay: 4.5s;
    animation-play-state: ${props => (props.isPlaying ? `running` : `paused`)};

    @keyframes janken {
      0% {
        transform: rotate(0);
      }
      4% {
        transform: rotate(60deg);
      }
      8% {
        transform: rotate(0);
      }
      12% {
        transform: rotate(-60deg);
      }
      16% {
        transform: rotate(0);
      }
      20% {
        transform: rotate(120deg);
      }
      24% {
        transform: rotate(0);
      }
      28% {
        transform: rotate(-120deg);
      }
      32% {
        transform: rotate(0);
      }
      36% {
        transform: rotate(180deg);
      }
      40% {
        transform: rotate(0);
      }
      44% {
        transform: rotate(-180deg);
      }
      48% {
        transform: rotate(0);
      }
      52% {
        transform: rotate(360deg);
      }
      56% {
        transform: rotate(0);
      }
      60% {
        transform: rotate(-360deg);
      }
      64% {
        transform: rotate(0);
        top: 0;
        left: 0;
      }
      68% {
        top: 100px;
        left: 200px;
      }
      72% {
        top: -200px;
        left: -100px;
      }
      76% {
        top: 0px;
        left: 300px;
      }
      80% {
        top: 100px;
        left: -400px;
      }
      84% {
        top: 50px;
        left: -100px;
        transform: rotate(5000deg);
      }
      88% {
        top: -200px;
        left: -100px;
      }
      92% {
        top: 200px;
        left: 300px;
      }
      96% {
        top: -100px;
        left: -400px;
      }
      100% {
        top: 0;
        left: 0;
        transform: rotate(0);
      }
    }
  }
`;

const TextBox = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  h1 {
    color: var(--text-primary);
    font-size: 40px;
    line-height: 44px;
  }
  span {
    margin-top: 12px;
    color: var(--text-secondary);
    font-size: 20px;
  }
`;

const Cards = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.button<{ selected: boolean }>`
  width: 200px;
  height: 200px;
  padding: 12px;
  cursor: pointer;

  ${props =>
    props.selected &&
    `
    padding: 10px;
    border: 2px solid #fa5252;
  `}

  img {
    width: 100%;
    height: 100%;
  }
`;

const StartButton = styled.button`
  margin: 20px 0;
  padding: 8px 28px;
  border-radius: 100px;
  box-shadow: 0px 4px 20px rgba(255, 230, 200, 0.5);
  background-color: #fff9db;

  span {
    font-size: 20px;
    color: #000;
    font-weight: bold;
  }
`;

const Home: NextPage = props => {
  const { t } = useTranslation('home');
  const [isPlaying, setIsPlaying] = useState(false);
  const [jankenAudio] = useState(isClient() && new Audio('/sounds/janken.mp3'));
  const [bakaAudio] = useState(isClient() && new Audio('/sounds/baka.mp3'));
  const [myCard, setMyCard] = useState<'scissors' | 'rock' | 'paper'>('scissors');

  useEffect(() => {
    if (!jankenAudio) return;
    jankenAudio.volume = 0.05;
    isPlaying ? jankenAudio.play() : jankenAudio.pause();
  }, [isPlaying, jankenAudio]);

  return (
    <>
      <Head>
        <title>{'Tsunomaki Janken'}</title>
      </Head>
      <Container>
        <Header />
        <Watame isPlaying={isPlaying}>
          <img src="/images/idle.png" alt="watame" />
        </Watame>
        <TextBox>
          <h1>{t('title')}</h1>
          <span>{t('description')}</span>
        </TextBox>
        <Cards>
          <Card selected={myCard === 'scissors'} onClick={() => setMyCard('scissors')} disabled={isPlaying}>
            <Image src="/images/scissors.png" alt="scissors" width={300} height={300} />
          </Card>
          <Card selected={myCard === 'rock'} onClick={() => setMyCard('rock')} disabled={isPlaying}>
            <Image src="/images/rock.png" alt="rock" width={300} height={300} />
          </Card>
          <Card selected={myCard === 'paper'} onClick={() => setMyCard('paper')} disabled={isPlaying}>
            <Image src="/images/paper.png" alt="paper" width={300} height={300} />
          </Card>
        </Cards>
        <StartButton onClick={() => setIsPlaying(true)} disabled={isPlaying}>
          <span>가위바위보!</span>
        </StartButton>
      </Container>
    </>
  );
};

export default Home;
