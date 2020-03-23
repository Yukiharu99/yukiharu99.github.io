function loadJSON(callback) {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', './json/chapters.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    }
    xobj.send(null);

}

function attChapterSelect(capAtual) {
    let selectElem = document.getElementById('chapter_selector');
    if (jsonData != "") {
        console.log("sucess!");
        // Preencher o dropbox
        for(element of jsonData) {
            console.log(element.chapterNumber)
            let item = document.createElement('OPTION');
            item.value = item.text = element.chapterNumber
            selectElem.appendChild(item);
        }
        // Carregar capitulo atual
        attPageSelect(capAtual);
    } else {
        console.log("fail");
    }
}

function changeImg(pageURL) {
    console.log(pageURL);
    let img = document.getElementById('page_img');
    img.src = pageURL;
}

function attPageSelect(capAtual) {
    let selectElem = document.getElementById('page_selector');
    // Removendo os elementos filhos
    while (selectElem.hasChildNodes()) {
        selectElem.removeChild(selectElem.firstChild);
    }
    // Preencher a lista de páginas
    if (jsonData != "") {
        let capAtualObj;
        for(element of jsonData) {
            if (element.chapterNumber == capAtual) {
                capAtualObj = element;
                break;
            }
        }
        if (capAtualObj == undefined) {
            console.log("fail: chapter not found!");
            return;
        } else {
            console.log("loading chapter "+ capAtual +"!");
            let aux = 1;
            for(element of capAtualObj.imgName) {
                let item = document.createElement('OPTION');
                item.value = capAtualObj.chapterDir + element;
                item.text = aux;
                aux++;
                selectElem.appendChild(item);
            }
            changeImg(capAtualObj.chapterDir + capAtualObj.imgName[0]);
        }
    } else {
        console.log("fail");
    }
}

function loadWindows() {
    loadJSON(function(response) {
        jsonresponse = JSON.parse(response);
        console.log(jsonresponse);
        window.jsonData = jsonresponse;
        attChapterSelect(1);
    })
}

window.onload = loadWindows;