"use strict";
(self["webpackChunkaem_maven_archetype"] = self["webpackChunkaem_maven_archetype"] || []).push([[238],{

/***/ 1238:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Overlay: function() { return /* binding */ Overlay; }
});

// EXTERNAL MODULE: ./node_modules/@spectrum-web-components/base/src/Base.js
var Base = __webpack_require__(3599);
// EXTERNAL MODULE: ./node_modules/lit/index.js + 3 modules
var lit = __webpack_require__(9550);
// EXTERNAL MODULE: ./node_modules/lit/directives/if-defined.js + 1 modules
var if_defined = __webpack_require__(5118);
// EXTERNAL MODULE: ./node_modules/lit/decorators.js + 6 modules
var decorators = __webpack_require__(7338);
// EXTERNAL MODULE: ./node_modules/@spectrum-web-components/shared/src/reparent-children.js
var reparent_children = __webpack_require__(6731);
// EXTERNAL MODULE: ./node_modules/@spectrum-web-components/shared/src/first-focusable-in.js
var first_focusable_in = __webpack_require__(7171);
;// CONCATENATED MODULE: ./node_modules/@spectrum-web-components/overlay/src/active-overlay.css.js
const e=(0,lit/* css */.iv)`
@keyframes sp-overlay-fade-in{0%{opacity:0;transform:var(--sp-overlay-from)}to{opacity:1;transform:translate(0)}}@keyframes sp-overlay-fade-out{0%{opacity:1;transform:translate(0)}to{opacity:0;transform:var(--sp-overlay-from)}}:host{display:inline-block;left:-9999em;max-height:100%;pointer-events:none;position:fixed;top:-9999em;z-index:1000}:host(:focus){outline:none}:host([placement=none]){height:100vh;height:100dvh;height:-webkit-fill-available;height:fill-available;left:0;position:fixed;top:0}#contents,sp-theme{height:100%}#contents{--swc-overlay-animation-distance:var(
--spectrum-picker-m-texticon-popover-offset-y,var(--spectrum-global-dimension-size-75)
);animation-duration:var(
--swc-test-duration,var(--spectrum-global-animation-duration-200,.16s)
);animation-timing-function:var(
--spectrum-global-animation-ease-out,ease-out
);box-sizing:border-box;display:inline-block;opacity:1;pointer-events:none;visibility:visible}:host([actual-placement*=top]) #contents{--sp-overlay-from:translateY(var(--spectrum-global-dimension-size-75));align-items:flex-end;display:inline-flex;padding-top:var(--swc-overlay-animation-distance)}:host([actual-placement*=right]) #contents{--sp-overlay-from:translateX(calc(var(--spectrum-global-dimension-size-75)*-1));padding-right:var(--swc-overlay-animation-distance)}:host([actual-placement*=bottom]) #contents{--sp-overlay-from:translateY(calc(var(--spectrum-global-dimension-size-75)*-1));padding-bottom:var(--swc-overlay-animation-distance)}:host([actual-placement*=left]) #contents{--sp-overlay-from:translateX(var(--spectrum-global-dimension-size-75));padding-left:var(--swc-overlay-animation-distance)}:host([animating]) ::slotted(*){pointer-events:none}:host(:not([animating])) ::slotted(*){pointer-events:auto}#contents ::slotted(*){position:relative}
`;/* harmony default export */ var active_overlay_css = (e);
//# sourceMappingURL=active-overlay.css.js.map

;// CONCATENATED MODULE: ./node_modules/@spectrum-web-components/overlay/src/overlay-utils.js
const parentOverlayOf=e=>{if(!e)return null;const o=e.closest("active-overlay");if(o)return o;const t=e.getRootNode();return t.host?parentOverlayOf(t.host):null},findOverlaysRootedInOverlay=(e,o)=>{const t=[];if(!e)return[];for(const r of o)r.root&&parentOverlayOf(r.root)===e&&(t.push(r),t.push(...findOverlaysRootedInOverlay(r,o)));return t};
//# sourceMappingURL=overlay-utils.js.map

;// CONCATENATED MODULE: ./node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
const floating_ui_utils_sides = (/* unused pure expression or super */ null && (['top', 'right', 'bottom', 'left']));
const alignments = (/* unused pure expression or super */ null && (['start', 'end']));
const floating_ui_utils_placements = /*#__PURE__*/(/* unused pure expression or super */ null && (floating_ui_utils_sides.reduce((acc, side) => acc.concat(side, side + "-" + alignments[0], side + "-" + alignments[1]), [])));
const floating_ui_utils_min = Math.min;
const floating_ui_utils_max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = v => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
const oppositeAlignmentMap = {
  start: 'end',
  end: 'start'
};
function clamp(start, value, end) {
  return floating_ui_utils_max(start, floating_ui_utils_min(value, end));
}
function floating_ui_utils_evaluate(value, param) {
  return typeof value === 'function' ? value(param) : value;
}
function floating_ui_utils_getSide(placement) {
  return placement.split('-')[0];
}
function floating_ui_utils_getAlignment(placement) {
  return placement.split('-')[1];
}
function floating_ui_utils_getOppositeAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
function getAxisLength(axis) {
  return axis === 'y' ? 'height' : 'width';
}
function floating_ui_utils_getSideAxis(placement) {
  return ['top', 'bottom'].includes(floating_ui_utils_getSide(placement)) ? 'y' : 'x';
}
function getAlignmentAxis(placement) {
  return floating_ui_utils_getOppositeAxis(floating_ui_utils_getSideAxis(placement));
}
function floating_ui_utils_getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = floating_ui_utils_getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [floating_ui_utils_getOppositeAlignmentPlacement(placement), oppositePlacement, floating_ui_utils_getOppositeAlignmentPlacement(oppositePlacement)];
}
function floating_ui_utils_getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, alignment => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ['left', 'right'];
  const rl = ['right', 'left'];
  const tb = ['top', 'bottom'];
  const bt = ['bottom', 'top'];
  switch (side) {
    case 'top':
    case 'bottom':
      if (rtl) return isStart ? rl : lr;
      return isStart ? lr : rl;
    case 'left':
    case 'right':
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = floating_ui_utils_getAlignment(placement);
  let list = getSideList(floating_ui_utils_getSide(placement), direction === 'start', rtl);
  if (alignment) {
    list = list.map(side => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(floating_ui_utils_getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, side => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function floating_ui_utils_getPaddingObject(padding) {
  return typeof padding !== 'number' ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function floating_ui_utils_rectToClientRect(rect) {
  return {
    ...rect,
    top: rect.y,
    left: rect.x,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  };
}



;// CONCATENATED MODULE: ./node_modules/@floating-ui/core/dist/floating-ui.core.mjs



function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = floating_ui_utils_getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = floating_ui_utils_getSide(placement);
  const isVertical = sideAxis === 'y';
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case 'top':
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case 'bottom':
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case 'right':
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case 'left':
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (floating_ui_utils_getAlignment(placement)) {
    case 'start':
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case 'end':
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a reference element when it is given a certain positioning strategy.
 *
 * This export does not have any `platform` interface logic. You will need to
 * write one for the platform you are using Floating UI with.
 */
const computePosition = async (reference, floating, config) => {
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
  let rects = await platform.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === 'object') {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
      continue;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};

/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary on each side.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = 'clippingAncestors',
    rootBoundary = 'viewport',
    elementContext = 'floating',
    altBoundary = false,
    padding = 0
  } = floating_ui_utils_evaluate(options, state);
  const paddingObject = floating_ui_utils_getPaddingObject(padding);
  const altContext = elementContext === 'floating' ? 'reference' : 'floating';
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = floating_ui_utils_rectToClientRect(await platform.getClippingRect({
    element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating))),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === 'floating' ? {
    ...rects.floating,
    x,
    y
  } : rects.reference;
  const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
  const offsetScale = (await (platform.isElement == null ? void 0 : platform.isElement(offsetParent))) ? (await (platform.getScale == null ? void 0 : platform.getScale(offsetParent))) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = floating_ui_utils_rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow = options => ({
  name: 'arrow',
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform,
      elements
    } = state;
    // Since `element` is required, we don't Partial<> the type.
    const {
      element,
      padding = 0
    } = floating_ui_utils_evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = floating_ui_utils_getPaddingObject(padding);
    const coords = {
      x,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform.getDimensions(element);
    const isYAxis = axis === 'y';
    const minProp = isYAxis ? 'top' : 'left';
    const maxProp = isYAxis ? 'bottom' : 'right';
    const clientProp = isYAxis ? 'clientHeight' : 'clientWidth';
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;

    // DOM platform can return `window` as the `offsetParent`.
    if (!clientSize || !(await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent)))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;

    // If the padding is large enough that it causes the arrow to no longer be
    // centered, modify the padding so that it is centered.
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = floating_ui_utils_min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = floating_ui_utils_min(paddingObject[maxProp], largestPossiblePadding);

    // Make sure the arrow doesn't overflow the floating element if the center
    // point is outside the floating element's bounds.
    const min$1 = minPadding;
    const max = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset = clamp(min$1, center, max);

    // If the reference is small enough that the arrow's padding causes it to
    // to point to nothing for an aligned placement, adjust the offset of the
    // floating element itself. This stops `shift()` from taking action, but can
    // be worked around by calling it again after the `arrow()` if desired.
    const shouldAddOffset = floating_ui_utils_getAlignment(placement) != null && center != offset && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? min$1 - center : max - center : 0;
    return {
      [axis]: coords[axis] - alignmentOffset,
      data: {
        [axis]: offset,
        centerOffset: center - offset + alignmentOffset
      }
    };
  }
});

function getPlacementList(alignment, autoAlignment, allowedPlacements) {
  const allowedPlacementsSortedByAlignment = alignment ? [...allowedPlacements.filter(placement => getAlignment(placement) === alignment), ...allowedPlacements.filter(placement => getAlignment(placement) !== alignment)] : allowedPlacements.filter(placement => getSide(placement) === placement);
  return allowedPlacementsSortedByAlignment.filter(placement => {
    if (alignment) {
      return getAlignment(placement) === alignment || (autoAlignment ? getOppositeAlignmentPlacement(placement) !== placement : false);
    }
    return true;
  });
}
/**
 * Optimizes the visibility of the floating element by choosing the placement
 * that has the most space available automatically, without needing to specify a
 * preferred placement. Alternative to `flip`.
 * @see https://floating-ui.com/docs/autoPlacement
 */
const autoPlacement = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'autoPlacement',
    options,
    async fn(state) {
      var _middlewareData$autoP, _middlewareData$autoP2, _placementsThatFitOnE;
      const {
        rects,
        middlewareData,
        placement,
        platform,
        elements
      } = state;
      const {
        crossAxis = false,
        alignment,
        allowedPlacements = placements,
        autoAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      const placements$1 = alignment !== undefined || allowedPlacements === placements ? getPlacementList(alignment || null, autoAlignment, allowedPlacements) : allowedPlacements;
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const currentIndex = ((_middlewareData$autoP = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP.index) || 0;
      const currentPlacement = placements$1[currentIndex];
      if (currentPlacement == null) {
        return {};
      }
      const alignmentSides = getAlignmentSides(currentPlacement, rects, await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)));

      // Make `computeCoords` start from the right place.
      if (placement !== currentPlacement) {
        return {
          reset: {
            placement: placements$1[0]
          }
        };
      }
      const currentOverflows = [overflow[getSide(currentPlacement)], overflow[alignmentSides[0]], overflow[alignmentSides[1]]];
      const allOverflows = [...(((_middlewareData$autoP2 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP2.overflows) || []), {
        placement: currentPlacement,
        overflows: currentOverflows
      }];
      const nextPlacement = placements$1[currentIndex + 1];

      // There are more placements to check.
      if (nextPlacement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: nextPlacement
          }
        };
      }
      const placementsSortedByMostSpace = allOverflows.map(d => {
        const alignment = getAlignment(d.placement);
        return [d.placement, alignment && crossAxis ?
        // Check along the mainAxis and main crossAxis side.
        d.overflows.slice(0, 2).reduce((acc, v) => acc + v, 0) :
        // Check only the mainAxis.
        d.overflows[0], d.overflows];
      }).sort((a, b) => a[1] - b[1]);
      const placementsThatFitOnEachSide = placementsSortedByMostSpace.filter(d => d[2].slice(0,
      // Aligned placements should not check their opposite crossAxis
      // side.
      getAlignment(d[0]) ? 2 : 3).every(v => v <= 0));
      const resetPlacement = ((_placementsThatFitOnE = placementsThatFitOnEachSide[0]) == null ? void 0 : _placementsThatFitOnE[0]) || placementsSortedByMostSpace[0][0];
      if (resetPlacement !== placement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: resetPlacement
          }
        };
      }
      return {};
    }
  };
};

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'flip',
    options,
    async fn(state) {
      var _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = 'bestFit',
        fallbackAxisSideDirection = 'none',
        flipAlignment = true,
        ...detectOverflowOptions
      } = floating_ui_utils_evaluate(options, state);
      const side = floating_ui_utils_getSide(placement);
      const isBasePlacement = floating_ui_utils_getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      if (!specifiedFallbackPlacements && fallbackAxisSideDirection !== 'none') {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides = floating_ui_utils_getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides[0]], overflow[sides[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];

      // One or more sides is overflowing.
      if (!overflows.every(side => side <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          // Try next placement and re-run the lifecycle.
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }

        // First, find the candidates that fit on the mainAxis side of overflow,
        // then find the placement that fits the best on the main crossAxis side.
        let resetPlacement = (_overflowsData$filter = overflowsData.filter(d => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;

        // Otherwise fallback.
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case 'bestFit':
              {
                var _overflowsData$map$so;
                const placement = (_overflowsData$map$so = overflowsData.map(d => [d.placement, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0];
                if (placement) {
                  resetPlacement = placement;
                }
                break;
              }
            case 'initialPlacement':
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};

function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return sides.some(side => overflow[side] >= 0);
}
/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */
const hide = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'hide',
    options,
    async fn(state) {
      const {
        rects
      } = state;
      const {
        strategy = 'referenceHidden',
        ...detectOverflowOptions
      } = evaluate(options, state);
      switch (strategy) {
        case 'referenceHidden':
          {
            const overflow = await detectOverflow(state, {
              ...detectOverflowOptions,
              elementContext: 'reference'
            });
            const offsets = getSideOffsets(overflow, rects.reference);
            return {
              data: {
                referenceHiddenOffsets: offsets,
                referenceHidden: isAnySideFullyClipped(offsets)
              }
            };
          }
        case 'escaped':
          {
            const overflow = await detectOverflow(state, {
              ...detectOverflowOptions,
              altBoundary: true
            });
            const offsets = getSideOffsets(overflow, rects.floating);
            return {
              data: {
                escapedOffsets: offsets,
                escaped: isAnySideFullyClipped(offsets)
              }
            };
          }
        default:
          {
            return {};
          }
      }
    }
  };
};

function getBoundingRect(rects) {
  const minX = min(...rects.map(rect => rect.left));
  const minY = min(...rects.map(rect => rect.top));
  const maxX = max(...rects.map(rect => rect.right));
  const maxY = max(...rects.map(rect => rect.bottom));
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}
function getRectsByLine(rects) {
  const sortedRects = rects.slice().sort((a, b) => a.y - b.y);
  const groups = [];
  let prevRect = null;
  for (let i = 0; i < sortedRects.length; i++) {
    const rect = sortedRects[i];
    if (!prevRect || rect.y - prevRect.y > prevRect.height / 2) {
      groups.push([rect]);
    } else {
      groups[groups.length - 1].push(rect);
    }
    prevRect = rect;
  }
  return groups.map(rect => rectToClientRect(getBoundingRect(rect)));
}
/**
 * Provides improved positioning for inline reference elements that can span
 * over multiple lines, such as hyperlinks or range selections.
 * @see https://floating-ui.com/docs/inline
 */
const inline = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'inline',
    options,
    async fn(state) {
      const {
        placement,
        elements,
        rects,
        platform,
        strategy
      } = state;
      // A MouseEvent's client{X,Y} coords can be up to 2 pixels off a
      // ClientRect's bounds, despite the event listener being triggered. A
      // padding of 2 seems to handle this issue.
      const {
        padding = 2,
        x,
        y
      } = evaluate(options, state);
      const nativeClientRects = Array.from((await (platform.getClientRects == null ? void 0 : platform.getClientRects(elements.reference))) || []);
      const clientRects = getRectsByLine(nativeClientRects);
      const fallback = rectToClientRect(getBoundingRect(nativeClientRects));
      const paddingObject = getPaddingObject(padding);
      function getBoundingClientRect() {
        // There are two rects and they are disjoined.
        if (clientRects.length === 2 && clientRects[0].left > clientRects[1].right && x != null && y != null) {
          // Find the first rect in which the point is fully inside.
          return clientRects.find(rect => x > rect.left - paddingObject.left && x < rect.right + paddingObject.right && y > rect.top - paddingObject.top && y < rect.bottom + paddingObject.bottom) || fallback;
        }

        // There are 2 or more connected rects.
        if (clientRects.length >= 2) {
          if (getSideAxis(placement) === 'y') {
            const firstRect = clientRects[0];
            const lastRect = clientRects[clientRects.length - 1];
            const isTop = getSide(placement) === 'top';
            const top = firstRect.top;
            const bottom = lastRect.bottom;
            const left = isTop ? firstRect.left : lastRect.left;
            const right = isTop ? firstRect.right : lastRect.right;
            const width = right - left;
            const height = bottom - top;
            return {
              top,
              bottom,
              left,
              right,
              width,
              height,
              x: left,
              y: top
            };
          }
          const isLeftSide = getSide(placement) === 'left';
          const maxRight = max(...clientRects.map(rect => rect.right));
          const minLeft = min(...clientRects.map(rect => rect.left));
          const measureRects = clientRects.filter(rect => isLeftSide ? rect.left === minLeft : rect.right === maxRight);
          const top = measureRects[0].top;
          const bottom = measureRects[measureRects.length - 1].bottom;
          const left = minLeft;
          const right = maxRight;
          const width = right - left;
          const height = bottom - top;
          return {
            top,
            bottom,
            left,
            right,
            width,
            height,
            x: left,
            y: top
          };
        }
        return fallback;
      }
      const resetRects = await platform.getElementRects({
        reference: {
          getBoundingClientRect
        },
        floating: elements.floating,
        strategy
      });
      if (rects.reference.x !== resetRects.reference.x || rects.reference.y !== resetRects.reference.y || rects.reference.width !== resetRects.reference.width || rects.reference.height !== resetRects.reference.height) {
        return {
          reset: {
            rects: resetRects
          }
        };
      }
      return {};
    }
  };
};

