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


//假的搜索歌曲后台
let timer=undefined
$('input#searchSong').on('input',function(e){
    let $input=$(e.currentTarget)
    let value=$input.val().trim()
    if(value===''){return}
    if(timer){
        clearTimeout(timer)
    }
    timer=setTimeout(function(){
        search(value).then((result)=>{
            timer=undefined
            if(result.length!==0){
                $('#output').removeClass('active')
                $('#output').text(result.map((r)=>r.name).join(','))
                $('#output').on('click',function(e){
                    $('#output').addClass('active')
                    let r=result[0]
                    let $li=$(`
                    <li>
                        <a href="./song.html?id=${r.id}">
                            <h3>${r.name}</h3>
                            <p>
                                <svg class="icon-sq" aria-hidden="true">
                                    <use xlink:href="#icon-sq"></use>
                                </svg>
                                ${r.singer} - ${r.name}
                            </p>              
                            <svg class="icon-play-circled" aria-hidden="true">
                                <use xlink:href="#icon-play-circled"></use>
                            </svg>              
                        </a>               
                    </li>
                    `)
                    $('#searchSongList').append($li)
                    $li.siblings().remove()
                })                                    
            }else{
                $('#output').text('没有结果')
            }          
        })
    },300)  
})

function search(keyword){
    return new Promise((resolve,reject)=>{
        var database=[
            {"id":1,"name":"别让我走远","singer":"林宥嘉"},
            {"id":2,"name":"蜂鸟","singer":"吴青峰"},
            {"id":3,"name":"只要有想见的人，就不是孤身一人","singer":"王源"}
        ]
        let result=database.filter(function(item){
            return item.name.indexOf(keyword)>=0
        })
        setTimeout(function(){
            resolve(result)
        },(Math.random()*1000+100))
    })
}

window.search=search