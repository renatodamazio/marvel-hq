import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CollectionBar from './CollectionBar.js';
import Modal from './Modal.js';

function ComicList({match}) {
    const [hqs, setHqs] = useState([]);
    const [hero, setHero] = useState({});
    const [hqCollections, sethqCollections] = useState([]);

    const apiKey = '03d2714c30829e3a51677af5fb77fb8c';

    const getHqHeroData = () => {
        const characterId = match.params.characterId;

        axios.get(`https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?format=comic&apikey=${apiKey}`)
        .then(({data}) => setHqs(data.data.results))
        .catch((err) => console.log(err));
    };

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
                hero.id ? (
                    <Modal data={hero} setHero={setHero}/>
                ) : '' 
            }
            <form>
                <ul className="hq-list">
                    {
                        hqs.map((hq) => {
                            return (
                                hq.images.length ? (
                                    <li key={hq.id}>
                                    <div className="card">
                                        <div className="card-body" onClick={() => { setHero(hq) }}>
                                                { hq.title }
                                                <img src={`${hq.images[0].path}.${hq.images[0].extension}`}/>
                                            </div>
                                            <input type="checkbox" onChange={() => { handleInputChange() }} name="selected-hqs" value={JSON.stringify(hq)} />
                                        </div>  
                                    </li>
                                ) : ('')
                            )
                        })
                    }
                </ul>
                {
                    hqCollections.length ? (
                        <CollectionBar data={hqCollections}/>
                    ) : ''
                }
                    
            </form>
        </>
    );
}

export default ComicList;