// For type backwards-compatibility, the `OffsetOptions` type was also
// Derivable.
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform,
    elements
  } = state;
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
  const side = floating_ui_utils_getSide(placement);
  const alignment = floating_ui_utils_getAlignment(placement);
  const isVertical = floating_ui_utils_getSideAxis(placement) === 'y';
  const mainAxisMulti = ['left', 'top'].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = floating_ui_utils_evaluate(options, state);

  // eslint-disable-next-line prefer-const
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === 'number' ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };
  if (alignment && typeof alignmentAxis === 'number') {
    crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset = function (options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: 'offset',
    options,
    async fn(state) {
      const {
        x,
        y
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: diffCoords
      };
    }
  };
};

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'shift',
    options,
    async fn(state) {
      const {
        x,
        y,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: _ref => {
            let {
              x,
              y
            } = _ref;
            return {
              x,
              y
            };
          }
        },
        ...detectOverflowOptions
      } = floating_ui_utils_evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = floating_ui_utils_getSideAxis(floating_ui_utils_getSide(placement));
      const mainAxis = floating_ui_utils_getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === 'y' ? 'top' : 'left';
        const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
        const min = mainAxisCoord + overflow[minSide];
        const max = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min, mainAxisCoord, max);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === 'y' ? 'top' : 'left';
        const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
        const min = crossAxisCoord + overflow[minSide];
        const max = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min, crossAxisCoord, max);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y
        }
      };
    }
  };
};
/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
const limitShift = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    options,
    fn(state) {
      const {
        x,
        y,
        placement,
        rects,
        middlewareData
      } = state;
      const {
        offset = 0,
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const crossAxis = getSideAxis(placement);
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const rawOffset = evaluate(offset, state);
      const computedOffset = typeof rawOffset === 'number' ? {
        mainAxis: rawOffset,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...rawOffset
      };
      if (checkMainAxis) {
        const len = mainAxis === 'y' ? 'height' : 'width';
        const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
        const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
        if (mainAxisCoord < limitMin) {
          mainAxisCoord = limitMin;
        } else if (mainAxisCoord > limitMax) {
          mainAxisCoord = limitMax;
        }
      }
      if (checkCrossAxis) {
        var _middlewareData$offse, _middlewareData$offse2;
        const len = mainAxis === 'y' ? 'width' : 'height';
        const isOriginSide = ['top', 'left'].includes(getSide(placement));
        const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
        const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
        if (crossAxisCoord < limitMin) {
          crossAxisCoord = limitMin;
        } else if (crossAxisCoord > limitMax) {
          crossAxisCoord = limitMax;
        }
      }
      return {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      };
    }
  };
};

