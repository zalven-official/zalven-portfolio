import React from 'react';
import { Link } from 'react-router-dom';

const routers = [
  { link: '/', text: 'Home' },
  { link: '/About', text: 'About' },
  { link: '/Project', text: 'Projects' },
  { link: '/Contact', text: 'Contact' },
];
function NavigationBar() {
  return (
    <div className="navbar bg-base-100">
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
                  <span>{value.text}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

NavigationBar.propTypes = {};

export default NavigationBar;
