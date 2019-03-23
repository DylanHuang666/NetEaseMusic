$(function(){
    $.get('/lyric.json').then(function(object){
        let {lyric}=object
        let array=lyric.split('\n')
        let regex=/^\[(.+)\](.*)/
        array=array.map(function(string,index){
            let matches=string.match(regex)
            if(matches){
                return{time:matches[1],words:matches[2]}
            }           
        })
        let $lyric=$('.lyric')
        array.map(function(object){
            if(!object){return}
            let $p=$('<p/>')
            $p.attr('data-time',object.time).text(object.words)
            $p.appendTo($lyric.children('.lines'))
        })
    })
    let audio=document.createElement('audio') 
    audio.src='http://pnksng3qv.bkt.clouddn.com/%E9%99%88%E5%A5%95%E8%BF%85%20-%20%E5%8D%81%E5%B9%B4.mp3'
    audio.oncanplay=function(){
        audio.play()
        $('.disc-container').addClass('playing')
    }
    $('.icon-pause').on('click',function(){
        audio.pause()
        $('.disc-container').removeClass('playing')
    })
    $('.icon-play').on('click',function(){
        audio.play()
        $('.disc-container').addClass('playing')
    })    
})