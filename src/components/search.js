import React, { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import Loading from './Loading';
import axios from 'axios';

function Search() {    
    const [characters, setCharacters] = useState(undefined);
    const [characterName, setcharacterName] = useState('');
    const [isLoading, setisLoading] = useState(false);

    const apiKey = process.env.REACT_APP_MARVEL_API;

    const searchByCharacter = (query) => {
        setisLoading(true);
        setTimeout(() => {
            setcharacterName(query);
            axios.get(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${query}&apikey=${apiKey}`)
            .then(({data}) => setCharacters(data.data.results), setisLoading(false))
            .catch((err) => console.error(err))
        }, 600);
    }

    return (
        <section className="group-search">
            <DebounceInput
                autoFocus={true}
                placeholder="Qual o seu super-heroi preferido ?"
                minLength={2}
                debounceTimeout={600}
                onChange={(e) => searchByCharacter(e.target.value)}
            />
            <ul className="group-result-search">
                {
                    isLoading ? (<li className="loading-wrapper"><Loading/></li>) : ''
                }    
                {
                    characters ? (<li className="group-result-search-item">Encontrados: {characters.length}</li>) : ''
                }   
                {
                    characters ? (
                        characters.map((character) => {
                            return (
                                <li key={character.id} className="group-result-search-item">
                                    <Link to={`/hq/${character.id}/${characterName}`} onClick={() => { setCharacters(undefined) }}>
                                        <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} width="50px" height="50px" />
                                        { character.name}
                                    </Link>
                                </li>
                            )
                        })
                    ) : ""
                }
            </ul>
        </section>
    );
}

export default Search;