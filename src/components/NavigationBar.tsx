import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BeakerIcon } from '@heroicons/react/24/solid';
import daisyUIThemes from '../assets/daisyUIThemes.json';

const routers = [
  { link: '/', text: 'Home' },
  { link: '/About', text: 'About' },
  { link: '/Project', text: 'Projects' },
  { link: '/Contact', text: 'Contact' },
];

type NavigationProps = {
  changeTheme: (value: string) => void;
  theme: string;
};

function NavigationBar({ changeTheme, theme }: NavigationProps) {
  const { pathname } = useLocation();

  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="flex-1">
        <Link to="/">
          <span className="btn btn-ghost normal-case text-xl">daisyUI</span>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          {routers.map((value) => {
            return (
              <li key={value.link} id={value.text}>
                <Link to={value.link} id={value.link}>
                  <span
                    className={pathname === value.link ? 'text-primary' : ''}
                  >
                    {value.text}
                  </span>
                </Link>
              </li>
            );
          })}
          <li className="w-44">
            <span>
              <BeakerIcon className="w-6 text-primary" />
            </span>
            <ul className="bg-base-100 btn-group p-5">
              {daisyUIThemes.themes.map((value, index) => {
                return (
                  <li
                    id={value}
                    key={value}
                    className={value === theme ? 'btn-active' : ' btn'}
                  >
                    <button
                      type="button"
                      onClick={() => changeTheme(value)}
                      title={value}
                      aria-label={value}
                      data-title={index}
                    >
                      {value}
                    </button>
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavigationBar;
