/* 设置页 */

//"备份"按钮点击事件
function backup(){
    chrome.storage.local.get(null,function(settings){
        var container = document.getElementById("inputName")
        var aInput = document.getElementById("name")
        var submit = document.getElementById("submit")
        var cancle = document.getElementById("cancel")
        const key = "backup"
        //"确定"
        submit.onclick = function(){
            if(aInput.value == ""){
                aInput.placeholder = "请输入备份名..."
            }else if(settings[key][aInput.value] != undefined){
                aInput.value = ""
                aInput.placeholder = "重名，请重新输入..."
            }else{
                chrome.storage.sync.get(null, function(setting) {
                    settings[key][aInput.value] = setting
                    chrome.storage.local.set(settings,function(){
                        aInput.value = ""
                        container.style.display = "none"
                    })
                })
            }
        }
        //"取消"
        cancle.onclick = function(){
            container.style.display = "none"
        }
        container.style.display = "block"
    })
}

//更新已启用正则匹配
function updateCheckedRegexp(){
    var checkBoxCollection = document.getElementsByClassName("contextMenuEnabledInput")
    var checkedRegexp = {checkedRe:[]}
    for(var i = 0,len = checkBoxCollection.length;i < len;i++){
        if(checkBoxCollection[i].checked == true){
            let parent = checkBoxCollection[i].parentNode
            let id = checkBoxCollection[i].id
            let re = parent.getElementsByClassName("regexp")[0].value
            let pre = parent.getElementsByClassName("regexp_pre")[0].value
            let suf = parent.getElementsByClassName("regexp_suf")[0].value
            if(re != ""){
                checkedRegexp.checkedRe.push([id,re,pre,suf])
            }
        }
    }
    chrome.storage.sync.set(checkedRegexp,function(){

    })
}

//更新所有正则
function updateRegexp(){
    var regexpContainer = document.getElementsByClassName("regexp_container")
    var Regexp = {re:[]}
    for(var i = 0,len = regexpContainer.length;i < len;i++){
        let id = regexpContainer[i].getElementsByClassName("contextMenuEnabledInput")[0].id
        let re = regexpContainer[i].getElementsByClassName("regexp")[0].value
        let pre = regexpContainer[i].getElementsByClassName("regexp_pre")[0].value
        let suf = regexpContainer[i].getElementsByClassName("regexp_suf")[0].value
        Regexp.re.push([id,re,pre,suf])
    }
    chrome.storage.sync.set(Regexp,function(){
        
    })
}

//初始化
function initialize(){
    document.getElementById("backup").onclick = backup
    chrome.storage.sync.get(null, function(setting) {
        console.log("chrome.storage.sync.get(null,function(setting){\nconsole.log(setting)\n})")
        console.log(setting)
        //备份名初始化
        var val = "backupName"
        document.getElementById(val).textContent = "当前备份：" + setting[val]
        //"标注、标题、想法" 初始化
        var basicIds = ["s1Pre","s1Suf","s2Pre","s2Suf","s3Pre","s3Suf","lev1","lev2","lev3","thouPre","thouSuf"]
        for(var i=0,len=basicIds.length;i<len;i++){
            let basicId = basicIds[i]
            let elem = document.getElementById(basicId)
            elem.value = setting[basicId]
            elem.onchange = function(){
                let config = {}
                config[this.id] = this.value
                chrome.storage.sync.set(config,function(){
                    //前后缀更新完毕
                })
            }
        }
        //"是否显示热门标注人数"、"标注添加想法" 初始化
        var CheckBoxIds = ["displayN","addThoughts","escape"]
        for(var i=0,len=CheckBoxIds.length;i<len;i++){
            let CheckBoxId = CheckBoxIds[i]
            if(setting[CheckBoxId] == true){
                document.getElementById(CheckBoxId).checked = true
            }else{
                document.getElementById(CheckBoxId).checked = false
            }
            document.getElementById(CheckBoxId).onclick = function(){
                let config = {}
                config[this.id] = this.checked
                chrome.storage.sync.set(config,function(){
                    //前后缀更新完毕
                })
            }
        }
        //"代码块"初始化
        var preIds = ["codePre","codeSuf","preLang"]
        for(var i=0,len=preIds.length;i<len;i++){
            let preId = preIds[i]
            document.getElementById(preId).value = setting[preId]
            document.getElementById(preId).onchange = function(){
                let config = {}
                config[this.id] = this.value
                chrome.storage.sync.set(config,function(){
                    
                })
            }
        }
        /************************************************************************************/
        //正则匹配初始化
        var checkBoxCollection = document.getElementsByClassName("contextMenuEnabledInput")
        var checkedRe = setting.checkedRe
        //checkbox 初始化
        if(checkedRe.length >= 0 && checkedRe.length <= 5){
            for(var i = 0,len1 = checkBoxCollection.length;i < len1;i++){
                for(var j = 0,len2 = checkedRe.length;j < len2;j++){
                    if(checkedRe[j][0] == checkBoxCollection[i].id){
                        checkBoxCollection[i].checked = true
                        let parent = checkBoxCollection[i].parentNode
                        parent.getElementsByClassName("regexp")[0].value = checkedRe[j][1]
                        parent.getElementsByClassName("regexp_pre")[0].value = checkedRe[j][2]
                        parent.getElementsByClassName("regexp_suf")[0].value = checkedRe[j][3]
                    }
                }
            }
        }
        //正则表达式 checkbox 点击事件
        for(var i = 0,len = checkBoxCollection.length;i < len;i++){
            checkBoxCollection[i].onclick = function(){
                if(this.parentNode.getElementsByClassName("regexp")[0].value != ""){
                    updateCheckedRegexp()
                }
            }
        }
        //正则表达式 input、textarea 初始化
        var regexpContainer = document.getElementsByClassName("regexp_container")
        var reCollection = setting.re
        if(reCollection.length == 5){
            for(var i = 0,len = reCollection.length;i<len;i++){
                regexpContainer[i].getElementsByClassName("regexp")[0].value = reCollection[i][1]
                regexpContainer[i].getElementsByClassName("regexp_pre")[0].value = reCollection[i][2]
                regexpContainer[i].getElementsByClassName("regexp_suf")[0].value = reCollection[i][3]
            }
        }else{
            updateRegexp()
        }
        //正则表达式 input、textarea 改变
        for(var i = 0,len1 = regexpContainer.length;i < len1;i++){
            var classNameArr = ["regexp","regexp_pre","regexp_suf"]
            for(var j=0,len2=classNameArr.length;j<len2;j++){
                regexpContainer[i].getElementsByClassName(classNameArr[j])[0].onchange = function(){
                    updateRegexp()
                    updateCheckedRegexp()
                }
            }
        }
    });
}

//初始化设置页
initialize()