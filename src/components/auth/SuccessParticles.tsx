'use client';

import type { ISourceOptions } from '@tsparticles/engine';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { loadFull } from 'tsparticles';

function SuccessParticles() {
  const [init, setInit] = useState(false);
  const [mainElement, setMainElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    })
      .then(() => {
        setInit(true);
      })
      .catch((error) => {
        console.error('Error initializing particles engine:', error);
      });

    const main = document.querySelector('main');
    setMainElement(main);
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      detectRetina: true,
      emitters: {
        direction: 'top',
        life: {
          count: 0,
          duration: 0.1,
          delay: 0.1,
        },
        rate: {
          delay: 0.15,
          quantity: 1,
        },
        size: {
          width: 100,
          height: 0,
        },
        position: {
          y: 100,
          x: 50,
        },
      },
      particles: {
        number: {
          value: 0,
        },
        destroy: {
          bounds: {
            top: 30,
          },
          mode: 'split',
          split: {
            count: 1,
            factor: {
              value: 0.333333,
            },
            rate: {
              value: 100,
            },
            particles: {
              stroke: {
                width: 0,
              },
              color: {
                value: ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93'],
              },
              number: {
                value: 0,
              },
              collisions: {
                enable: false,
              },
              destroy: {
                bounds: {
                  top: 0,
                },
              },
              opacity: {
                value: {
                  min: 0.1,
                  max: 1,
                },
                animation: {
                  enable: true,
                  speed: 0.7,
                  sync: false,
                  startValue: 'max',
                  destroy: 'min',
                },
              },
              shape: {
                type: 'circle',
              },
              size: {
                value: 2,
                animation: {
                  enable: false,
                },
              },
              life: {
                count: 1,
                duration: {
                  value: {
                    min: 1,
                    max: 2,
                  },
                },
              },
              move: {
                enable: true,
                gravity: {
                  enable: true,
                  acceleration: 9.81,
                  inverse: false,
                },
                decay: 0.1,
                speed: {
                  min: 10,
                  max: 25,
                },
                direction: 'outside',
                outModes: 'destroy',
              },
            },
          },
        },
        life: {
          count: 1,
        },
        shape: {
          type: 'line',
        },
        size: {
          value: {
            min: 0.1,
            max: 50,
          },
          animation: {
            enable: true,
            sync: true,
            speed: 90,
            startValue: 'max',
            destroy: 'min',
          },
        },
        stroke: {
          color: {
            value: '#ffffff',
          },
          width: 1,
        },
        rotate: {
          enable: true,
          path: true,
        },
        move: {
          enable: true,
          gravity: {
            acceleration: 15,
            enable: true,
            inverse: true,
            maxSpeed: 100,
          },
          speed: {
            min: 10,
            max: 20,
          },
          outModes: {
            default: 'destroy',
            top: 'none',
          },
          trail: {
            fill: { color: '#000000' },
            enable: true,
            length: 10,
          },
        },
      },
    }),
    [],
  );

  const particles = init ? <Particles options={options} /> : null;

  return mainElement && createPortal(particles, mainElement);
}

export { SuccessParticles };
