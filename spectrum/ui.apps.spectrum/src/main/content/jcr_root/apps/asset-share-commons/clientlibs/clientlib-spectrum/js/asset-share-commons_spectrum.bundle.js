/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 3972:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Rj: function() { return /* binding */ formSubmitListener; },
/* harmony export */   _V: function() { return /* binding */ getCsrfToken; }
/* harmony export */ });
/* unused harmony export fetchCsrfToken */
let csrfToken = await fetchCsrfToken();

setInterval(async () => {
    csrfToken = await fetchCsrfToken();
}, 500000); // 500 seconds as CSRF token life is 600 seconds

async function getCsrfToken() { return csrfToken || await fetchCsrfToken(); }

async function fetchCsrfToken() {
    const response = await fetch('/libs/granite/csrf/token.json');
    const json = await response.json();
    return json?.token || null;
}

function formSubmitListener(event) {
    event.preventDefault();

    const form = event.target;

    // Create a form input named ``:cq_csrf_token`` with the CSRF token.
    let csrfTokenInput = form.querySelector('input[name=":cq_csrf_token"]');
    if (!csrfTokenInput?.value) {
        // If the form does not have a CSRF token input, add one.
        form.insertAdjacentHTML('beforeend', `<input type="hidden" name=":cq_csrf_token" value="${csrfToken}">`);
    } else {
        // If the form already has a CSRF token input, update the value.
        csrfTokenInput.value = csrfToken;
    }
    // Submit the form with the hidden input containing the CSRF token
    form.submit();
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

/***/ 2535:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* unused harmony export default */
/* harmony import */ var _modals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6459);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_modals__WEBPACK_IMPORTED_MODULE_0__]);
_modals__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


class DownloadModalElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        if (!(0,_modals__WEBPACK_IMPORTED_MODULE_0__/* .isOpen */ .FJ)(this)) { return; }

        const downloadModalPath = this.getAttribute('data-asset-share-modal');
        const licenseModalPath = '/content/asset-share-commons/en/actions/license';       
        //const licensePath = this.getAttribute('data-asset-share-license');

        let fragment;

        if (licenseModalPath) {
            // License modal
            fragment = await this.prepareLicenseModal(licenseModalPath, downloadModalPath);
        } else {
            // Download modal     
            fragment = await this.prepareDownloadModal(downloadModalPath);
        }

        this.shadowRoot.replaceChildren(fragment);

    }

    async prepareLicenseModal(licenseModalPath, downloadModalPath) {
        const fragment = await (0,_modals__WEBPACK_IMPORTED_MODULE_0__/* .getModal */ .IO)(licenseModalPath, (0,_modals__WEBPACK_IMPORTED_MODULE_0__/* .getFormData */ .zi)(this));
        
        (0,_modals__WEBPACK_IMPORTED_MODULE_0__/* .addCancelEventListener */ .YL)(fragment, this.shadowRoot);

        fragment.addEventListener('confirm', async () => {
            console.log('confirm', downloadModalPath);
            this.shadowRoot.replaceChildren(await this.prepareDownloadModal(downloadModalPath));
        });

        return fragment;
    }

    async prepareDownloadModal(downloadModalPath) {
        const fragment = await (0,_modals__WEBPACK_IMPORTED_MODULE_0__/* .getModal */ .IO)(downloadModalPath, (0,_modals__WEBPACK_IMPORTED_MODULE_0__/* .getFormData */ .zi)(this));

        (0,_modals__WEBPACK_IMPORTED_MODULE_0__/* .addCancelEventListener */ .YL)(fragment, this.shadowRoot);

        fragment.addEventListener('confirm', (event) => {
            event.target.querySelector('form').submit()
        });

        return fragment;
    }

}

