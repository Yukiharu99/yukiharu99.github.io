function requestJSON(jsonFilename,callback) {
    if (window.XMLHttpRequest) {
        // browsers modernos
        var request = new XMLHttpRequest();
    } else {
        // ie browser
        var request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.overrideMimeType("application/json");
    // Synchronously GET request
    request.open("GET", jsonFilename, true);
    request.onreadystatechange = function() {
        if (request.readyState == 4 && this.status == 200) {
            callback(request.responseText)
        }
    }
    request.send(null);
}

function startIntersectionObserver() {
    let test = document.getElementById('shipSelectorIconArea');
    let ioCallback = function(entries) {
        entries.forEach(entry => {
            console.log(entry);
            // Defina a src da imagem apenas quando estiver sendo visualizada
            if (entry.isIntersecting) {
                console.log(entry);
                let image = entry.target;
                // Definir a src da imagem a partir do dataset
                image.src = image.dataset.src;

                // Remover a imagem da lista de elementos observados, quando for carregada
                window.observer.unobserve(image);
            }
        });
    }
    window.observer = new IntersectionObserver(ioCallback);
    document.querySelectorAll('#shipSelectorIconArea img').forEach(element => {
        window.observer.observe(element);
    })
}    

function viewAllShipsSelector() {
    if (typeof window.JSONcontent == 'undefined') {
        requestJSON("./json/shipgirlIconDirs.json", function (response) {
            window.JSONcontent = JSON.parse(response);
            let area = document.getElementById('shipSelectorIconArea');
            if (area.childElementCount != window.JSONcontent.lenght) {
                populateAllShipsView(area, window.JSONcontent);
            }
        });
    }
    document.getElementsByClassName('modal')[0].style.visibility = 'visible';
}

function populateAllShipsView(parentElement, shipsDataset) {
    while(parentElement.childElementCount != 0) {
        parentElement.removeChild(parentElement.firstChild); 
    }

    shipsDataset.forEach(ship => {
        let div = document.createElement('div');
        div.className = 'shipSelectorIcon';
        let img = document.createElement('img');
        img.dataset.src = ship.dir;
        img.src = './img/shipgirlIcon/AyanamiIcon.png';
        let shipname = document.createElement('p');
        shipname.appendChild(document.createTextNode(ship.shipname))
        div.appendChild(img);
        div.appendChild(shipname);
        parentElement.appendChild(div);
    });

    startIntersectionObserver();
}

function hideModal() {
    let modal = document.getElementsByClassName('modal');
    modal[0].style.visibility = 'hidden';
}