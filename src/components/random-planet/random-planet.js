import {Component, Fragment} from 'react';
import React from "react";
import PropTypes from 'prop-types'
import './random-planet.css';
import SwapiService from '../../services/swapi-serves'
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

export default class RandomPlanet extends Component {

    static defaultProps = {
        updateInterval: 10000
    }

    static propTypes = {
        updateInterval: PropTypes.number
    }

    swapiService = new SwapiService()

    state = {
        planet: {},
        loading: true,
        error: false,
    }

    componentDidMount() {
        const {updateInterval} = this.props
        this.updatePlanet()
        this.interval = setInterval(this.updatePlanet, updateInterval)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    onPlanetLoaded = (planet) => {
        this.setState({planet, loading: false})
    }

    onError = (err) => {
        this.setState({error: true, loading: false})
    }

    updatePlanet = () => {
        const id = Math.floor(Math.random() * 16) + 2
        this.swapiService.getPlanet(id).then(this.onPlanetLoaded)
            .catch(this.onError)
    }

    render() {
        const {planet, loading, error} = this.state;
        const spinnerElem = (<div className='spinner-position-center'>
            <Spinner/>
        </div>)
        const hasData = !(loading || error)
        const spinner = loading && !error ? spinnerElem : null
        const content = hasData ? <PlanetView planet={planet}/> : null
        const errorMessage = error ? <ErrorIndicator/> : null

        return (
            <div className="random-planet jumbotron rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>

        );
    }
}

const PlanetView = ({planet}) => {
    const {
        id,
        name,
        population,
        rotationPeriod,
        diameter
    } = planet;
    return (
        <Fragment>
            <img alt='Appearance unknown' className="planet-image"
                 src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}/>
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </Fragment>
    )
}