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
            ws.ecom.product.modal(newComponent, productImages);

        }
        productRow.removeChild(productRow.querySelector(".category-grid"));
    },

    modal: function(component, images) {
        var quicklook = component.querySelector(".quicklook");
        quicklook.addEventListener('click', function() {
            var modal = component.querySelector(".modal.quicklook"),
                thumbnail = modal.querySelector(".carousel .thumbnails"),
                thumbnails = thumbnail.querySelector("li");
            modal.querySelector('.main-image').style.backgroundImage = "url(" + images[0] + ")";

            for (j = 0; j < images.length; j++) {
                var li = document.createElement('li');
                li.style.backgroundImage = "url(" + images[j] + ")";
                thumbnail.appendChild(li);
            }
        });
    },

    getThumbnails: function() {
        var quicklooks = document.querySelectorAll(".category-component .quicklook");
        for (j = 0; j < quicklooks.length; j++) {
            var images = quicklooks[j].getAttribute('data-images');
            //quicklooks[i].addEventListener('click', this.modal(images));
        }
    },

    quicklook: function() {
        var quicklooks = document.querySelectorAll(".category-component .quicklook");
        console.log(quicklooks.length);
        for (i = 0; i < quicklooks.length; i++) {
            var quicklook = quicklooks[i];
            quicklook.onclick(function() {
                console.log(this.parentNode.parentNode.nextSibling);
                var newThumbnail = thumbnails.cloneNode(true);
                modal.querySelector('.thumbnails li').style.backgroundImage = "url(" + images[i] + ")";
            })
        }


    },

    init: function() {
        ws.ecom.product.getJSONP('js/products.json');
        //ws.ecom.product.quicklook();
    }

}

document.addEventListener("DOMContentLoaded", function() {
    ws.ecom.product.init();
});