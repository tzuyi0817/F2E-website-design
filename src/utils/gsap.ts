import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function swipeUp(element: Element | null) {
  if (!element) return;
  ScrollTrigger.create({
    trigger: element,
    // markers: true,
    onEnter: () => {
      gsap.fromTo(
        element,
        { y: 0, opacity: 0, visibility: 'hidden' },
        {
          duration: 1,
          delay: 0.2,
          y: '-30%',
          visibility: 'visible',
          opacity: 1,
          ease: 'expo',
          overwrite: 'auto',
        }
      )
    },
    onLeaveBack: () => {
      gsap.set(element, { y: 0, opacity: 0, visibility: 'hidden' });
    },
  });
}

function slideInSideways(element: Element, x: number) {
  gsap.fromTo(
    element,
    { x, opacity: 0, visibility: 'hidden' },
    {
      duration: 2,
      delay: 0.3,
      x: 0,
      visibility: 'visible',
      opacity: 1,
      ease: 'expo',
      overwrite: 'auto',
    }
  );
}

function hide(element: Element) {
  gsap.set(element, { opacity: 0, visibility: 'hidden' });
}

export {
  gsap,
  ScrollTrigger,
  swipeUp,
  slideInSideways,
  hide,
};