customElements.define('asset-share-download-modal', DownloadModalElement);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8138:
/***/ (function(module, __unused_webpack___webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* harmony import */ var _spectrum_web_components_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4449);
/* harmony import */ var _csrf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3972);
/* harmony import */ var _download_modal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2535);
/* harmony import */ var _share_modal_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_csrf_js__WEBPACK_IMPORTED_MODULE_1__, _download_modal_js__WEBPACK_IMPORTED_MODULE_2__, _share_modal_js__WEBPACK_IMPORTED_MODULE_3__]);
([_csrf_js__WEBPACK_IMPORTED_MODULE_1__, _download_modal_js__WEBPACK_IMPORTED_MODULE_2__, _share_modal_js__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);











/* Placeholder JS */
function toInput(sourceEL) {
    const targetName = sourceEL.dataset.assetShareTargetInputName;
    const targetEl =  document.querySelector('input[name="' + targetName + '"]');


    if (targetEl.matches('input[type="hidden"], input[type="text"], textarea')) {
        targetEl.value = sourceEL.value;
    } else if (targetEl.matches('input[type="checkbox"], input[type="radio"]')) {
        targetEl.checked = sourceEL.checked;
    }

    const event = new Event('change', { 'bubbles': true, 'cancelable': true });
    targetEl.dispatchEvent(event);
}

window.AssetShare = window.AssetShare || {};
window.AssetShare.Spectrum = {
    toInput: toInput
}


document.querySelectorAll('.asc-expandable-section').forEach(function(sectionEl) {
    sectionEl.addEventListener('click', function(titleEl) {
        if (titleEl.target.matches('.asc-expandable-section__title') || titleEl.target.matches('.asc-expandable-section__title *')) {
            sectionEl.classList.toggle('asc-expandable-section--expanded');
        }
    });
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6459:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FJ: function() { return /* binding */ isOpen; },
/* harmony export */   IO: function() { return /* binding */ getModal; },
/* harmony export */   YL: function() { return /* binding */ addCancelEventListener; },
/* harmony export */   zi: function() { return /* binding */ getFormData; }
/* harmony export */ });
/* harmony import */ var _csrf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3972);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_csrf_js__WEBPACK_IMPORTED_MODULE_0__]);
_csrf_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


async function getModal(path, formData) {
    formData = formData || new FormData();
    formData.append('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
    formData.append(':cq_csrf_token', await (0,_csrf_js__WEBPACK_IMPORTED_MODULE_0__/* .getCsrfToken */ ._V)());

    if (path.indexOf('.') > -1) {
        path = path.substring(0, path.indexOf('.'));
    }

    const response = await fetch(`${path}.fragment.html`, {
        method: 'POST',
        body: formData,
    });

    const html = await response.text();
    console.log(html);
    const fragment = document.createRange().createContextualFragment(html).querySelector('sp-dialog-wrapper');

    fragment.querySelectorAll('form')?.forEach(form => {
        form.addEventListener('submit', _csrf_js__WEBPACK_IMPORTED_MODULE_0__/* .formSubmitListener */ .Rj);
        form.insertAdjacentHTML('afterbegin', `<input type="hidden" name="timezone" value="${Intl.DateTimeFormat().resolvedOptions().timeZone}">`);
    });

    return fragment || '';
}

function isOpen(el) {
    console.log(el.parentElement.tagName.toUpperCase());
    return el.parentElement.tagName.toUpperCase() === 'ACTIVE-OVERLAY';
}

function getFormData(el) {
    const PREFIX = 'data-asset-share-form-param-';

    const formData = new FormData();
    
    [...el.attributes].forEach((attr) => {
        if (attr.name?.startsWith(PREFIX)) {
            const name = attr?.name.substring(PREFIX.length)?.trim();
            const value = attr?.value?.trim();

            if (name && value.startsWith('[') && value.endsWith(']')) {
                const values = value.substring(1, value.length - 1).split(',');
                values.forEach((v) => {
                    formData.append(name, v?.trim());
                });
            } else if (name) {
                formData.append(name, value);
            }
        }      
    });

    return formData;
}

function addCancelEventListener(fragment, shadowRoot) {
    fragment.addEventListener('cancel', () => {
        document.querySelectorAll('overlay-trigger').forEach(overlayTrigger => overlayTrigger.open = undefined);
        // Clear the shadow root so that the modal does not flicker on next open.
        shadowRoot.innerHTML = '';
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2648:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* unused harmony export default */
/* harmony import */ var _modals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6459);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_modals__WEBPACK_IMPORTED_MODULE_0__]);
_modals__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


class ShareModalElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        if (!(0,_modals__WEBPACK_IMPORTED_MODULE_0__/* .isOpen */ .FJ)(this)) { return; }

        const shareModalPath = this.getAttribute('data-asset-share-modal');

        // Share modal     
        const fragment = await this.prepareShareModal(shareModalPath);

        this.shadowRoot.replaceChildren(fragment);
    }


    async prepareShareModal(shareModalPath) {
        const fragment = await (0,_modals__WEBPACK_IMPORTED_MODULE_0__/* .getModal */ .IO)(shareModalPath, (0,_modals__WEBPACK_IMPORTED_MODULE_0__/* .getFormData */ .zi)(this));

        (0,_modals__WEBPACK_IMPORTED_MODULE_0__/* .addCancelEventListener */ .YL)(fragment, this.shadowRoot);

        fragment.addEventListener('confirm', (event) => {
            event.target.querySelector('form').submit()
        });

        return fragment;
    }
}

