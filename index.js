$(function(){
    $.get('./songs.json').then(function(response){
        let items=response
        items.forEach((i)=>{
            let $li=$(`
            <li>
                <a href="./song.html?id=${i.id}">
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
                </a>               
            </li>
            `)
            $('#lastestMusic').append($li)
        })
        $('#lastestMusicLoading').remove()
    })
})

$('.siteNav').on('click','ol.tabItems>li',function(e){
    let $li=$(e.currentTarget).addClass('active')
    $li.siblings().removeClass('active')
    let index=$li.index()
    $li.trigger('tabChange',index)
    $('.tabContent>li').eq(index).addClass('active').siblings().removeClass('active')
})

$('.siteNav').on('tabChange',function(e,index){
    let $li=$('.tabContent>li').eq(index)
    if($li.attr('data-downloaded')==='yes'){
        return
    }
    if(index===1){     
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
                $('.popularMusic').append($li)
            })
            $li.attr('data-downloaded','yes')
        })
    }else if(index===2){
        $.get('./page3.json').then((response)=>{
            
            $li.attr('data-downloaded','yes')
        })
    }
})





