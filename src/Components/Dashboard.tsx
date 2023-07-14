import React, { useState, useEffect, useContext } from 'react';

import { ListContext } from '../Context/ListContext'
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom'
import { Card, Row, Col, Button, Modal } from 'react-bootstrap';
import List from './List'
import { AuthContext } from '../Context/AuthContext';
function Dashboard() {
  const { state } = useContext(ListContext);
  const { logout } = useContext(AuthContext);
  var user = JSON.parse(localStorage.getItem("token") || '[]')

  return (
    <main>
      <div className='verification text-center'>
        <p> You have not verified your email address. <Link to={""}>Click</Link> here to resend verification link.</p>
      </div>
      <div className='header'>
        <div>
          <p>Dashboard</p>
        </div>

        <div className='user'>
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle logout-btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              {user.firstname} {user.lastname}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a className="dropdown-item" onClick={logout}>Log Out</a></li>

            </ul>
          </div>

        </div>
      </div>
      <div className="container">
        <List data={state} />

      </div>


    </main>


  );
}

export default Dashboard;
