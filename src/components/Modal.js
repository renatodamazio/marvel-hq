import React from 'react';

function Modal({ data, setHero }) {
    return (
        <div className="ModalBg"  onClick={() => { setHero({}) }}>
            <a href="#!" title="Fechar modal" onClick={() => { setHero({}) }}>Fechar</a>
            <img src={`${data.images[0].path}.${data.images[0].extension}`}/>
            <div>
                Título: {data.title} <br/>
                Páginas: {data.pageCount} <br/>
                {
                    data.characters.available > 0 ? (
                       <div> 
                            Personagens: <ol>{
                                data.characters.items.map((character) => {
                                    return (
                                    <li id={character.name}>
                                        {character.name}
                                    </li>)
                                })
                            }</ol>
                        </div>
                    ) : ''
                }

                Preço: {
                    data.characters.prices && data.characters.prices.length > 0 ? (
                        data.characters.prices
                    ) : 'Não revelado.'
                }
            </div>
        </div>
    );
}

export default Modal;