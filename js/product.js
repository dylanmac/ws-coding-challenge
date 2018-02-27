if (typeof ws === "undefined" || !ws) {
    var ws = {};
}

ws.ecom = ws.ecom || {};

var productView = document.querySelector(".product-view"),
    thumbnail = productView.querySelector(".product-images .thumbnails");

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
        var productImages = productView.querySelector(".product-images"),
            productDetails = productView.querySelector(".product-details"),
            products = data.groups,
            productId = window.location.hash.substr(1),
            filteredProductsData = products.filter(function(prod) {
                return prod.id == productId;
            })[0],
            productImagesData = filteredProductsData.images;

        productImages.querySelector('.main-image').style.backgroundImage = "url(" + productImagesData[0] + ")";

        for (j = 0; j < productImagesData.length; j++) {
            var li = document.createElement('li');
            li.style.backgroundImage = "url(" + productImagesData[j] + ")";
            thumbnail.appendChild(li);
        }

        productDetails.querySelector(".desc").innerText = filteredProductsData.name;

        if (filteredProductsData.priceRange) {
            if (filteredProductsData.priceRange.selling) {
                if (filteredProductsData.priceRange.selling.high) {
                    productDetails.querySelector(".high").innerText = '$' + filteredProductsData.priceRange.selling.high;
                }
                if (filteredProductsData.priceRange.selling.low) {
                    productDetails.querySelector(".low").innerText = '$' + filteredProductsData.priceRange.selling.low + ' - ';
                }
            }
        } else {
            this.removeElementsByClass(newComponent, 'low');
            productDetails.querySelector(".high").innerText = '$' + filteredProductsData.price.selling;
        }

    },

    init: function() {
        ws.ecom.product.getJSONP('js/products.json');
    }

}

document.addEventListener("DOMContentLoaded", function() {
    ws.ecom.product.init();
});