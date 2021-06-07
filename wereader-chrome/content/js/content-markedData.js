/*用于获取被标注的图片的 Markdown 文本数组，用于支持导出被标注的图片*/
//将所有图片、脚注、代码块放到一个数组中
function getElObj(){
    let targetEls = 
        document.querySelectorAll(".wr_readerImage_opacity,.reader_footer_note.js_readerFooterNote.wr_absolute,pre");
    let elObjArr = [], currentContent = '';
    //获取当前目录
    if(document.getElementsByClassName("readerTopBar_title_chapter")[0]){
        currentContent = document.getElementsByClassName("readerTopBar_title_chapter")[0].textContent;
    }else{
        currentContent = document.getElementsByClassName("chapterItem chapterItem_current")[0].childNodes[0].childNodes[0].textContent;
    }
    currentContent = currentContent.replace(/^\s*|\s*$/,'');
    //处理图片和注释
    targetEls.forEach(el=>{
        let imgSrc = el.getAttribute("data-src");
        let footnote = el.getAttribute("data-wr-footernote");
        let height = parseFloat(el.style.height.replace('px', ''));
        let top = parseFloat(el.style.top.replace('px', ''));
        if(imgSrc){
            //判断是否为行内图片
            let isInlineImg = el.className.indexOf('h-pic') > -1;
            let alt = imgSrc.split("/").pop();
            elObjArr.push({alt: alt, imgSrc: imgSrc, height: height, top: top, isInlineImg: isInlineImg});
        }else if(footnote){
            elObjArr.push({currentContent: currentContent, footnote: footnote, height: height, top: top});
        }else{//代码块
            let code = el.textContent;
            let padding = parseFloat(window.getComputedStyle(el).paddingTop.replace('px', '')) + 
                parseFloat(window.getComputedStyle(el).paddingBottom.replace('px', ''));
            height = height + padding;
            elObjArr.push({height: height, top: top, code: code});
        }
    });
    return elObjArr;
}

//获取图片和注释
function getMarkedData(addThoughts){
    const elObjArr = getElObj();
    //获取三种标注 Element
    let selector = '.wr_underline.s0,.wr_underline.s1,.wr_underline.s2';
    //获取想法标注 Element
    if(addThoughts) selector = `${selector},.wr_myNote`;
    const markMasks = document.querySelectorAll(selector);
    
    let markedData = [], notesCounter = 1;
    //遍历 objArr 并逐个检查是否被标注
    elObjArr.forEach(obj=>{
        let {imgSrc,alt,isInlineImg,footnote,currentContent,code,height,top} = obj;
        //根据标注元素与图片/注释在网页中的相对位置来判断图片/注释是否被标注
        for (let i = 0; i < markMasks.length; i++) {
            const mask = markMasks[i];
            let maskTop = parseFloat(mask.style.top.replace('px', ''));
            let maskHeight = parseFloat(mask.style.height.replace('px', ''));
            // 脚注需要另外判断是否被标注
            if(!footnote && Math.abs(top + height - maskTop - maskHeight)>0.1) continue;
            if(footnote && (top < maskTop || (maskTop + maskHeight) < (top + height))) continue;
            if(imgSrc){
                markedData.push({alt: alt, src: imgSrc, isInlineImg: isInlineImg})
            }else if(footnote){
                markedData.push({name: `${currentContent} 注${notesCounter++}`, footnote: footnote})
            }else if(code){
                markedData.push({code: code})
            }
            break;
        }
    });
    return markedData;
}

// console.log("content-markedData.js：被注入")
chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
    if(!request.isGetMarkedData) return;
    const markedData = getMarkedData(request.addThoughts);
    sendResponse(markedData);
});