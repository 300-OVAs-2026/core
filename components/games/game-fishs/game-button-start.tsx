import { Panel } from 'books-ui';

import { useOvaContext } from '@/context/ova-context';

import { i18n } from './consts';

import css from './game.module.css';

export const GameButtonStart = () => {
  const { lang } = useOvaContext();

  return (
    <Panel.Button section={1}>
      <button className={css.button_start} aria-label={i18n[lang].start}>
        <svg id="SvgGameFishButtonStart" width="100%" height="auto" viewBox="0 0 219 66">
          <style>
            {`
                #SvgGameFishButtonStart .prefix__s1,
                #SvgGameFishButtonStart .prefix__s2 {
                    fill: none;
                    stroke: #fffef9;
                    stroke-miterlimit: 10;
                    stroke-width: 1.1
                }

                #SvgGameFishButtonStart .prefix__s2 {
                    stroke-width: .6
                }

                #SvgGameFishButtonStart .prefix__s3 {
                    fill: #fffefe
                }

                #SvgGameFishButtonStart .prefix__s4 {
                    fill: #fff
                }
              
              
              `}
          </style>
          <g id="prefix__Boton_inicio">
            <g id="prefix__&lt;Group&gt;">
              <g id="prefix__&lt;Group&gt;">
                <path
                  id="prefix__&lt;Path&gt;"
                  d="M185.6 62.7H33.4c-16.7 0-30.3-13.6-30.3-30.3 0-16.7 13.6-30.3 30.3-30.3h152.2c16.7 0 30.3 13.6 30.3 30.3 0 16.7-13.6 30.3-30.3 30.3z"
                  fill="#008186"
                  stroke="#f5fafd"
                  strokeMiterlimit={10}
                  strokeWidth={2.6}
                />
                <g id="prefix__&lt;Group&gt;">
                  <g id="prefix__&lt;Group&gt;">
                    <path
                      id="prefix__&lt;Path&gt;"
                      className="prefix__s1"
                      d="M43.7 31.9c0 7.1-5.8 12.8-12.8 12.8C23.8 44.7 18 39 18 31.9c0-7.1 5.8-12.8 12.9-12.8 7 0 12.8 5.7 12.8 12.8z"
                    />
                    <path
                      id="prefix__&lt;Path&gt;"
                      className="prefix__s2"
                      d="M38.2 31.9c0 4.1-3.3 7.4-7.3 7.4-4.1 0-7.4-3.3-7.4-7.4 0-4 3.3-7.3 7.4-7.3 4 0 7.3 3.3 7.3 7.3z"
                    />
                    <g id="prefix__&lt;Group&gt;">
                      <path id="prefix__&lt;Path&gt;" className="prefix__s3" d="M15.3 31.3l15.7-2 15.8 2L31 33.4z" />
                    </g>
                    <g id="prefix__&lt;Group&gt;">
                      <path id="prefix__&lt;Path&gt;" className="prefix__s3" d="M31 47l-2-15.7 2-15.7 2.1 15.7z" />
                    </g>
                    <g id="prefix__&lt;Group&gt;">
                      <path
                        id="prefix__&lt;Path&gt;"
                        className="prefix__s4"
                        d="M19.9 20.4l11.8 10.4 10.5 11.8-11.8-10.5z"
                      />
                      <path
                        id="prefix__&lt;Path&gt;"
                        className="prefix__s4"
                        d="M19.9 42.6l10.4-11.9 11.9-10.3-10.4 11.8z"
                      />
                    </g>
                  </g>
                  <g id="prefix__&lt;Group&gt;">
                    <path
                      id="prefix__&lt;Path&gt;"
                      className="prefix__s1"
                      d="M200.6 31.9c0 7.1-5.8 12.8-12.8 12.8-7.1 0-12.9-5.7-12.9-12.8 0-7.1 5.8-12.8 12.9-12.8 7 0 12.8 5.7 12.8 12.8z"
                    />
                    <path
                      id="prefix__&lt;Path&gt;"
                      className="prefix__s2"
                      d="M195.1 31.9c0 4.1-3.3 7.4-7.3 7.4-4.1 0-7.4-3.3-7.4-7.4 0-4 3.3-7.3 7.4-7.3 4 0 7.3 3.3 7.3 7.3z"
                    />
                    <g id="prefix__&lt;Group&gt;">
                      <path id="prefix__&lt;Path&gt;" className="prefix__s3" d="M172.2 31.3l15.8-2 15.7 2-15.7 2.1z" />
                    </g>
                    <g id="prefix__&lt;Group&gt;">
                      <path id="prefix__&lt;Path&gt;" className="prefix__s3" d="M188 47l-2.1-15.7 2.1-15.7 2 15.7z" />
                    </g>
                    <g id="prefix__&lt;Group&gt;">
                      <path
                        id="prefix__&lt;Path&gt;"
                        className="prefix__s4"
                        d="M176.8 20.4l11.8 10.4 10.5 11.8-11.8-10.5z"
                      />
                      <path
                        id="prefix__&lt;Path&gt;"
                        className="prefix__s4"
                        d="M176.8 42.6l10.4-11.9 11.9-10.3-10.4 11.8z"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <text x="70" y="40" className={css['button_start__text']}>
            {i18n[lang].start}
          </text>
        </svg>
      </button>
    </Panel.Button>
  );
};
