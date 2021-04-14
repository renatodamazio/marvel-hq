import React from 'react';

function CollectionBar({data, setHero}) {
    const sendEmailToAFriend = () => {
        let body = '';
        let characters = '';

        data.map((hq) => {
            hq.characters.items.map((character) => { characters += character.name + ', ' })
                 
            body += ` 
                Título: ${hq.title} \n
                Detalhes: \n
                    Série: ${hq.series ? hq.series.name : '--'} \n
                    Páginas: ${hq.pageCount} \n
                    Personagens: ${characters.length > 0 ? characters : '--'}
                \n
                ------------------------------------------------------------------------------------
            `;
            
            characters = ''
        });

        var link = "mailto:me@example.com"
            + "?cc=myCCaddress@example.com"
            + "&subject=" + encodeURIComponent("Olha que legal essas HQ's que eu selecionei para você!")
            + "&body=" + encodeURIComponent(body)
          ;
      
          window.open(link, '_blank');
    };

    return (
        <footer className="footer">
            <div className="selected-hd-info">
                {data.length} {data.length > 1 ? "HQ's selecionadas" : "HQ selecionada"}
                <ol className="selected-hq-list">
                    {
                        data.map((hq) => {
                            return (
                                <li className="selected-hq" onClick={() => { setHero(hq) }}>
                                    <img width="40px" height="40px" src={`${hq.images[0].path}.${hq.images[0].extension}`}/>
                                </li>
                            )
                        })
                    }
                </ol>
            </div>
            <div className="selected-hd-action">
                <button onClick={() => { sendEmailToAFriend() }} type="button">Enviar para um amigo(a)</button>
            </div>
        </footer>
    );
}

export default CollectionBar;