/* 用于测试 */
function getTest(){

	let logMarksJson = async function(){
		const url = `https://i.weread.qq.com/book/bookmarklist?bookId=${bookId}`;
		let data = await getJson(url);
		console.log(data);
	}

	let logStorage = function(area="sync"){
		if(["sync","local"].indexOf(area) < 0) return console.log("请传入sync或local");
		chrome.storage[area].get(function(setting){
			console.log('setting', setting);
		})
	}

	let logConfig = function (){console.log(Config);}

	let logChapterInfo = async ()=>{
		const chapterInfos = `https://i.weread.qq.com/book/chapterInfos?bookIds=${bookId}&synckeys=0`
		let chapInfo = await getJson(chapterInfos);
		console.log(chapInfo);
	}

	let logContents = async ()=>{
		const contents = await getChapters();
		console.log(contents);
	}

	let logGetBookMarks = async ()=>{
		const chapsAndMarks = await getBookMarks();
		console.log(chapsAndMarks);
	}

	let trigMarkedDatajs = async ()=>{
		sendMessageToContentScript({message: {isGetMarkedData: true}});
	}

	let logBestBookMarks = async ()=>{
		const bestbookmarks = await getBestBookMarks();
		console.log(bestbookmarks);
	}

	let logGetChapters = async ()=>{
		const chapters = await getChapters();
		console.log(chapters);
	}

	let logChapInServer = async ()=>{
		const url = `https://i.weread.qq.com/book/chapterInfos?bookIds=${bookId}&synckeys=0`;
		const chapInfos = await getJson(url);
		console.log(chapInfos);
	}

	let logShelfData = async ()=>{
		console.log(await getShelfData());
	}

	let logShelfHtml = async ()=>{
		text = await getShelfHtml();
		console.log(text);
	}

	let logReadDetail = async ()=>{
		console.log(await getReadDetail());
		// console.log(await getReadDetail(1, 3, 1609430400));
		console.log(await getReadDetail(0));
	}

	let functions = {
		'logBookMarksJson': logMarksJson,
		'logStorage': logStorage,
		'logConfig': logConfig,
		'logChapterInfo': logChapterInfo,
		'logContents': logContents,
		'logGetBookMarks': logGetBookMarks,
		'trigMarkedDatajs': trigMarkedDatajs,
		'logBestBookMarks': logBestBookMarks,
		'logGetChapters': logGetChapters,
		'logChapInServer': logChapInServer,
		'logShelfData': logShelfData,
		'logShelfHtml': logShelfHtml,
		'logReadDetail': logReadDetail
	}

	return functions;
}