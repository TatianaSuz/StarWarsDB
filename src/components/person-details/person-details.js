import { Component } from 'react';
import './person-details.css';
import SwapiService from "../../services/swapi-serves";

export default class PersonDetails extends Component {
    swapiService = new SwapiService()

    state = {
        person: null,
    }

    componentDidMount() {
        this.updatePerson()
    }

    componentDidUpdate(prevProps){
        if(this.props.personId !== prevProps.personId){
            this.updatePerson()
        }
    }

    updatePerson () {
        const {personId} = this.props
        if(!personId){
            return
        }
        this.swapiService.getPerson(personId)
            .then((person) => {this.setState({person})})
    }

    render() {

        const {person} = this.state

        if (!person){
            return <span>Select a person from list</span>
        }

        const {id, name, gender, birthYear, eyeColor} = this.state.person

        return (
            <div className="person-details card">
                <img alt='character' className="person-image"
                     src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

                <div className="card-body">
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Gender</span>
                            <span>{gender}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Birth Year</span>
                            <span>{birthYear}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Eye Color</span>
                            <span>{eyeColor}</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}