/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'size',
    options,
    async fn(state) {
      const {
        placement,
        rects,
        platform,
        elements
      } = state;
      const {
        apply = () => {},
        ...detectOverflowOptions
      } = floating_ui_utils_evaluate(options, state);
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const side = floating_ui_utils_getSide(placement);
      const alignment = floating_ui_utils_getAlignment(placement);
      const isYAxis = floating_ui_utils_getSideAxis(placement) === 'y';
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === 'top' || side === 'bottom') {
        heightSide = side;
        widthSide = alignment === ((await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating))) ? 'start' : 'end') ? 'left' : 'right';
      } else {
        widthSide = side;
        heightSide = alignment === 'end' ? 'top' : 'bottom';
      }
      const overflowAvailableHeight = height - overflow[heightSide];
      const overflowAvailableWidth = width - overflow[widthSide];
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if (isYAxis) {
        const maximumClippingWidth = width - overflow.left - overflow.right;
        availableWidth = alignment || noShift ? floating_ui_utils_min(overflowAvailableWidth, maximumClippingWidth) : maximumClippingWidth;
      } else {
        const maximumClippingHeight = height - overflow.top - overflow.bottom;
        availableHeight = alignment || noShift ? floating_ui_utils_min(overflowAvailableHeight, maximumClippingHeight) : maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = floating_ui_utils_max(overflow.left, 0);
        const xMax = floating_ui_utils_max(overflow.right, 0);
        const yMin = floating_ui_utils_max(overflow.top, 0);
        const yMax = floating_ui_utils_max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : floating_ui_utils_max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : floating_ui_utils_max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};



