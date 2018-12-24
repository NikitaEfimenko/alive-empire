import { Howl } from 'howler'

export const click1 = () => {
  const sounds = [
    'music/1.mp3',
  //  'music/2.mp3',
  ]
  const sound = new Howl({
    src:sounds,
    autoplay: true,
    volume: 0.9,
  });
}

export const click2 = () => {
  const sounds = [
    'music/2.mp3',
  //  'music/2.mp3',
  ]
  const sound = new Howl({
    src:sounds,
    autoplay: true,
    volume: 0.9,
  });
}

