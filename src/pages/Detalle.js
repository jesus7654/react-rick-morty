import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {Button} from '@material-ui/core';




const URL_API="https://rickandmortyapi.com/api/";

export class Detalle extends Component{
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.object,
            isExact: PropTypes.bool,
            path: PropTypes.string,
            url: PropTypes.string
        })
    }

    state ={
        detail:{}
    }

    _fetchDetalle(){
        const {id,tipo} =this.props.match.params;
        fetch(`${URL_API}/${tipo}/${id}`)
        .then(result => result.json())
        .then(detalle =>{
            this.setState({detail:detalle});
        })
    }

    _showPersonaje(){
        const {detail} = this.state;
        return (
            <div>
                <hr />
                <img src={detail.image} alt={detail.name}></img>
                <h2>{detail.name}</h2>
                <hr />
                <p><strong>Especie:</strong><span>{detail.species}</span></p>
                <p><strong>Genero:</strong><span>{detail.gender}</span></p>
                <p><strong>Estatus</strong><span>{detail.status}</span></p>
                <hr />
                <Link to="/" className="link">
                    <Button variant="contained" color="primary">Volvera la Portada</Button>
                </Link>

            </div>
            )
    }

    _showEpisodio(){
        const {detail} = this.state;

        return (
            <div>
                <hr />
                    <h2>{detail.name}</h2>
                <hr />
                    <p><strong>Fecha de lanzamiento:</strong> <span>{detail.air_date}</span></p>
                    <p><strong>Episodio:</strong> <span>{detail.episode}</span></p>
                <hr />
                    <Link to="/" className="link">
                        <Button variant="contained" color="primary">Volvera la Portada</Button>
                    </Link>
            </div>
        )
    }

    componentDidMount(){
        this._fetchDetalle();
    }

    
    render(){
        const {tipo} =this.props.match.params;

        return(
            <div >
               { tipo==="episode" ? this._showEpisodio() : this._showPersonaje()}
            </div>
        );
    }
}