;// CONCATENATED MODULE: ./node_modules/@floating-ui/utils/dom/dist/floating-ui.utils.dom.mjs
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || '').toLowerCase();
  }
  // Mocked nodes in testing environments may not be instances of Node. By
  // returning `#document` an infinite loop won't occur.
  // https://github.com/floating-ui/floating-ui/issues/2317
  return '#document';
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null ? void 0 : (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  // Browsers without `ShadowRoot` support.
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = floating_ui_utils_dom_getComputedStyle(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !['inline', 'contents'].includes(display);
}
function isTableElement(element) {
  return ['table', 'td', 'th'].includes(getNodeName(element));
}
function isContainingBlock(element) {
  const webkit = isWebKit();
  const css = floating_ui_utils_dom_getComputedStyle(element);

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  return css.transform !== 'none' || css.perspective !== 'none' || (css.containerType ? css.containerType !== 'normal' : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !webkit && (css.filter ? css.filter !== 'none' : false) || ['transform', 'perspective', 'filter'].some(value => (css.willChange || '').includes(value)) || ['paint', 'layout', 'strict', 'content'].some(value => (css.contain || '').includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else {
      currentNode = getParentNode(currentNode);
    }
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === 'undefined' || !CSS.supports) return false;
  return CSS.supports('-webkit-backdrop-filter', 'none');
}
function isLastTraversableNode(node) {
  return ['html', 'body', '#document'].includes(getNodeName(node));
}
function floating_ui_utils_dom_getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.pageXOffset,
    scrollTop: element.pageYOffset
  };
}
function getParentNode(node) {
  if (getNodeName(node) === 'html') {
    return node;
  }
  const result =
  // Step into the shadow DOM of the parent of a slotted node.
  node.assignedSlot ||
  // DOM Element detected.
  node.parentNode ||
  // ShadowRoot detected.
  isShadowRoot(node) && node.host ||
  // Fallback.
  getDocumentElement(node);
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor));
}



;// CONCATENATED MODULE: ./node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs






function getCssDimensions(element) {
  const css = floating_ui_utils_dom_getComputedStyle(element);
  // In testing environments, the `width` and `height` properties are empty
  // strings for SVG elements, returning NaN. Fallback to `0` in this case.
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}

function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}

function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;

  // 0, NaN, or Infinity should always fallback to 1.

  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}

const noOffsets = /*#__PURE__*/createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}

function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentIFrame = win.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== win) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = floating_ui_utils_dom_getComputedStyle(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentIFrame = getWindow(currentIFrame).frameElement;
    }
  }
  return floating_ui_utils_rectToClientRect({
    width,
    height,
    x,
    y
  });
}

function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  if (offsetParent === documentElement) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== 'fixed') {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}

function getClientRects(element) {
  return Array.from(element.getClientRects());
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}

// Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable.
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = floating_ui_utils_max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = floating_ui_utils_max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (floating_ui_utils_dom_getComputedStyle(body).direction === 'rtl') {
    x += floating_ui_utils_max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}

// Returns the inner client rect, subtracting scrollbars if present.
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === 'viewport') {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === 'document') {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return floating_ui_utils_rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return floating_ui_utils_dom_getComputedStyle(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
}

// A "clipping ancestor" is an `overflow` element with the characteristic of
// clipping (or hiding) child elements. This returns all clipping ancestors
// of the given element up the tree.
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element).filter(el => isElement(el) && getNodeName(el) !== 'body');
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = floating_ui_utils_dom_getComputedStyle(element).position === 'fixed';
  let currentNode = elementIsFixed ? getParentNode(element) : element;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = floating_ui_utils_dom_getComputedStyle(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && ['absolute', 'fixed'].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      // Drop non-containing blocks.
      result = result.filter(ancestor => ancestor !== currentNode);
    } else {
      // Record last containing block for next iteration.
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}

// Gets the maximum area that the element is visible in due to any number of
// clipping ancestors.
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === 'clippingAncestors' ? getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = floating_ui_utils_max(rect.top, accRect.top);
    accRect.right = floating_ui_utils_min(rect.right, accRect.right);
    accRect.bottom = floating_ui_utils_min(rect.bottom, accRect.bottom);
    accRect.left = floating_ui_utils_max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}

function getDimensions(element) {
  return getCssDimensions(element);
}

function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === 'fixed';
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || floating_ui_utils_dom_getComputedStyle(element).position === 'fixed') {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  return element.offsetParent;
}

// Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.
function getOffsetParent(element, polyfill) {
  const window = getWindow(element);
  if (!isHTMLElement(element)) {
    return window;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && floating_ui_utils_dom_getComputedStyle(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && floating_ui_utils_dom_getComputedStyle(offsetParent).position === 'static' && !isContainingBlock(offsetParent))) {
    return window;
  }
  return offsetParent || getContainingBlock(element) || window;
}

const getElementRects = async function (_ref) {
  let {
    reference,
    floating,
    strategy
  } = _ref;
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  return {
    reference: getRectRelativeToOffsetParent(reference, await getOffsetParentFn(floating), strategy),
    floating: {
      x: 0,
      y: 0,
      ...(await getDimensionsFn(floating))
    }
  };
};

