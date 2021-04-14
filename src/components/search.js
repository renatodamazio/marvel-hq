import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { DebounceInput } from 'react-debounce-input';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import axios from 'axios';

function Search() {    
    const [characters, setCharacters] = useState(undefined);

    const apiKey = '03d2714c30829e3a51677af5fb77fb8c';

    const searchByCharacter = (query) => {
        axios.get(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${query}&apikey=${apiKey}`)
        .then(({data}) => setCharacters(data.data.results))
        .catch((err) => console.error(err))
    }

    return (
        <section>
            <DebounceInput
                autoFocus={true}
                minLength={2}
                debounceTimeout={600}
                onChange={(e) => searchByCharacter(e.target.value)}
            />
            <button>Buscar!</button>

            {
                characters ? (
                    characters.map((character) => {
                        return (
                            <li key={character.id}>
                                <Link to={`/hq/${character.id}`}>
                                    <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} width="50px" height="50px" />
                                    { character.name}
                                </Link>
                            </li>
                        )
                    })
                ) : ""
            }
        </section>
    );
}

export default Search;