customElements.define('asset-share-share-modal', ShareModalElement);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4449:
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _spectrum_web_components_theme_sp_theme_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9749);
/* harmony import */ var _spectrum_web_components_theme_src_themes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7281);
/* harmony import */ var _spectrum_web_components_link_sp_link_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4807);
/* harmony import */ var _spectrum_web_components_card_sp_card_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6909);
/* harmony import */ var _spectrum_web_components_table_elements_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3970);
/* harmony import */ var _spectrum_web_components_menu_sp_menu_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8549);
/* harmony import */ var _spectrum_web_components_menu_sp_menu_group_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(678);
/* harmony import */ var _spectrum_web_components_menu_sp_menu_item_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(582);
/* harmony import */ var _spectrum_web_components_menu_sp_menu_divider_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6586);
/* harmony import */ var _spectrum_web_components_action_menu_sp_action_menu_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8839);
/* harmony import */ var _spectrum_web_components_action_group_sp_action_group_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2346);
/* harmony import */ var _spectrum_web_components_button_group_sp_button_group_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7466);
/* harmony import */ var _spectrum_web_components_button_sp_button_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(809);
/* harmony import */ var _spectrum_web_components_button_sp_clear_button_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(7589);
/* harmony import */ var _spectrum_web_components_button_sp_close_button_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(5154);
/* harmony import */ var _spectrum_web_components_progress_bar_sp_progress_bar_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(3539);
/* harmony import */ var _spectrum_web_components_tooltip_sp_tooltip_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(1440);
/* harmony import */ var _spectrum_web_components_meter_sp_meter_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(4625);
/* harmony import */ var _spectrum_web_components_field_group_sp_field_group_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(1919);
/* harmony import */ var _spectrum_web_components_search_sp_search_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(178);
/* harmony import */ var _spectrum_web_components_textfield_sp_textfield_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(4247);
/* harmony import */ var _spectrum_web_components_checkbox_sp_checkbox_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(6840);
/* harmony import */ var _spectrum_web_components_switch_sp_switch_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(7144);
/* harmony import */ var _spectrum_web_components_radio_sp_radio_group_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(6073);
/* harmony import */ var _spectrum_web_components_radio_sp_radio_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(3883);
/* harmony import */ var _spectrum_web_components_picker_sp_picker_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(1663);
/* harmony import */ var _spectrum_web_components_asset_sp_asset_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(6743);
/* harmony import */ var _spectrum_web_components_tags_sp_tags_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(6305);
/* harmony import */ var _spectrum_web_components_tags_sp_tag_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(9206);
/* harmony import */ var _spectrum_web_components_overlay_overlay_trigger_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(2794);
/* harmony import */ var _spectrum_web_components_dialog_sp_dialog_wrapper_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(4954);
/* harmony import */ var _spectrum_web_components_banner_sp_banner_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(8117);
/* harmony import */ var _spectrum_web_components_thumbnail_sp_thumbnail_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(838);
/* harmony import */ var _spectrum_web_components_icons_workflow_icons_sp_icon_classic_grid_view_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(848);
/* harmony import */ var _spectrum_web_components_icons_workflow_icons_sp_icon_view_list_js__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(2314);
/* harmony import */ var _spectrum_web_components_icons_workflow_icons_sp_icon_search_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(8947);
/* harmony import */ var _spectrum_web_components_icons_workflow_icons_sp_icon_refresh_js__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(6907);
/* harmony import */ var _spectrum_web_components_icons_workflow_icons_sp_icon_download_js__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(7221);
/* harmony import */ var _spectrum_web_components_icons_workflow_icons_sp_icon_share_js__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(5460);
/* harmony import */ var _spectrum_web_components_icons_workflow_icons_sp_icon_add_js__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(3981);
/* harmony import */ var _spectrum_web_components_icons_workflow_icons_sp_icon_remove_js__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(4589);
/* harmony import */ var _spectrum_web_components_icons_workflow_icons_sp_icon_shopping_cart_js__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(1052);
/* harmony import */ var _spectrum_web_components_icons_ui_icons_sp_icon_chevron75_js__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(6710);
/* harmony import */ var _spectrum_web_components_icons_ui_icons_sp_icon_arrow75_js__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(3402);






















