import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {CardList} from '../component/cardList';

import SearchIcon from '@material-ui/icons/Search';
import { Container } from '@material-ui/core';

import {InputBase,IconButton,Grid} from '@material-ui/core';

const URL_API="https://rickandmortyapi.com/api/";

export class Home extends Component{

    state ={
        search:'',
        Resultado:[]
    }


    _handlerChange=(e)=>{
    this.setState({search:e.target.value});
    }
    
    _submitForm = (e) =>{
       e.preventDefault();
       fetch(`${URL_API}/character/?name=${this.state.search}`)
         .then(res => res.json())
         .then(result=>{
            this.setState({Resultado:result.results})
         })
    }
    
    _cards=()=>{
    
       return (
         <div>
    
           <hr />
           <h2>Episodios</h2>
           <CardList tipo="episode" />
           <br />
           <hr />
           <h2>Personajes</h2>
           <CardList tipo="character" />
         </div>
       )
    }
    _cardsResult=()=>{
       return(
         <Grid container className="cards" spacing={2}>
               <Grid container  spacing={2}>
                 {
                    this.state.Resultado.map(value => (
                     <Link to={`/detalle/${value.id}/character`} key={value.id} className="cardWrap">
                       <img src={value.image} alt={value.name}/>
                       <h2>{value.name}</h2>
                       <p>Episodios: <span>{value.episode.length}</span></p>
                     </Link>
                   ))
                 }
               </Grid>
         </Grid>
       )
    }
    render(){
        return(
            <Container className="App">
            <h1  > Rick & Morty </h1>
            <form onSubmit={this._submitForm} className="root">
                <InputBase
                className="input"
                placeholder=  "Buscar..."
                inputProps={{ 'aria-label': 'Buscador' }}
                onChange={this._handlerChange}
                />
                <IconButton type="submit" className="iconButton" aria-label="search">
                <SearchIcon />
                </IconButton>
            </form>
            <div className="containerCard">
                    {
                        this.state.Resultado.length===0 ?
                        this._cards()
                        :
                        this._cardsResult()
                    }
                
            </div>
            </Container>
        );
    }
}