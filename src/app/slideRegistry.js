import { lazy } from 'react';

const loaders = {
  1:  () => import('../slides/Slide01Topic'),
  2:  () => import('../slides/Slide02VideoIntro'),
  3:  () => import('../slides/Slide03Members'),
  4:  () => import('../slides/Slide04DamQ1'),
  5:  () => import('../slides/Slide05DamQ2'),
  6:  () => import('../slides/Slide06DamQ3'),
  7:  () => import('../slides/Slide07DamQ4'),
  8:  () => import('../slides/Slide08DamQ5'),
  9:  () => import('../slides/Slide09LanQ1'),
  10: () => import('../slides/Slide10LanQ2'),
  11: () => import('../slides/Slide11LanQ3'),
  12: () => import('../slides/Slide12LanQ4'),
  13: () => import('../slides/Slide13LanQ5'),
  14: () => import('../slides/Slide14KaliQ1'),
  15: () => import('../slides/Slide15KaliQ2'),
  16: () => import('../slides/Slide16KaliQ3'),
  17: () => import('../slides/Slide17KaliQ4'),
  18: () => import('../slides/Slide18KaliQ5'),
  19: () => import('../slides/Slide19MiniGame'),
  20: () => import('../slides/Slide20Closing'),
};

export const SlideComponents = Object.fromEntries(
  Object.entries(loaders).map(([id, loader]) => [id, lazy(loader)])
);

export const loadSlide = (id) => (loaders[id] ? loaders[id]() : Promise.resolve());
