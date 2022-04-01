import Header from "../header";
import React, {Component} from "react";
import SwapiService from "../../services/swapi-serves";
import ErrorBoundary from "../error-boundary";
import RandomPlanet from "../random-planet";
import './app.css';
import {SwapiServiceProvider} from "../swapi-service-context";
import {
    PeoplePage,
    PlanetPage,
    StarshipPage,
    SecretPage,
    LoginPage
} from "../pages";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {StarshipDetails} from "../sw-components";

export default class App extends Component {
    state = {
        swapiService: new SwapiService(),
        isLoggedIn: false
    }

    onLogin = () => {
        this.setState({
            isLoggedIn: true
        })
    }

    render() {

        const {isLoggedIn} = this.state

        return (
            <ErrorBoundary>
                <SwapiServiceProvider
                    value={this.state.swapiService}>
                    <Router>
                        <div className='stardb-app'>
                            <Header/>
                            <RandomPlanet/>
                            <Switch>
                                <Route path="/"
                                       render={() => <h2>Welcome to StarDB</h2>}
                                       exact/>

                                <Route path="/people/:id?"
                                       component={PeoplePage}/>

                                <Route path="/planets" component={PlanetPage}/>

                                <Route path="/starships"
                                       exact
                                       component={StarshipPage}/>
                                <Route path="/starships/:id"
                                       render={({match}) => {
                                           const {id} = match.params
                                           return <StarshipDetails itemId={id}/>
                                       }
                                       }/>
                                <Route path="/login"
                                       render={() => (
                                           <LoginPage isLoggedIn={isLoggedIn}
                                                      onLogin={this.onLogin}/>)}/>
                                <Route path="/secret"
                                       render={() => (
                                           <SecretPage
                                               isLoggedIn={isLoggedIn}/>)}/>
                                <Route render={() => <h2>Page not found</h2>}/>
                            </Switch>
                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundary>
        );
    }
};
