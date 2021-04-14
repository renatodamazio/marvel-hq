import React from 'react';

function Modal({ data, setHero }) {
    console.log(data);
    return (
        <div className="ModalBg">
            <div className="modal-wrapper">
                <div className="modal-body">   

                    <div className="hq-cover" style={{backgroundImage: `url(${data.images[0].path}.${data.images[0].extension})`}}>
                    </div>
                </div>

                <div className="modal-info">
                <ul className="modal-info-list">
                    <li><span>Título:</span> {data.title}</li>
                    <li><span>Páginas:</span> {data.pageCount} </li>
                    {
                        data.characters.available > 0 ? (
                            <li className="character-list"> 
                                <span>Personagens:</span> <ol>{
                                    data.characters.items.map((character) => {
                                        return (
                                        <li id={character.name}>
                                            {character.name}
                                        </li>)
                                    })
                                }</ol>
                            </li>
                        ) : ''
                    }

                    <li>
                        <span>Preço:</span> {
                            data.characters.prices && data.characters.prices.length > 0 ? (
                                data.characters.prices
                            ) : 'Não revelado.'
                        }
                    </li>

                    {
                        data.creators.items.length > 0 ? (
                            <li> 
                                <span>Criadores:</span> <ol>{
                                    data.creators.items.map((creator) => {
                                        return (
                                        <div className="item" id={creator.name}>
                                            {creator.name}
                                        </div>)
                                    })
                                }</ol>
                            </li>
                        ) : ''
                    }
                </ul>

                <hr className="space-between"/>
                <button type="button"  onClick={() => { setHero({}) }}>Fechar modal</button>
            </div>
            </div>
        </div>
    );
}

export default Modal;