if (typeof ws === "undefined" || !ws) {
    var ws = {};
}

ws.ecom = ws.ecom || {};

ws.ecom.product = {


    getJSONP: function(url) {

        var script = window.document.createElement('script');
        script.src = url;
        window.document.head.appendChild(script);
        script.onload = function() {
            this.remove();
        };

    },

    createElementWithClass: function(elem, cls) {
        var element = document.createElement(elem);
        element.setAttribute('class', cls);
        return element;
    },

    // iterator: function(obj, path) {
    //     var parts = path.split('.'),
    //         rv,
    //         count = 0;
    //
    //     obj.forEach(function(elem) {
    //         //console.log(elem[parts[0]]);
    //         if (elem.parts !== 'undefined' || elem.parts !== null) {
    //             rv = elem[parts[count]];
    //         }
    //         ++this.count;
    //     })
    //     return rv;
    //
    //     // parts = path.split(".");
    //     // obj.forEach(function(elem) {
    //     //     console.log(elem[parts[0]]);
    //     //     if (parts.length == 1) {
    //     //         return elem[parts[0]];
    //     //     }
    //     //     //return iterator(elem[parts[0]], parts.slice(1).join("."));
    //     // })
    // },

    iterator: function(path) {
        var path = eval(path);
        obj.forEach(function(elem) {
            if (elem.path !== 'undefined' || elem.path !== null) {
                return elem.path;
            }
        })
        // parts = path.split(".");
        // obj.forEach(function(elem) {
        //     console.log(elem[parts[0]]);
        //     if (parts.length == 1) {
        //         return elem[parts[0]];
        //     }
        //     //return iterator(elem[parts[0]], parts.slice(1).join("."));
        // })
    },

    callback: function(data) {
        var productRow = document.querySelector(".container .row"),
            products = data.groups;

        for (i = 0; i < products.length; i++) {
            var catGrid = this.createElementWithClass('div', 'col-md-4 category-grid'),
                catComp = this.createElementWithClass('div', 'category-component'),
                productImg = this.createElementWithClass('div', 'category-image'),
                quicklink = this.createElementWithClass('a', 'quicklink'),
                productDesc = this.createElementWithClass('p', 'desc'),
                pricing = this.createElementWithClass('ul', 'pricing'),
                low = this.createElementWithClass('li', 'low'),
                high = this.createElementWithClass('li', 'high');
            if (products[i].priceRange.selling.high !== 'undefined' || products[i].priceRange.selling.high !== null) {
                high.innerHTML = products[i].priceRange.selling.high;
            }
            // low.appendChild(pricing);
            // high.appendChild(pricing);
            pricing.appendChild(low);
            pricing.appendChild(high);
            catComp.appendChild(pricing);
            catGrid.appendChild(catComp);
            productRow.appendChild(catGrid);
        }
        // productRow.appendChild(catGrid);
        // productRow.appendChild(catGrid);
        // productRow.appendChild(catGrid);
        // productRow.appendChild(catGrid);

        // news.appendChild(h5);
        // var p = document.createElement("p");
        // p.innerHTML = products[i].author;
        // news.appendChild(p);

    },

    init: function() {
        ws.ecom.product.getJSONP('js/products.json');
    }

}

document.addEventListener("DOMContentLoaded", function() {
    ws.ecom.product.init();
});