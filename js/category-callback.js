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

    callback: function(data) {
        var productRow = document.querySelector(".container .row .main-col .row"),
            productComponent = productRow.querySelector(".category-grid"),
            products = data.groups;

        for (i = 0; i < products.length; i++) {
            var newComponent = productComponent.cloneNode(true),
                catImg = newComponent.querySelector(".main-image"),
                productId = products[i].id,
                productImages = products[i].images,
                quicklook = newComponent.querySelector(".quicklook");

            catImg.style.backgroundImage = "url(" + productImages[0] + ")";
            catImg.setAttribute('data-product-id', productId);
            quicklook.setAttribute('data-images', productImages);
            newComponent.querySelector(".desc").innerText = products[i].name;
            ws.ecom.product.pricing(newComponent, products[i]);
            productRow.appendChild(newComponent);
            ws.ecom.product.quicklook(newComponent, productImages);

        }
        productRow.removeChild(productRow.querySelector(".category-grid"));
    }

}