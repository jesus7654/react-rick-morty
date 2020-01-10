import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import Grid from '@material-ui/core/Grid';

const URL_API="https://rickandmortyapi.com/api/";


export class CardList extends Component{

    state={
        result:[]
    }
    _fetchEpisode(tipo){
        fetch(`${URL_API}${tipo}/`)
            .then(res => res.json())
            .then(result=>{
                this.setState({result:result});
            })
    }
    
    componentDidMount(){
        const {tipo} = this.props;
        this._fetchEpisode(tipo);
    }
    
     render()
    {
        const {tipo} = this.props;

        const {result} = this.state;
        return(
            <Grid container className="cards" spacing={2}>
                <Grid container  spacing={2}>
                {
                    result.length === 0  ?
                    "" 
                    : 
                    result.results.map(value=>(
                        <Link to={`/detalle/${value.id}/${tipo}`} key={value.id}  className="cardWrap">
                            {value.image ? <img src={value.image} alt={value.name} /> : ""}
                            <h2>{value.name}</h2>
                        </Link>
                        ))

                }
                </Grid>
            </Grid>
        );
    }
}