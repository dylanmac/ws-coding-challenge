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

    removeElementsByClass: function(parentElem, className) {
        var elements = parentElem.getElementsByClassName(className);
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    },

    callback: function(data) {
        var productRow = document.querySelector(".container .row .main-col .row"),
            productComponent = productRow.querySelector(".category-grid"),
            products = data.groups;

        for (i = 0; i < products.length; i++) {
            var newComponent = productComponent.cloneNode(true);

            newComponent.querySelector(".category-image").style.backgroundImage = "url(" + products[i].images[0] + ")";
            newComponent.querySelector(".quicklook").setAttribute('href', '#' + products[i].id);
            newComponent.querySelector(".desc").innerText = products[i].name;
            if (products[i].priceRange) {
                if (products[i].priceRange.selling) {
                    if (products[i].priceRange.selling.high) {
                        newComponent.querySelector(".high").innerText = '$' + products[i].priceRange.selling.high;
                    }
                    if (products[i].priceRange.selling.low) {
                        newComponent.querySelector(".low").innerText = '$' + products[i].priceRange.selling.low + ' - ';
                    }
                }
            } else {
                this.removeElementsByClass(newComponent, 'low');
                newComponent.querySelector(".high").innerText = '$' + products[i].price.selling;
            }
            productRow.appendChild(newComponent);

        }
        productRow.removeChild(productRow.querySelector(".category-grid"));

    },

    init: function() {
        ws.ecom.product.getJSONP('js/products.json');
    }

}

document.addEventListener("DOMContentLoaded", function() {
    ws.ecom.product.init();
});