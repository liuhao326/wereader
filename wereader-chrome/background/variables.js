var Config = {
    s1Pre: "",
    s1Suf: "",
    s2Pre: "**",
    s2Suf: "**",
    s3Pre: "",
    s3Suf: "",
    lev1: "## ",
    lev2: "### ",
    lev3: "#### ",
    thouPre: "```\n",
    thouSuf: "\n```",
    checkedRe: [],
    codePre: "```",
    codeSuf: "```",
    displayN: false,
    addThoughts: false,
    escape: false,
    backupName: "默认设置",
    re: []
}

var background_bookId = "null"
var background_tempbookId = "null"
var background_bookcontents = ""
var background_currentContent = ""
const background_storageErrorMsg = "存储出错"
const background_bookcontents_default = "getBookContents"
const background_backupKey = "backup"
//保存图片Markdown文本的数组
var imgsArr = []