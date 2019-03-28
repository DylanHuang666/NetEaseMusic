$(function(){
    $.get('./page2.json').then((response)=>{
        let items=response
        items.forEach((i)=>{
            let $li=$(`
            <li>
                <a href="./song.html?id=${i.id}">
                    <div class="number" id="number${i.number}">0${i.number}</div>
                    <div>
                        <h3>${i.name}</h3>
                        <p>
                            <svg class="icon-sq" aria-hidden="true">
                                <use xlink:href="#icon-sq"></use>
                            </svg>
                            ${i.singer} - ${i.name}
                        </p>              
                        <svg class="icon-play-circled" aria-hidden="true">
                            <use xlink:href="#icon-play-circled"></use>
                        </svg> 
                    </div>                                  
                </a>               
            </li>
            `)
            $('.songList>ol').append($li)
        })
    })
})
