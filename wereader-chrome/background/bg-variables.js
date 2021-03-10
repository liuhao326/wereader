var bookId = undefined;
var bookIds = {};
const DefaultBackupName = "默认设置"
const StorageErrorMsg = "存储出错"
const BackupKey = "backup";
let shelfForPopup = {shelfData: undefined, shelfHtml: undefined};
//保存图片Markdown文本的数组
var markedData = []
//用于记录 popup 是否请求复制目录
var isCopyContent = false
const DefaultRegexPattern = {replacePattern:'',checked:false}

//用于检查格式并保存当前配置
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
    thouPre: "==",
    thouSuf: "==",
    thouMarkPre: "> ",
    thouMarkSuf: "",
    codePre: "```",
    codeSuf: "```",
    displayN: false,
    allTitles: false,
    addThoughts: false,
    enableRightClick: true,
    enableDevelop: false,
    backupName: DefaultBackupName,
    selectAction: "underlinNone",
    //如果不设置默认值，则在设置页初始化时需要考虑到 
    re: {re1:DefaultRegexPattern,re2:DefaultRegexPattern,re3:DefaultRegexPattern,re4:DefaultRegexPattern,re5:DefaultRegexPattern},
    flag: 0
}