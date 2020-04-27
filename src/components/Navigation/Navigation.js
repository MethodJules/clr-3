import './Navigation.css';
import { Link } from 'react-router-dom';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import React from 'react';
const Navigation = () => {



    return(
      <div>
         <Router>
                    <Link id="seitenNav" to="/scope">Scope</Link>
                    <Link id="seitenNav" to="/concept">Concept</Link>
                    <Link id="seitenNav" to="/search">Search</Link>
                    <Link id="seitenNav" to="/analysis">Analysis</Link>
                    <Link id="seitenNav" to="/agenda">Agenda</Link>
                    <Switch>
                        <Route path="/conceptgenerator">
                        </Route>
                        <Route path="/mapgenerator">
                        </Route>
                        <Route path="/conceptview">
                        </Route>
                        <Route path="/overview">
                        </Route>
                        <Route path="">

                        </Route>
                   </Switch>

                </Router>

      </div>
    );
  }

export default Navigation;