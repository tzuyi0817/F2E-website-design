import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import MotionPathPlugin from 'gsap/MotionPathPlugin';

const gsapMap = new Map();

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

function swipeUp(element: Element | null) {
  if (!element) return;
  return ScrollTrigger.create({
    trigger: element,
    // markers: true,
    onEnter: () => {
      gsap.fromTo(
        element,
        { y: 0, autoAlpha: 0 },
        {
          duration: 1,
          delay: 0.2,
          y: '-30%',
          autoAlpha: 1,
          ease: 'expo',
          overwrite: 'auto',
        }
      )
    },
    onLeaveBack: () => {
      gsap.set(element, { y: 0, autoAlpha: 0 });
    },
  });
}

function slideInSideways(element: Element, x: number) {
  gsap.fromTo(
    element,
    { xPercent: x, autoAlpha: 0 },
    {
      duration: 2,
      delay: 0.3,
      xPercent: 0,
      autoAlpha: 1,
      ease: 'expo',
      overwrite: 'auto',
    }
  );
}

function hide(element: Element) {
  gsap.set(element, { autoAlpha: 0 });
}

function createTimeLine(className: string) {
  const options = {
    start: 'top 100%',
    end: 'top 1%',
    scrub: true,
  };

  return gsap.timeline({
    scrollTrigger: { trigger: className, ...options },
  });
}

function moveCharacters() {
  let currentPosition = '';

  return function (event: MouseEvent) {
    const mousePosition = event.x / window.innerWidth * 100;

    switch (true) {
      case mousePosition <= 33.3 && currentPosition !== 'left':
        currentPosition = 'left';
        gsap.to('.f2e_characters_f2e', { xPercent: -10 });
        gsap.to('.f2e_characters_ui', { xPercent: 10 });
        gsap.to('.f2e_characters_team', { xPercent: 10 });
        break;
      case mousePosition > 33.3 && mousePosition < 66.6 && currentPosition !== 'middle':
        currentPosition = 'middle';
        gsap.to('.f2e_characters_f2e', { xPercent: 0 });
        gsap.to('.f2e_characters_ui', { xPercent: 0 });
        gsap.to('.f2e_characters_team', { xPercent: 0 });
        break;
      case mousePosition > 66.6 && currentPosition !== 'right':
        currentPosition = 'right';
        gsap.to('.f2e_characters_f2e', { xPercent: -10 });
        gsap.to('.f2e_characters_ui', { xPercent: -10 });
        gsap.to('.f2e_characters_team', { xPercent: 10 });
        break;
      default:
        break;
    }
  }
}

function removeTrigger(name: string) {
  const memoAnimate = gsapMap.get(name);
  if (!memoAnimate) return;

  Reflect.ownKeys(memoAnimate).forEach(triggerName => {
    memoAnimate[triggerName]?.disable(true);
  });
}

function killPinTrigger(name: string) {
  const memoAnimate = gsapMap.get(name);
  if (!memoAnimate) return;

  Reflect.ownKeys(memoAnimate).forEach(triggerName => {
    memoAnimate[triggerName]?.scrollTrigger.kill(true);
  });
}

function killTrigger(name: string) {
  const memoAnimate = gsapMap.get(name);
  if (!memoAnimate) return;
  memoAnimate.scrollTrigger?.kill(true);
}

export {
  gsap,
  gsapMap,
  ScrollTrigger,
  MotionPathPlugin,
  swipeUp,
  slideInSideways,
  hide,
  createTimeLine,
  removeTrigger,
  killPinTrigger,
  killTrigger,
  moveCharacters,
};
