if (typeof ws === "undefined" || !ws) {
    var ws = {};
}

ws.ecom = ws.ecom || {};

var isCatPage = (document.body.id == 'categoryPage') ? true : false,
    viewportModal = document.querySelector(".viewport-modal"),
    thumbnail = document.querySelector(".product-images .thumbnails"),
    closeButton = document.querySelector(".close-icon");


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
        var productData = data.groups;

        if (isCatPage) {
            var mainRow = document.querySelector(".container .main-col .row"),
                productComponent = mainRow.querySelector(".category-grid");

            for (i = 0; i < productData.length; i++) {
                var newComponent = productComponent.cloneNode(true),
                    catImg = newComponent.querySelector(".main-image"),
                    productDetails = newComponent.querySelector(".product-details"),
                    productId = productData[i].id,
                    productImages = productData[i].images,
                    productName = productData[i].name,
                    quicklook = newComponent.querySelector(".quicklook");

                ws.ecom.product.productContent(productDetails, catImg, productId, productName, productImages);
                quicklook.setAttribute('data-images', productImages);
                ws.ecom.product.pricing(newComponent, productData[i]);
                mainRow.appendChild(newComponent);
                ws.ecom.product.quicklook(newComponent, productImages);
            }
            mainRow.removeChild(mainRow.children[0]);
        } else {
            var productComponent = document.querySelector("main.row");

            var productImages = productComponent.querySelector('.product-images'),
                productDetails = document.querySelector(".product-details"),
                mainImage = productImages.querySelector(".main-image"),
                productId = window.location.hash.substr(1),
                filteredProductsData = productData.filter(function(prod) {
                    return prod.id == productId;
                })[0],
                productName = filteredProductsData.name,
                productImagesData = filteredProductsData.images;

            ws.ecom.product.thumbnails(productImagesData);
            ws.ecom.product.slideshow(productImages);
            ws.ecom.product.productContent(productDetails, mainImage, productId, productName, productImagesData);
            ws.ecom.product.pricing(productDetails, filteredProductsData);
        }

    },

    productContent: function(productDetails, mainImage, productId, productName, productImages) {
        mainImage.style.backgroundImage = "url(" + productImages[0] + ")";
        mainImage.setAttribute('data-product-id', productId);
        mainImage.setAttribute('href', 'product.htm#' + productId);
        productDetails.querySelector(".desc").innerText = productName;
    },

    pricing: function(component, productData) {
        if (productData.priceRange) {
            if (productData.priceRange.selling) {
                if (productData.priceRange.selling.high) {
                    component.querySelector(".high").innerText = '$' + productData.priceRange.selling.high;
                }
                if (productData.priceRange.selling.low) {
                    component.querySelector(".low").innerText = '$' + productData.priceRange.selling.low + ' - ';
                }
            }
        } else {
            this.removeElementsByClass(component, 'low');
            component.querySelector(".high").innerText = '$' + productData.price.selling;
        }

    },

    quicklook: function(component, images) {
        var quicklook = component.querySelector(".quicklook");

        quicklook.addEventListener('click', function(e) {
            e.preventDefault();
            while (thumbnail.childNodes.length > 1) {
                thumbnail.removeChild(thumbnail.lastChild);
            }
            viewportModal.querySelector('.slideshow.main-image').style.backgroundImage = "url(" + images[0] + ")";

            ws.ecom.product.thumbnails(images);
            ws.ecom.product.slideshow(viewportModal);
            ws.ecom.product.toggleModal();
        });
    },

    slideshow: function(targetElem) {
        var thumbnails = thumbnail.querySelectorAll('li');
        for (k = 0; k < thumbnails.length; k++) {
            thumbnails[k].addEventListener('click', function(e) {
                var elem = e.target || e.srcElement;
                var bgImg = elem.getAttribute('style');
                targetElem.querySelector('.slideshow.main-image').style = bgImg;
            })
        }

    },

    thumbnails: function(images) {
        for (j = 0; j < images.length; j++) {
            var li = document.createElement('li');
            li.style.backgroundImage = "url(" + images[j] + ")";
            thumbnail.appendChild(li);
        }
        if (!isCatPage) thumbnail.removeChild(thumbnail.children[0]);
    },

    toggleModal: function() {
        viewportModal.classList.toggle('show-modal');
    },

    closeModalOnWindowClick: function(e) {
        if (e.target === viewportModal) {
            ws.ecom.product.toggleModal();
        }
    },

    init: function() {
        ws.ecom.product.getJSONP('js/products.json');
        if (isCatPage) {
            closeButton.addEventListener("click", ws.ecom.product.toggleModal);
            window.addEventListener("click", ws.ecom.product.closeModalOnWindowClick);
        }
    }

}

document.addEventListener("DOMContentLoaded", function() {
    ws.ecom.product.init();
});
