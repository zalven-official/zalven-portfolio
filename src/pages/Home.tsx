import React from 'react';
import { BuildingOffice2Icon } from '@heroicons/react/24/solid';
import { Link, useNavigate } from 'react-router-dom';
import {
  AiFillFacebook,
  AiFillGithub,
  AiOutlineTwitter,
  AiFillLinkedin,
  AiOutlineInstagram,
  AiOutlineArrowRight,
} from 'react-icons/ai';
import { FaDiscord } from 'react-icons/fa';

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="hero min-h-screen ">
        <div className="hero-content text-center ">
          <div className="max-w-md">
            <p className="py-2 text-2xl ">Hello, I m</p>
            <h1 className="text-6xl font-bold select-none">
              <strong className="text-primary">Z</strong>alven{' '}
              <strong className="text-primary">B</strong>lue
            </h1>

            <p className="py-2 text-xl font-semibold  flex my-3 items-center justify-center gap-5">
              <BuildingOffice2Icon className="w-8  text-primary text-center" />
              Computer Science Student
            </p>
            <p className="py-6 ">
              Freelance Web developer and Mobile developer. Specializing Data
              Science, Machine learning and, Software Artificial Intelligence
            </p>
            <div className="flex mb-5 items-center justify-center gap-5">
              <AiFillGithub size={30} className="m-2" />
              <AiFillLinkedin size={30} className="m-2" />
              <AiOutlineTwitter size={30} className="m-2" />
              <FaDiscord size={30} className="m-2" />
              <AiFillFacebook size={30} className="m-2" />
              <AiOutlineInstagram size={30} className="m-2" />
            </div>
            <Link to="/About" className="btn btn-primary mt-9">
              Know More About me?{' '}
              <AiOutlineArrowRight className="m-2" size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {};

export default Home;