/* Form fields */










/* Asset Details */




/* Unused */
//import '@spectrum-web-components/quick-actions/sp-quick-actions.js';
//import '@spectrum-web-components/accordion/sp-accordion.js';
//import '@spectrum-web-components/accordion/sp-accordion-item.js';

/* Modals */
//import '@spectrum-web-components/overlay/overlay-trigger.js';
//import '@spectrum-web-components/dialog/sp-dialog-base.js';
//import '@spectrum-web-components/dialog/sp-dialog-wrapper.js';





//import '@spectrum-web-components/toast/sp-toast.js';

/* Icons */














/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	!function() {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = function(queue) {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach(function(fn) { fn.r--; });
/******/ 				queue.forEach(function(fn) { fn.r-- ? fn.r++ : fn(); });
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = function(deps) { return deps.map(function(dep) {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then(function(r) {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, function(e) {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = function(fn) { fn(queue); };
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = function() {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}); };
/******/ 		__webpack_require__.a = function(module, body, hasAwait) {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise(function(resolve, rej) {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = function(fn) { queue && fn(queue), depQueues.forEach(fn), promise["catch"](function() {}); };
/******/ 			module.exports = promise;
/******/ 			body(function(deps) {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = function() { return currentDeps.map(function(d) {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}); }
/******/ 				var promise = new Promise(function(resolve) {
/******/ 					fn = function() { resolve(getResult); };
/******/ 					fn.r = 0;
/******/ 					var fnQueue = function(q) { q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))); };
/******/ 					currentDeps.map(function(dep) { dep[webpackQueues](fnQueue); });
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, function(err) { (err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue); });
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	!function() {
/******/ 		var getProto = Object.getPrototypeOf ? function(obj) { return Object.getPrototypeOf(obj); } : function(obj) { return obj.__proto__; };
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach(function(key) { def[key] = function() { return value[key]; }; });
/******/ 			}
/******/ 			def['default'] = function() { return value; };
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	!function() {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = function(chunkId) {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce(function(promises, key) {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	!function() {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = function(chunkId) {
/******/ 			// return url for filenames based on template
/******/ 			return "js/" + chunkId + ".bundle.js";
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	!function() {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = function(chunkId) {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	!function() {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "aem-maven-archetype:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = function(url, done, key, chunkId) {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = function(prev, event) {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach(function(fn) { return fn(event); });
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../";
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			281: 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = function(chunkId, promises) {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise(function(resolve, reject) { installedChunkData = installedChunks[chunkId] = [resolve, reject]; });
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = function(event) {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkaem_maven_archetype"] = self["webpackChunkaem_maven_archetype"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [401], function() { return __webpack_require__(8138); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=asset-share-commons_spectrum.bundle.js.map