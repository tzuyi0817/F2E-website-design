import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const gsapMap = new Map();

gsap.registerPlugin(ScrollTrigger);

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
  swipeUp,
  slideInSideways,
  hide,
  removeTrigger,
  killPinTrigger,
  killTrigger,
};
