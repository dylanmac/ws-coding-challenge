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
            var newComponent = productComponent.cloneNode(true),
                productId = products[i].id,
                productImages = products[i].images,
                quicklook = newComponent.querySelector(".quicklook");

            newComponent.querySelector(".category-image").style.backgroundImage = "url(" + productImages[0] + ")";
            quicklook.setAttribute('id', productId);
            quicklook.setAttribute('data-images', productImages);
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
            ws.ecom.product.quicklook(newComponent, productImages);

        }
        productRow.removeChild(productRow.querySelector(".category-grid"));
    },

    quicklook: function(component, images) {
        var quicklook = component.querySelector(".quicklook");
        var allModals = component.querySelectorAll(".quicklook-modal.show");
        quicklook.addEventListener('click', function(e) {
            e.preventDefault();
            var modal = component.querySelector(".quicklook-modal"),
                thumbnail = modal.querySelector(".product-images .thumbnails"),
                thumbnails = thumbnail.querySelector("li");
            modal.querySelector('.main-image').style.backgroundImage = "url(" + images[0] + ")";

            for (j = 0; j < images.length; j++) {
                var li = document.createElement('li');
                li.style.backgroundImage = "url(" + images[j] + ")";
                thumbnail.appendChild(li);
            }
            modal.classList.toggle("show");
            thumbnail.removeChild(thumbnail.querySelector("li"));
        });
    },

    closeQuicklook: function() {
        window.onclick = function(e) {
            console.log(e.target);
            if (e.target != modal) {
                modal.classList.remove("show");
            }
        }
    },

    init: function() {
        ws.ecom.product.getJSONP('js/products.json');
    }

}

document.addEventListener("DOMContentLoaded", function() {
    ws.ecom.product.init();
});