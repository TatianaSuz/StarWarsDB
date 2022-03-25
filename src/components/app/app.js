import './app.css'
import Header from "../header";
import RandomPlanet from '../random-planet';

import './app.css';
import {Component} from "react";
import ErrorIndicator from "../error-indicator";
import PeoplePage from "../people-page/people-page";

export default class App extends Component {
    state = {
        hasError: false
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ hasError: true})
    }

    render(){

        if(this.state.hasError){
            return <ErrorIndicator/>
        }

        return (
            <div className='tablet'>
                <Header />
                <RandomPlanet />
                <PeoplePage/>
            </div>
        );
    }

};


//onItemSelected(id)