import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CollectionBar from './CollectionBar.js';
import Loading from './Loading.js';
import NoResults from './NoResults.js';
import Modal from './Modal.js';

function ComicList({match}) {
    const [hqs, setHqs] = useState(undefined);
    const [isLoading, setisLoading] = useState(true);
    const [hero, setHero] = useState({});
    const [heroName, setheroName] = useState('');
    const [hqCollections, sethqCollections] = useState([]);

    const apiKey = process.env.REACT_APP_MARVEL_API;

    const getHqHeroData = () => {
        const characterId = match.params.characterId;
        setisLoading(true);

        axios.get(`https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?format=comic&apikey=${apiKey}`)
        .then(({data}) => setHqs(data.data.results), setisLoading(false))
        .catch((err) => console.log(err));
    };

    useEffect(() => { setheroName(match.params.characterName) }, []);
    useEffect(() => { getHqHeroData() }, []);
    useEffect(() => { getHqHeroData() }, [match]);
    useEffect(() => console.log(hero), [hero]);


    const handleInputChange = (e) => {
        const fields = document.querySelectorAll('input[name="selected-hqs"]');

        const items = [].filter.call(fields, (field) => {
            return field.checked;
        }).map((item) => {
            return JSON.parse(item.value)
        })

        sethqCollections(items);
    }

    return (
        <>  
            {
                isLoading ? (<li className="loading-wrapper"><Loading/></li>) : ''
            }
            {
                hero.id ? (
                    <Modal data={hero} setHero={setHero}/>
                ) : '' 
            }
            <main className="main">
                <section>
                    <h3>Resultados da busca "{heroName}"</h3>
                </section>
                {
                    hqs && hqs.length === 0 ? (
                        <section>
                            <div className="no-results">
                                <NoResults/>
                            </div>
                        </section>
                    ) : (
                    <section>
                        <ul className="hq-list">
                            {
                                hqs ? (
                                    hqs.map((hq) => {
                                        return (
                                            hq.images.length ? (
                                                <li key={hq.id}>
                                                    <div className="card">
                                                        <div className="card-body" onClick={() => { setHero(hq) }}>
                                                            <b className="card-title">{ hq.title }</b>
                                                            <img src={`${hq.images[0].path}.${hq.images[0].extension}`}/>
                                                        </div>
                                                        <label for={hq.id} className="hq-like">
                                                            <input type="checkbox" id={hq.id} onChange={() => { handleInputChange() }} name="selected-hqs" value={JSON.stringify(hq)} />
                                                            <span className="custom-check">Curti esta HQ</span>
                                                        </label>
                                                    </div>  
                                                </li>
                                            ) : ('')
                                        )
                                    })
                                ) : ''
                            }
                        </ul>
                    </section>
                    )
                }
        
                {
                    hqCollections.length ? (
                        <CollectionBar setHero={setHero} data={hqCollections}/>
                    ) : ''
                } 
            </main>
        </>
    );
}

export default ComicList;