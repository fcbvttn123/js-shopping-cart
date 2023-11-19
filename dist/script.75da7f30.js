// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"items.json":[function(require,module,exports) {
module.exports = [{
  "id": 1,
  "name": "Red",
  "category": "Primary Color",
  "priceCents": 1600,
  "imageColor": "F00"
}, {
  "id": 2,
  "name": "Yellow",
  "category": "Primary Color",
  "priceCents": 2100,
  "imageColor": "FF0"
}, {
  "id": 3,
  "name": "Blue",
  "category": "Primary Color",
  "priceCents": 1200,
  "imageColor": "00F"
}, {
  "id": 4,
  "name": "Orange",
  "category": "Secondary Color",
  "priceCents": 1800,
  "imageColor": "F60"
}, {
  "id": 5,
  "name": "Green",
  "category": "Secondary Color",
  "priceCents": 1600,
  "imageColor": "0F0"
}, {
  "id": 6,
  "name": "Purple",
  "category": "Secondary Color",
  "priceCents": 2100,
  "imageColor": "60F"
}, {
  "id": 7,
  "name": "Light Gray",
  "category": "Grayscale",
  "priceCents": 1200,
  "imageColor": "AAA"
}, {
  "id": 8,
  "name": "Dark Gray",
  "category": "Grayscale",
  "priceCents": 1600,
  "imageColor": "333"
}];
},{}],"script.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shoppingCartIcon = exports.shoppingCart = exports.itemListPanel = exports.addToCartBtns = void 0;
exports.updateCartIcon = updateCartIcon;
var _items = _interopRequireDefault(require("./items.json"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Items Database

// HTML Elements

var storeContainer = document.querySelector("[data-store-container]");
var IMG_URL_BIG = "https://dummyimage.com/420x260";
var shoppingCartIcon = exports.shoppingCartIcon = document.querySelector(".shopping-cart-icon");
var itemListPanel = exports.itemListPanel = document.querySelector(".item-list-panel");
var addToCartBtns = exports.addToCartBtns = document.querySelectorAll(".add-to-cart-btn");

// Shopping Cart Array

var shoppingCart = exports.shoppingCart = JSON.parse(localStorage.getItem("shopping-cart")) || [];

// Set up store

storeSetup();
function storeSetup() {
  _items.default.forEach(function (e) {
    var temp = document.querySelector("[data-store-container-template]");
    var clon = temp.content.cloneNode(true);
    clon.querySelector("[data-item-category]").innerText = e.category;
    clon.querySelector("[data-item-name]").innerText = e.name;
    clon.querySelector("[data-item-price]").innerText = "$".concat((e.priceCents / 100).toFixed(2));
    clon.querySelector("[data-item-img]").src = "".concat(IMG_URL_BIG, "/").concat(e.imageColor, "/").concat(e.imageColor);
    clon.querySelector("[data-item-id]").dataset.itemId = e.id;
    clon.querySelector("[data-item-id]").addEventListener("click", addToCart);
    storeContainer.appendChild(clon);
  });
}

// Update shopping cart icon invisibility

updateCartIcon();
function updateCartIcon() {
  if (!shoppingCart.length) {
    shoppingCartIcon.classList.add("invisible");
  } else {
    shoppingCartIcon.classList.remove("invisible");
  }
  var indicator = shoppingCartIcon.querySelector(".cart-icon-indicator");
  indicator.innerText = shoppingCart.length;
}

// Click Event on "Shopping Cart Icon" to open "Item List Panel"

shoppingCartIcon.addEventListener("click", function (e) {
  itemListPanel.classList.toggle("invisible");
});

//"Add To Cart" click event

function addToCart(e) {
  var itemId = e.target.dataset.itemId;
  var itemInfo = _items.default.find(function (item) {
    return item.id == itemId;
  });
  var inList = shoppingCart.find(function (cartItem) {
    return cartItem.id == itemId;
  });
  if (inList) {
    shoppingCart.forEach(function (cartItem) {
      if (cartItem.id == itemId) {
        ++cartItem.amount;
        cartItem.price = itemInfo.priceCents * cartItem.amount;
      }
    });
  } else {
    shoppingCart.push({
      id: itemId,
      name: itemInfo.name,
      amount: 1,
      price: itemInfo.priceCents,
      color: itemInfo.imageColor
    });
  }
  localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
  updateCartIcon();
  updateItemListPanel();
}

// Update item list panel

updateItemListPanel();
function updateItemListPanel() {
  itemListPanel.querySelector(".item-container").innerHTML = "";
  var totalPrice = 0;
  shoppingCart.forEach(function (e) {
    var temp = document.getElementsByTagName("template")[0];
    var clon = temp.content.cloneNode(true);
    clon.querySelector("img").src = "https://dummyimage.com/210x130/".concat(e.color, "/").concat(e.color);
    clon.querySelector(".item-name").innerText = e.name;
    clon.querySelector(".item-price").innerText = "$".concat((e.price / 100).toFixed(2));
    if (e.amount != 1) {
      clon.querySelector(".item-number").innerText = "x".concat(e.amount);
    }
    clon.querySelector("button.remove-cart-item").dataset.itemId = e.id;
    clon.querySelector("button.remove-cart-item").addEventListener("click", removeCartItem);
    itemListPanel.querySelector(".item-container").appendChild(clon);
    totalPrice += e.price;
  });
  itemListPanel.querySelector(".total-price").innerText = "$".concat((totalPrice / 100).toFixed(2));
}

// Remove Cart Item Function 

function removeCartItem(e) {
  var removedId = e.target.dataset.itemId;
  var removedItem = shoppingCart.find(function (e) {
    return e.id == removedId;
  });
  if (removedItem.amount > 1) {
    shoppingCart.forEach(function (e) {
      return e.id == removedId && --e.amount;
    });
  } else {
    exports.shoppingCart = shoppingCart = shoppingCart.filter(function (e) {
      return e.id != removedId;
    });
  }
  shoppingCart.forEach(function (cartItem) {
    if (cartItem.id == removedId) {
      var itemInfo = _items.default.find(function (e) {
        return e.id == removedId;
      });
      cartItem.price = itemInfo.priceCents * cartItem.amount;
    }
  });
  localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
  updateCartIcon();
  updateItemListPanel();
}
},{"./items.json":"items.json"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60178" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map