function isRTL(element) {
  return floating_ui_utils_dom_getComputedStyle(element).direction === 'rtl';
}

const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement: getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement: isElement,
  isRTL
};

// https://samthor.au/2021/observing-dom/
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    clearTimeout(timeoutId);
    io && io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const {
      left,
      top,
      width,
      height
    } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: floating_ui_utils_max(0, floating_ui_utils_min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 100);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }

    // Older browsers don't support a `document` as the root and will throw an
    // error.
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}

/**
 * Automatically updates the position of the floating element when necessary.
 * Should only be called when the floating element is mounted on the DOM or
 * visible on the screen.
 * @returns cleanup function that should be invoked when the floating element is
 * removed from the DOM or hidden from the screen.
 * @see https://floating-ui.com/docs/autoUpdate
 */
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === 'function',
    layoutShift = typeof IntersectionObserver === 'function',
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...(referenceEl ? getOverflowAncestors(referenceEl) : []), ...getOverflowAncestors(floating)] : [];
  ancestors.forEach(ancestor => {
    ancestorScroll && ancestor.addEventListener('scroll', update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener('resize', update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver(_ref => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        // Prevent update loops when using the `size` middleware.
        // https://github.com/floating-ui/floating-ui/issues/1740
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          resizeObserver && resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    ancestors.forEach(ancestor => {
      ancestorScroll && ancestor.removeEventListener('scroll', update);
      ancestorResize && ancestor.removeEventListener('resize', update);
    });
    cleanupIo && cleanupIo();
    resizeObserver && resizeObserver.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a reference element when it is given a certain CSS positioning
 * strategy.
 */
const floating_ui_dom_computePosition = (reference, floating, options) => {
  // This caches the expensive `getClippingElementAncestors` function so that
  // multiple lifecycle resets re-use the same result. It only lives for a
  // single call. If other functions become expensive, we can add them as well.
  const cache = new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};



;// CONCATENATED MODULE: ./node_modules/@spectrum-web-components/overlay/src/ActiveOverlay.js
var A=Object.defineProperty;var R=Object.getOwnPropertyDescriptor;var p=(s,a,t,e)=>{for(var i=e>1?void 0:e?R(a,t):a,o=s.length-1,n;o>=0;o--)(n=s[o])&&(i=(e?n(a,t,i):n(i))||i);return e&&i&&A(a,t,i),i};const P={initial:"idle",states:{idle:{on:{active:"active"}},active:{on:{hiding:"hiding",idle:"idle"}},hiding:{on:{dispose:"dispose"}},dispose:{on:{disposed:"disposed"}},disposed:{on:{}}}},T=(s,a)=>s?a&&P.states[s].on[a]||s:P.initial,U=s=>{var t;return(t={left:["right","bottom","top"],"left-start":["right-start","bottom","top"],"left-end":["right-end","bottom","top"],right:["left","bottom","top"],"right-start":["left-start","bottom","top"],"right-end":["left-end","bottom","top"],top:["bottom","left","right"],"top-start":["bottom-start","left","right"],"top-end":["bottom-end","left","right"],bottom:["top","left","right"],"bottom-start":["top-start","left","right"],"bottom-end":["top-end","left","right"]}[s])!=null?t:[s]},u=class extends Base/* SpectrumElement */.o{constructor(){super();this.contentAnimationPromise=Promise.resolve(!0);this.resolveContentAnimationPromise=()=>{};this._state=T();this.animating=!1;this.theme={};this.tabbingAway=!1;this.offset=6;this.skidding=0;this.interaction="hover";this.positionAnimationFrame=0;this.willNotifyClosed=!1;this.isConstrained=!1;this.updateOverlayPosition=()=>{if(this.interaction!=="modal"&&this.cleanup){this.dispatchEvent(new Event("close"));return}this.setOverlayPosition()};this.resetOverlayPosition=()=>{this.style.removeProperty("max-height"),this.style.removeProperty("height"),this.initialHeight=void 0,this.isConstrained=!1,this.offsetHeight,this.setOverlayPosition()};this.setOverlayPosition=async()=>{if(!this.placement||this.placement==="none")return;await(document.fonts?document.fonts.ready:Promise.resolve());function t(l){const r=window.devicePixelRatio||1;return Math.round(l*r)/r||-1e4}const e=8,i=100,o=this.virtualTrigger?flip({padding:e,fallbackPlacements:U(this.placement)}):flip({padding:e}),n=[offset({mainAxis:this.offset,crossAxis:this.skidding}),shift({padding:e}),o,size({padding:e,apply:({availableWidth:l,availableHeight:r,rects:{floating:E}})=>{const f=Math.max(i,Math.floor(r)),m=E.height;this.initialHeight=!this.isConstrained&&!this.virtualTrigger?m:this.initialHeight||m,this.isConstrained=m<this.initialHeight||f<=m;const g=this.isConstrained?`${f}px`:"";Object.assign(this.style,{maxWidth:`${Math.floor(l)}px`,maxHeight:g,height:g})}})];this.overlayContentTip&&n.push(arrow({element:this.overlayContentTip}));const{x:O,y:w,placement:d,middlewareData:v}=await floating_ui_dom_computePosition(this.virtualTrigger||this.trigger,this,{placement:this.placement,middleware:n,strategy:"fixed"});if(Object.assign(this.style,{top:"0px",left:"0px",transform:`translate(${t(O)}px, ${t(w)}px)`}),d!==this.getAttribute("actual-placement")&&(this.setAttribute("actual-placement",d),this.overlayContent.setAttribute("placement",d)),this.overlayContentTip&&v.arrow){const{x:l,y:r}=v.arrow;Object.assign(this.overlayContentTip.style,{left:l!=null?`${t(l)}px`:"",top:r!=null?`${t(r)}px`:"",right:"",bottom:""})}};this.handleInlineTriggerKeydown=t=>{const{code:e,shiftKey:i}=t;if(e==="Tab"){if(i){this.tabbingAway=!0,this.dispatchEvent(new Event("close"));return}t.stopPropagation(),t.preventDefault(),this.focus()}};this.stealOverlayContentPromise=Promise.resolve();this.stealOverlayContentPromise=new Promise(t=>this.stealOverlayContentResolver=t)}get state(){return this._state}set state(t){const e=T(this.state,t);e!==this.state&&(this._state=e,this.state==="active"||this.state==="hiding"?this.setAttribute("state",this.state):this.removeAttribute("state"))}async focus(){const t=(0,first_focusable_in/* firstFocusableIn */.i)(this);if(t){t.updateComplete&&await t.updateComplete;const e=this.getRootNode().activeElement;(e===this||!this.contains(e))&&t.focus()}else super.focus();this.removeAttribute("tabindex")}get hasTheme(){return!!this.theme.color||!!this.theme.scale||!!this.theme.lang}static get styles(){return[active_overlay_css]}get hasModalRoot(){return!!this._modalRoot}feature(){this.contains(document.activeElement)||(this.tabIndex=-1);const t=parentOverlayOf(this.trigger);t&&t.slot==="open"&&(this._modalRoot=t._modalRoot||t),(this.interaction==="modal"||this._modalRoot)&&(this.slot="open",this.interaction==="modal"&&this.setAttribute("aria-modal","true"),this._modalRoot&&(t==null||t.feature()))}obscure(t){if(this.slot&&t==="modal"){if(this.removeAttribute("slot"),this.removeAttribute("aria-modal"),this.interaction!=="modal"){const e=parentOverlayOf(this.trigger);return this._modalRoot=e==null?void 0:e.obscure(t),this._modalRoot}return this}}async willUpdate(){this.hasUpdated||!this.overlayContent||!this.trigger||(this.stealOverlayContent(this.overlayContent),this.state="active",this.feature(),this.placement&&this.placement!=="none"&&(await this.updateOverlayPosition(),document.addEventListener("sp-update-overlays",this.resetOverlayPosition)),this.placement&&this.placement!=="none"&&(this.contentAnimationPromise=this.applyContentAnimation("sp-overlay-fade-in")))}async openCallback(t){await this.updateComplete,this.receivesFocus&&await this.focus(),await t(),this.trigger.dispatchEvent(new CustomEvent("sp-opened",{bubbles:!0,composed:!0,cancelable:!0,detail:{interaction:this.interaction}}))}open(t){this.extractDetail(t)}extractDetail(t){this.overlayContent=t.content,this.overlayContentTip=t.contentTip,this.trigger=t.trigger,this.virtualTrigger=t.virtualTrigger,this.placement=t.placement,this.offset=t.offset,this.skidding=t.skidding||0,this.interaction=t.interaction,this.theme=t.theme,this.receivesFocus=t.receivesFocus,this.root=t.root}dispose(){this.state==="dispose"&&(this.timeout&&(clearTimeout(this.timeout),delete this.timeout),this.trigger.removeEventListener("keydown",this.handleInlineTriggerKeydown),this.returnOverlayContent(),this.state="disposed",this.willNotifyClosed&&(this.overlayContent.dispatchEvent(new Event("sp-overlay-closed")),this.willNotifyClosed=!1),this.cleanup&&this.cleanup())}stealOverlayContent(t){this.originalPlacement=t.getAttribute("placement"),this.restoreContent=(0,reparent_children/* reparentChildren */.G)([t],this,{position:"beforeend",prepareCallback:e=>{const i=e.slot,o=e.placement;return e.removeAttribute("slot"),n=>{n.slot=i,n.placement=o}}}),this.stealOverlayContentResolver()}returnOverlayContent(){if(!this.restoreContent)return;const[t]=this.restoreContent();this.restoreContent=void 0,this.willNotifyClosed=!0,this.originalPlacement&&(t.setAttribute("placement",this.originalPlacement),delete this.originalPlacement)}async placeOverlay(){!this.placement||this.placement==="none"||(this.cleanup=autoUpdate(this.virtualTrigger||this.trigger,this,this.updateOverlayPosition,{elementResize:!1}))}async hide(t=!0){this.state==="active"&&(this.state="hiding",t&&await this.applyContentAnimation("sp-overlay-fade-out"),this.state="dispose")}schedulePositionUpdate(){cancelAnimationFrame(this.positionAnimationFrame),this.positionAnimationFrame=requestAnimationFrame(()=>{this.cleanup?this.updateOverlayPosition():this.placeOverlay()})}onSlotChange(){this.schedulePositionUpdate()}applyContentAnimation(t){return this.placement==="none"?Promise.resolve(!0):(this.resolveContentAnimationPromise(),new Promise(e=>{this.resolveContentAnimationPromise=()=>{e(!1)};const i=this.shadowRoot.querySelector("#contents"),o=n=>{t===n.animationName&&(i.removeEventListener("animationend",o),i.removeEventListener("animationcancel",o),this.animating=!1,e(n.type==="animationcancel"))};i.addEventListener("animationend",o),i.addEventListener("animationcancel",o),i.style.animationName=t,this.animating=!0}))}renderTheme(t){const{color:e,scale:i,lang:o,theme:n}=this.theme;return (0,lit/* html */.dy)`
            <sp-theme
                theme=${(0,if_defined/* ifDefined */.o)(n)}
                color=${(0,if_defined/* ifDefined */.o)(e)}
                scale=${(0,if_defined/* ifDefined */.o)(i)}
                lang=${(0,if_defined/* ifDefined */.o)(o)}
                part="theme"
            >
                ${t}
            </sp-theme>
        `}render(){const t=(0,lit/* html */.dy)`
            <div id="contents">
                <slot @slotchange=${this.onSlotChange}></slot>
            </div>
        `;return this.hasTheme?this.renderTheme(t):t}static create(t){const e=new u;return t.content&&e.open(t),e}async getUpdateComplete(){const t=[super.getUpdateComplete(),this.stealOverlayContentPromise];t.push(this.contentAnimationPromise),typeof this.overlayContent.updateComplete!="undefined"&&t.push(this.overlayContent.updateComplete);const[e]=await Promise.all(t);return e}disconnectedCallback(){document.removeEventListener("sp-update-overlays",this.resetOverlayPosition),super.disconnectedCallback()}};let ActiveOverlay=u;p([(0,decorators/* property */.Cb)()],ActiveOverlay.prototype,"_state",2),p([(0,decorators/* property */.Cb)({reflect:!0,type:Boolean})],ActiveOverlay.prototype,"animating",2),p([(0,decorators/* property */.Cb)({reflect:!0})],ActiveOverlay.prototype,"placement",2),p([(0,decorators/* property */.Cb)({attribute:!1})],ActiveOverlay.prototype,"theme",2),p([(0,decorators/* property */.Cb)({attribute:!1})],ActiveOverlay.prototype,"receivesFocus",2);
//# sourceMappingURL=ActiveOverlay.js.map

;// CONCATENATED MODULE: ./node_modules/@spectrum-web-components/overlay/src/overlay-timer.js
const t=1e3,s=1e3;class OverlayTimer{constructor(e={}){this.warmUpDelay=1e3;this.coolDownDelay=1e3;this.isWarm=!1;this.timeout=0;Object.assign(this,e)}async openTimer(e){if(this.cancelCooldownTimer(),!this.component||e!==this.component)return this.component&&(this.close(this.component),this.cancelCooldownTimer()),this.component=e,this.isWarm?!1:(this.promise=new Promise(o=>{this.resolve=o,this.timeout=window.setTimeout(()=>{this.resolve&&(this.resolve(!1),this.isWarm=!0)},this.warmUpDelay)}),this.promise);if(this.promise)return this.promise;throw new Error("Inconsistent state")}close(e){this.component&&this.component===e&&(this.resetCooldownTimer(),this.timeout>0&&(clearTimeout(this.timeout),this.timeout=0),this.resolve&&(this.resolve(!0),delete this.resolve),delete this.promise,delete this.component)}resetCooldownTimer(){this.isWarm&&(this.cooldownTimeout&&window.clearTimeout(this.cooldownTimeout),this.cooldownTimeout=window.setTimeout(()=>{this.isWarm=!1,delete this.cooldownTimeout},this.coolDownDelay))}cancelCooldownTimer(){this.cooldownTimeout&&window.clearTimeout(this.cooldownTimeout),delete this.cooldownTimeout}}
//# sourceMappingURL=overlay-timer.js.map

// EXTERNAL MODULE: ./node_modules/@spectrum-web-components/base/src/define-element.js
var define_element = __webpack_require__(1200);
;// CONCATENATED MODULE: ./node_modules/@spectrum-web-components/overlay/active-overlay.js
(0,define_element/* defineElement */.N)("active-overlay",ActiveOverlay);
//# sourceMappingURL=active-overlay.js.map

;// CONCATENATED MODULE: ./node_modules/@spectrum-web-components/shared/src/get-deep-element-from-point.js
const getDeepElementFromPoint=(o,t)=>{let e=document.elementFromPoint(o,t);for(;e!=null&&e.shadowRoot;){const n=e.shadowRoot.elementFromPoint(o,t);if(!n||n===e)break;e=n}return e};
//# sourceMappingURL=get-deep-element-from-point.js.map

;// CONCATENATED MODULE: ./node_modules/@spectrum-web-components/overlay/src/overlay-stack.js
function C(s){return s.button===0}function O(s){return!!(s.metaKey||s.altKey||s.ctrlKey||s.shiftKey)}function h(){return new Promise(s=>requestAnimationFrame(()=>s()))}class OverlayStack{constructor(){this.overlays=[];this.preventMouseRootClose=!1;this.root=document.body;this.handlingResize=!1;this.overlayTimer=new OverlayTimer;this.canTabTrap=!0;this.trappingInited=!1;this._eventsAreBound=!1;this._bodyMarginsApplied=!1;this.forwardContextmenuEvent=async e=>{var o;const t=this.overlays[this.overlays.length-1];!this.trappingInited||t.interaction!=="modal"||e.target!==this.overlayHolder||(e.stopPropagation(),e.preventDefault(),await this.closeTopOverlay(),(o=getDeepElementFromPoint(e.clientX,e.clientY))==null||o.dispatchEvent(new MouseEvent("contextmenu",e)))};this.handleOverlayClose=e=>{const{root:t}=e;t&&this.closeOverlaysForRoot(t)};this.handleMouseCapture=e=>{const t=this.topOverlay;if(!e.target||!t||!t.overlayContent||O(e)||!C(e)){this.preventMouseRootClose=!0;return}if(e.target instanceof Node){if(e.composedPath().indexOf(t.overlayContent)>=0){this.preventMouseRootClose=!0;return}this.preventMouseRootClose=!1}};this._doesNotCloseOnFirstClick=!1;this.handleMouse=e=>{var n;if(this._doesNotCloseOnFirstClick){this._doesNotCloseOnFirstClick=!1;return}if(this.preventMouseRootClose||e.defaultPrevented)return;const t=[];let o=this.overlays.length;for(;o&&t.length===0;){o-=1;const a=this.overlays[o],l=e.composedPath();(!l.includes(a.trigger)||a.interaction!=="hover")&&!l.includes(a.overlayContent)&&t.push(a)}let r=(n=this.topOverlay)==null?void 0:n.root,i=parentOverlayOf(r);for(;r&&i;)t.push(i),i=parentOverlayOf(r),r=i==null?void 0:i.root;i&&t.push(i),t.forEach(a=>this.hideAndCloseOverlay(a))};this.handleKeydown=e=>{e.code==="Escape"&&this.closeTopOverlay()};this.handleResize=()=>{this.handlingResize||(this.handlingResize=!0,requestAnimationFrame(async()=>{const e=this.overlays.map(t=>t.updateOverlayPosition());await Promise.all(e),this.handlingResize=!1}))};this.initTabTrapping()}initTabTrapping(){if(document.readyState==="loading"){document.addEventListener("readystatechange",()=>{this.initTabTrapping()},{once:!0});return}if(this.trappingInited)return;if(this.document.body.shadowRoot){this.canTabTrap=!1;return}if(this.document.body.attachShadow({mode:"open"}),!this.document.body.shadowRoot)return;this.trappingInited=!0;const e=this.document.body.shadowRoot;e.innerHTML=`
            <style>
            :host {
                position: relative;
            }
            #actual {
                position: relative;
                height: calc(100% - var(--swc-body-margins-block, 0px));
                z-index: 0;
                min-height: calc(100vh - var(--swc-body-margins-block, 0px));
                min-height: calc(100dvh - var(--swc-body-margins-block, 0px));
            }
            #holder {
                display: none;
                align-items: center;
                justify-content: center;
                flex-flow: column;
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
            }
            [name="open"]::slotted(*) {
                pointer-events: all;
            }
            #actual[aria-hidden] + #holder {
                display: flex;
            }
            </style>
            <div id="actual"><slot></slot></div>
            <div id="holder"><slot name="open"></slot></div>
        `,this.tabTrapper=e.querySelector("#actual"),this.overlayHolder=e.querySelector("#holder"),this.tabTrapper.attachShadow({mode:"open"}),this.tabTrapper.shadowRoot&&(this.tabTrapper.shadowRoot.innerHTML="<slot></slot>"),this.overlayHolder.addEventListener("contextmenu",this.forwardContextmenuEvent,!0),requestAnimationFrame(()=>{this.applyBodyMargins(),new ResizeObserver(()=>{this.applyBodyMargins()}).observe(document.body)})}applyBodyMargins(){const{marginLeft:e,marginRight:t,marginTop:o,marginBottom:r}=getComputedStyle(document.body),i=parseFloat(e)===0&&parseFloat(t)===0&&parseFloat(o)===0&&parseFloat(r)===0;i&&!this._bodyMarginsApplied||(this.tabTrapper.style.setProperty("--swc-body-margins-inline",`calc(${e} + ${t})`),this.tabTrapper.style.setProperty("--swc-body-margins-block",`calc(${o} + ${r})`),this._bodyMarginsApplied=!i)}startTabTrapping(){this.initTabTrapping(),this.canTabTrap&&(this.tabTrapper.tabIndex=-1,this.tabTrapper.setAttribute("aria-hidden","true"))}stopTabTrapping(){!this.canTabTrap||!this.trappingInited||(this.tabTrapper.removeAttribute("tabindex"),this.tabTrapper.removeAttribute("aria-hidden"))}get document(){return this.root.ownerDocument||document}get topOverlay(){return this.overlays.slice(-1)[0]}findOverlayForContent(e){for(const t of this.overlays)if(e===t.overlayContent)return t}addEventListeners(){this._eventsAreBound||(this._eventsAreBound=!0,this.document.addEventListener("click",this.handleMouseCapture,!0),this.document.addEventListener("click",this.handleMouse),this.document.addEventListener("keydown",this.handleKeydown),this.document.addEventListener("sp-overlay-close",this.handleOverlayClose),window.addEventListener("resize",this.handleResize))}isClickOverlayActiveForTrigger(e){return this.overlays.some(t=>e===t.trigger&&t.interaction==="click")}async openOverlay(e){if(this.addEventListeners(),this.findOverlayForContent(e.content))return!1;e.notImmediatelyClosable&&(this._doesNotCloseOnFirstClick=!0),e.interaction==="modal"&&this.startTabTrapping();const t=e.content,{trigger:o}=e;if(t.overlayWillOpenCallback&&t.overlayWillOpenCallback({trigger:o}),e.delayed){const a=[this.overlayTimer.openTimer(e.content)];e.abortPromise&&a.push(e.abortPromise);const l=await Promise.race(a);if(l)return t.overlayOpenCancelledCallback&&t.overlayOpenCancelledCallback({trigger:o}),l}if(e.root&&this.closeOverlaysForRoot(e.root),e.interaction==="click")this.closeAllHoverOverlays();else if(e.interaction==="hover"&&this.isClickOverlayActiveForTrigger(e.trigger))return!0;const r=ActiveOverlay.create(e);this.overlays.length&&this.overlays[this.overlays.length-1].obscure(r.interaction),document.body.appendChild(r),await h(),this.overlays.push(r),await r.updateComplete,this.addOverlayEventListeners(r),typeof t.open!="undefined"&&(await h(),t.open=!0);let i=()=>{};if(t.overlayOpenCallback){const{trigger:n}=r,{overlayOpenCallback:a}=t;i=async()=>await a({trigger:n})}return await r.openCallback(i),!1}addOverlayEventListeners(e){switch(e.addEventListener("close",()=>{this.hideAndCloseOverlay(e,!0)}),e.interaction){case"replace":this.addReplaceOverlayEventListeners(e);break;case"inline":this.addInlineOverlayEventListeners(e);break}}addReplaceOverlayEventListeners(e){e.addEventListener("keydown",t=>{const{code:o}=t;o==="Tab"&&(t.stopPropagation(),this.closeOverlay(e.overlayContent),e.tabbingAway=!0,e.trigger.focus(),e.trigger.dispatchEvent(new KeyboardEvent("keydown",t)))})}addInlineOverlayEventListeners(e){e.trigger.addEventListener("keydown",e.handleInlineTriggerKeydown),e.addEventListener("keydown",t=>{const{code:o,shiftKey:r}=t;if(o!=="Tab")return;if(e.tabbingAway=!0,r){const n=document.createElement("span");n.tabIndex=-1,e.trigger.hasAttribute("slot")&&(n.slot=e.trigger.slot),e.trigger.insertAdjacentElement("afterend",n),n.focus(),n.remove();return}t.stopPropagation();const i=e.trigger;typeof i.open!="undefined"&&(i.open=!1),this.closeOverlay(e.overlayContent),e.trigger.focus()})}closeOverlay(e){this.overlayTimer.close(e),requestAnimationFrame(()=>{const t=this.findOverlayForContent(e),o=[t];o.push(...findOverlaysRootedInOverlay(t,this.overlays)),o.forEach(r=>this.hideAndCloseOverlay(r))})}closeAllHoverOverlays(){for(const e of this.overlays)e.interaction==="hover"&&this.hideAndCloseOverlay(e,!1)}closeOverlaysForRoot(e){const t=[];for(const o of this.overlays)o.root&&o.root===e&&(t.push(o),t.push(...findOverlaysRootedInOverlay(o,this.overlays)));t.forEach(o=>this.hideAndCloseOverlay(o,!0,!0))}async manageFocusAfterCloseWhenOverlaysRemain(e,t){const o=this.overlays[this.overlays.length-1];if(o.feature(),o.interaction==="modal"||o.hasModalRoot){if(e)return;await(t||o).focus()}else this.stopTabTrapping()}manageFocusAfterCloseWhenLastOverlay(e){this.stopTabTrapping();const t=e.interaction==="modal",o=e.receivesFocus==="auto",r=e.interaction==="replace",i=e.interaction==="inline",n=(r||i)&&!e.tabbingAway;if(e.tabbingAway=!1,!t&&!o&&!n)return;const l=e.overlayContent.getRootNode().activeElement;let d,c;const u=()=>e.overlayContent.contains(l),y=()=>(d=e.trigger.getRootNode(),c=d.activeElement,d.contains(c)),m=()=>d.host&&d.host===c;(t||u()||y()||m())&&e.trigger.focus()}async hideAndCloseOverlay(e,t,o){if(!e)return;const r=e.overlayContent;if(typeof r.overlayWillCloseCallback!="undefined"){const{trigger:n}=e;if(r.overlayWillCloseCallback({trigger:n}))return}if(await e.hide(t),typeof r.open!="undefined"&&(r.open=!1),r.overlayCloseCallback){const{trigger:n}=e;await r.overlayCloseCallback({trigger:n})}if(e.state!="dispose")return;const i=this.overlays.indexOf(e);i>=0&&this.overlays.splice(i,1),this.overlays.length?await this.manageFocusAfterCloseWhenOverlaysRemain(o||e.interaction==="hover",e.trigger):this.manageFocusAfterCloseWhenLastOverlay(e),await e.updateComplete,e.remove(),e.dispose(),e.trigger.dispatchEvent(new CustomEvent("sp-closed",{bubbles:!0,composed:!0,cancelable:!0,detail:{interaction:e.interaction}}))}closeTopOverlay(){return this.hideAndCloseOverlay(this.topOverlay,!0)}}
//# sourceMappingURL=overlay-stack.js.map

;// CONCATENATED MODULE: ./node_modules/@spectrum-web-components/overlay/src/overlay.js
const n=class{constructor(e,t,r){this.isOpen=!1;this.owner=e,this.overlayElement=r,this.interaction=t}static async open(e,t,r,o){const a=new n(e,t,r);return await a.open(o),()=>{a.close()}}static update(){const e=new CustomEvent("sp-update-overlays",{bubbles:!0,composed:!0,cancelable:!0});document.dispatchEvent(e)}async open({abortPromise:e,delayed:t,offset:r=0,placement:o="top",receivesFocus:a,notImmediatelyClosable:l,virtualTrigger:c,root:u}){if(this.isOpen)return!0;t===void 0&&(t=this.overlayElement.hasAttribute("delayed"));const s={color:void 0,scale:void 0,lang:void 0,theme:void 0},p=new CustomEvent("sp-query-theme",{bubbles:!0,composed:!0,detail:s,cancelable:!0});this.owner.dispatchEvent(p);const i={},m=new CustomEvent("sp-overlay-query",{bubbles:!0,composed:!0,detail:i,cancelable:!0});return this.overlayElement.dispatchEvent(m),await n.overlayStack.openOverlay({abortPromise:e,content:this.overlayElement,contentTip:i.overlayContentTipElement,delayed:t,offset:r,placement:o,trigger:this.owner,interaction:this.interaction,theme:s,receivesFocus:a,root:u,notImmediatelyClosable:l,virtualTrigger:c,...i}),this.isOpen=!0,!0}close(){n.overlayStack.closeOverlay(this.overlayElement)}};let Overlay=n;Overlay.overlayStack=new OverlayStack;
//# sourceMappingURL=overlay.js.map


/***/ })

}]);
//# sourceMappingURL=238.bundle.js.map