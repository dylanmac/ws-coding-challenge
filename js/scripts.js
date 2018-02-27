if (typeof ws === "undefined" || !ws) {
    var ws = {};
}

ws.ecom = ws.ecom || {};

var viewportModal = document.querySelector(".viewport-modal"),
    thumbnail = viewportModal.querySelector(".product-images .thumbnails"),
    closeButton = viewportModal.querySelector(".close-icon");


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

        quicklook.addEventListener('click', function(e) {
            e.preventDefault();
            while (thumbnail.childNodes.length > 1) {
                thumbnail.removeChild(thumbnail.lastChild);
            }
            viewportModal.querySelector('.main-image').style.backgroundImage = "url(" + images[0] + ")";

            for (j = 0; j < images.length; j++) {
                var li = document.createElement('li');
                li.style.backgroundImage = "url(" + images[j] + ")";
                thumbnail.appendChild(li);
            }
            ws.ecom.product.slideshow();
            ws.ecom.product.toggleModal();
        });
    },

    slideshow: function() {
        var thumbnails = thumbnail.querySelectorAll('li');
        for (k = 0; k < thumbnails.length; k++) {
            thumbnails[k].addEventListener('click', function(e) {
                var elem = e.target || e.srcElement;
                var bgImg = elem.getAttribute('style');
                viewportModal.querySelector('.main-image').style = bgImg;
            })
        }

    },

    toggleModal: function() {
        viewportModal.classList.toggle('show-modal');
    },

    closeModalOnWindowClick: function(e) {
        var viewportModal = document.querySelector(".viewport-modal");
        if (e.target === viewportModal) {
            ws.ecom.product.toggleModal();
        }
    },

    init: function() {
        ws.ecom.product.getJSONP('js/products.json');
        closeButton.addEventListener("click", ws.ecom.product.toggleModal);
        window.addEventListener("click", ws.ecom.product.closeModalOnWindowClick);
    }

}

document.addEventListener("DOMContentLoaded", function() {
    ws.ecom.product.init();
});