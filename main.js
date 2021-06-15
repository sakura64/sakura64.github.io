var currentPage;
var limeyjs = {
    load: function (p) {
        var x = localStorage.getItem('lang');
        console.log(x);
        if (p.includes('-jp')) {
            p = p.replace('-jp', '');
            console.log(p);
        }
        if (x !== 'en') {
            p += '-jp';
            console.log('adding jp');
        }
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (p.includes('home')) {
                    history.pushState(null, '', '/');
                } else {
                    history.pushState(null, '', `#${p}`);
                }
                document.querySelector('.render').innerHTML = xhttp.response;
                currentPage = p;
            } else {
                var x = '';
                x = xhttp.status.toString();
                if (x.indexOf('4') !== -1 || x.indexOf('5') !== -1) {
                    console.error(true, "Error " + xhttp.status + ' (' + xhttp.statusText + ') while loading ' + p);
                }
            }
        };

        xhttp.open("GET", `/pages/${p}.html`, true);
        xhttp.send();
    }
};

var setlang = (lg) => {
    localStorage.setItem('lang', lg);
    limeyjs.load(currentPage);
    // if (currentPage.includes('-jp')) {
    //     console.log("page includes jp");
    //     currentPage.replace('-jp', '');
    // }
    // limeyjs.load(currentPage);
    // switch (lg) {
    //     case 'en':
    //         console.log('us');
    //         if (currentPage.includes('-jp')) {
    //             console.log('replacing -jp');
    //             limeyjs.load(currentPage.replace('-jp', ''));
    //         } else {
    //             console.log('loading normal page');
    //             limeyjs.load(currentPage);
    //         }
    //         break;
    //     case 'jp':
    //         console.log('jp');
    //         if (currentPage.includes('-jp')) {
    //             console.log('loading normal page');
    //             limeyjs.load(currentPage);
    //         } else {
    //             console.log('adding jp');
    //             limeyjs.load(currentPage + '-jp');
    //         }
    //         break;
    //     default:
    //         break;
    // }
}

// remove href so ajax is possible
setTimeout(function () {
    var items = document.querySelectorAll("li a[page]");
    for (let i = 0; i < items.length; i++) {
        //if (items[i].href.indexOf('#') == -1) {
        // items[i].setAttribute('page', items[i].href);
        // items[i].removeAttribute("href");
        items[i].addEventListener("click", function () { limeyjs.load(this.getAttribute('page')) }); //limeyjs.load(items[i].page)
        //}
    }
    document.querySelector('div.main').style.visibility = 'visible';
    document.querySelector('div.main').style.display = 'block';
},
    100);

    if (document.readyState == "complete") {
        console.log('adload');
        if (!window.localStorage.getItem('lang')) {
            window.localStorage.setItem('lang', 'en');
        }
        limeyjs.load('home');
    } else {
window.addEventListener("load", function () {
    console.log('dload');
    if (!window.localStorage.getItem('lang')) {
        window.localStorage.setItem('lang', 'en');
    }
    limeyjs.load('home');
});
    }