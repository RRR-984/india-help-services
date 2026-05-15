import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, b as useComposedRefs, d as cn, u as useLanguage, B as Button, X, a as useNavigate, e as useSearch } from "./index-DNcnJBsr.js";
import { m as motion, B as Badge } from "./badge-szpuQhX_.js";
import { c as clamp, S as Select, a as SelectTrigger, b as SelectValue, d as SelectContent, e as SelectItem, I as Input } from "./input-LiZhWAs2.js";
import { S as Skeleton } from "./skeleton-CYZiRy75.js";
import { u as useControllableState, c as composeEventHandlers, P as Primitive, a as createCollection, b as useDirection, d as useSize, e as createContextScope, f as usePrevious } from "./index-CF8YMB3f.js";
import { S as Switch } from "./switch-CHCTPaek.js";
import { I as INDIAN_STATES } from "./backend-api-B2Sc0xPK.js";
import { B as BadgeCheck } from "./StarRating-DYEcnFL7.js";
import { a as Search, S as ServiceCard } from "./ServiceCard-2OeuIN0g.js";
import { u as useCategories, e as useProviders } from "./use-api-Dj0wz_nq.js";
import { S as Star } from "./star-D8GCJbR8.js";
import { C as ChevronLeft } from "./chevron-left-DB8e5RrP.js";
import { C as ChevronRight } from "./chevron-right-D_Vxr1q2.js";
import "./index-hdPYc3Da.js";
import "./chevron-down-HilyGg4K.js";
import "./avatar-Cz0z8-kq.js";
import "./card-DItjgxJ4.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m3 16 4 4 4-4", key: "1co6wj" }],
  ["path", { d: "M7 20V4", key: "1yoxec" }],
  ["path", { d: "M20 8h-5", key: "1vsyxs" }],
  ["path", { d: "M15 10V6.5a2.5 2.5 0 0 1 5 0V10", key: "ag13bf" }],
  ["path", { d: "M15 14h5l-5 6h5", key: "ur5jdg" }]
];
const ArrowDownAZ = createLucideIcon("arrow-down-a-z", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
  ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1", key: "6d4xhi" }],
  ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }]
];
const LayoutGrid = createLucideIcon("layout-grid", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
var PAGE_KEYS = ["PageUp", "PageDown"];
var ARROW_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
var BACK_KEYS = {
  "from-left": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"],
  "from-bottom": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-top": ["Home", "PageDown", "ArrowUp", "ArrowLeft"]
};
var SLIDER_NAME = "Slider";
var [Collection, useCollection, createCollectionScope] = createCollection(SLIDER_NAME);
var [createSliderContext] = createContextScope(SLIDER_NAME, [
  createCollectionScope
]);
var [SliderProvider, useSliderContext] = createSliderContext(SLIDER_NAME);
var Slider$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      name,
      min = 0,
      max = 100,
      step = 1,
      orientation = "horizontal",
      disabled = false,
      minStepsBetweenThumbs = 0,
      defaultValue = [min],
      value,
      onValueChange = () => {
      },
      onValueCommit = () => {
      },
      inverted = false,
      form,
      ...sliderProps
    } = props;
    const thumbRefs = reactExports.useRef(/* @__PURE__ */ new Set());
    const valueIndexToChangeRef = reactExports.useRef(0);
    const isHorizontal = orientation === "horizontal";
    const SliderOrientation = isHorizontal ? SliderHorizontal : SliderVertical;
    const [values = [], setValues] = useControllableState({
      prop: value,
      defaultProp: defaultValue,
      onChange: (value2) => {
        var _a;
        const thumbs = [...thumbRefs.current];
        (_a = thumbs[valueIndexToChangeRef.current]) == null ? void 0 : _a.focus();
        onValueChange(value2);
      }
    });
    const valuesBeforeSlideStartRef = reactExports.useRef(values);
    function handleSlideStart(value2) {
      const closestIndex = getClosestValueIndex(values, value2);
      updateValues(value2, closestIndex);
    }
    function handleSlideMove(value2) {
      updateValues(value2, valueIndexToChangeRef.current);
    }
    function handleSlideEnd() {
      const prevValue = valuesBeforeSlideStartRef.current[valueIndexToChangeRef.current];
      const nextValue = values[valueIndexToChangeRef.current];
      const hasChanged = nextValue !== prevValue;
      if (hasChanged) onValueCommit(values);
    }
    function updateValues(value2, atIndex, { commit } = { commit: false }) {
      const decimalCount = getDecimalCount(step);
      const snapToStep = roundValue(Math.round((value2 - min) / step) * step + min, decimalCount);
      const nextValue = clamp(snapToStep, [min, max]);
      setValues((prevValues = []) => {
        const nextValues = getNextSortedValues(prevValues, nextValue, atIndex);
        if (hasMinStepsBetweenValues(nextValues, minStepsBetweenThumbs * step)) {
          valueIndexToChangeRef.current = nextValues.indexOf(nextValue);
          const hasChanged = String(nextValues) !== String(prevValues);
          if (hasChanged && commit) onValueCommit(nextValues);
          return hasChanged ? nextValues : prevValues;
        } else {
          return prevValues;
        }
      });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      SliderProvider,
      {
        scope: props.__scopeSlider,
        name,
        disabled,
        min,
        max,
        valueIndexToChangeRef,
        thumbs: thumbRefs.current,
        values,
        orientation,
        form,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeSlider, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeSlider, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          SliderOrientation,
          {
            "aria-disabled": disabled,
            "data-disabled": disabled ? "" : void 0,
            ...sliderProps,
            ref: forwardedRef,
            onPointerDown: composeEventHandlers(sliderProps.onPointerDown, () => {
              if (!disabled) valuesBeforeSlideStartRef.current = values;
            }),
            min,
            max,
            inverted,
            onSlideStart: disabled ? void 0 : handleSlideStart,
            onSlideMove: disabled ? void 0 : handleSlideMove,
            onSlideEnd: disabled ? void 0 : handleSlideEnd,
            onHomeKeyDown: () => !disabled && updateValues(min, 0, { commit: true }),
            onEndKeyDown: () => !disabled && updateValues(max, values.length - 1, { commit: true }),
            onStepKeyDown: ({ event, direction: stepDirection }) => {
              if (!disabled) {
                const isPageKey = PAGE_KEYS.includes(event.key);
                const isSkipKey = isPageKey || event.shiftKey && ARROW_KEYS.includes(event.key);
                const multiplier = isSkipKey ? 10 : 1;
                const atIndex = valueIndexToChangeRef.current;
                const value2 = values[atIndex];
                const stepInDirection = step * multiplier * stepDirection;
                updateValues(value2 + stepInDirection, atIndex, { commit: true });
              }
            }
          }
        ) }) })
      }
    );
  }
);
Slider$1.displayName = SLIDER_NAME;
var [SliderOrientationProvider, useSliderOrientationContext] = createSliderContext(SLIDER_NAME, {
  startEdge: "left",
  endEdge: "right",
  size: "width",
  direction: 1
});
var SliderHorizontal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      min,
      max,
      dir,
      inverted,
      onSlideStart,
      onSlideMove,
      onSlideEnd,
      onStepKeyDown,
      ...sliderProps
    } = props;
    const [slider, setSlider] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setSlider(node));
    const rectRef = reactExports.useRef(void 0);
    const direction = useDirection(dir);
    const isDirectionLTR = direction === "ltr";
    const isSlidingFromLeft = isDirectionLTR && !inverted || !isDirectionLTR && inverted;
    function getValueFromPointer(pointerPosition) {
      const rect = rectRef.current || slider.getBoundingClientRect();
      const input = [0, rect.width];
      const output = isSlidingFromLeft ? [min, max] : [max, min];
      const value = linearScale(input, output);
      rectRef.current = rect;
      return value(pointerPosition - rect.left);
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      SliderOrientationProvider,
      {
        scope: props.__scopeSlider,
        startEdge: isSlidingFromLeft ? "left" : "right",
        endEdge: isSlidingFromLeft ? "right" : "left",
        direction: isSlidingFromLeft ? 1 : -1,
        size: "width",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          SliderImpl,
          {
            dir: direction,
            "data-orientation": "horizontal",
            ...sliderProps,
            ref: composedRefs,
            style: {
              ...sliderProps.style,
              ["--radix-slider-thumb-transform"]: "translateX(-50%)"
            },
            onSlideStart: (event) => {
              const value = getValueFromPointer(event.clientX);
              onSlideStart == null ? void 0 : onSlideStart(value);
            },
            onSlideMove: (event) => {
              const value = getValueFromPointer(event.clientX);
              onSlideMove == null ? void 0 : onSlideMove(value);
            },
            onSlideEnd: () => {
              rectRef.current = void 0;
              onSlideEnd == null ? void 0 : onSlideEnd();
            },
            onStepKeyDown: (event) => {
              const slideDirection = isSlidingFromLeft ? "from-left" : "from-right";
              const isBackKey = BACK_KEYS[slideDirection].includes(event.key);
              onStepKeyDown == null ? void 0 : onStepKeyDown({ event, direction: isBackKey ? -1 : 1 });
            }
          }
        )
      }
    );
  }
);
var SliderVertical = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      min,
      max,
      inverted,
      onSlideStart,
      onSlideMove,
      onSlideEnd,
      onStepKeyDown,
      ...sliderProps
    } = props;
    const sliderRef = reactExports.useRef(null);
    const ref = useComposedRefs(forwardedRef, sliderRef);
    const rectRef = reactExports.useRef(void 0);
    const isSlidingFromBottom = !inverted;
    function getValueFromPointer(pointerPosition) {
      const rect = rectRef.current || sliderRef.current.getBoundingClientRect();
      const input = [0, rect.height];
      const output = isSlidingFromBottom ? [max, min] : [min, max];
      const value = linearScale(input, output);
      rectRef.current = rect;
      return value(pointerPosition - rect.top);
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      SliderOrientationProvider,
      {
        scope: props.__scopeSlider,
        startEdge: isSlidingFromBottom ? "bottom" : "top",
        endEdge: isSlidingFromBottom ? "top" : "bottom",
        size: "height",
        direction: isSlidingFromBottom ? 1 : -1,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          SliderImpl,
          {
            "data-orientation": "vertical",
            ...sliderProps,
            ref,
            style: {
              ...sliderProps.style,
              ["--radix-slider-thumb-transform"]: "translateY(50%)"
            },
            onSlideStart: (event) => {
              const value = getValueFromPointer(event.clientY);
              onSlideStart == null ? void 0 : onSlideStart(value);
            },
            onSlideMove: (event) => {
              const value = getValueFromPointer(event.clientY);
              onSlideMove == null ? void 0 : onSlideMove(value);
            },
            onSlideEnd: () => {
              rectRef.current = void 0;
              onSlideEnd == null ? void 0 : onSlideEnd();
            },
            onStepKeyDown: (event) => {
              const slideDirection = isSlidingFromBottom ? "from-bottom" : "from-top";
              const isBackKey = BACK_KEYS[slideDirection].includes(event.key);
              onStepKeyDown == null ? void 0 : onStepKeyDown({ event, direction: isBackKey ? -1 : 1 });
            }
          }
        )
      }
    );
  }
);
var SliderImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSlider,
      onSlideStart,
      onSlideMove,
      onSlideEnd,
      onHomeKeyDown,
      onEndKeyDown,
      onStepKeyDown,
      ...sliderProps
    } = props;
    const context = useSliderContext(SLIDER_NAME, __scopeSlider);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        ...sliderProps,
        ref: forwardedRef,
        onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
          if (event.key === "Home") {
            onHomeKeyDown(event);
            event.preventDefault();
          } else if (event.key === "End") {
            onEndKeyDown(event);
            event.preventDefault();
          } else if (PAGE_KEYS.concat(ARROW_KEYS).includes(event.key)) {
            onStepKeyDown(event);
            event.preventDefault();
          }
        }),
        onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
          const target = event.target;
          target.setPointerCapture(event.pointerId);
          event.preventDefault();
          if (context.thumbs.has(target)) {
            target.focus();
          } else {
            onSlideStart(event);
          }
        }),
        onPointerMove: composeEventHandlers(props.onPointerMove, (event) => {
          const target = event.target;
          if (target.hasPointerCapture(event.pointerId)) onSlideMove(event);
        }),
        onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
          const target = event.target;
          if (target.hasPointerCapture(event.pointerId)) {
            target.releasePointerCapture(event.pointerId);
            onSlideEnd(event);
          }
        })
      }
    );
  }
);
var TRACK_NAME = "SliderTrack";
var SliderTrack = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSlider, ...trackProps } = props;
    const context = useSliderContext(TRACK_NAME, __scopeSlider);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-disabled": context.disabled ? "" : void 0,
        "data-orientation": context.orientation,
        ...trackProps,
        ref: forwardedRef
      }
    );
  }
);
SliderTrack.displayName = TRACK_NAME;
var RANGE_NAME = "SliderRange";
var SliderRange = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSlider, ...rangeProps } = props;
    const context = useSliderContext(RANGE_NAME, __scopeSlider);
    const orientation = useSliderOrientationContext(RANGE_NAME, __scopeSlider);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const valuesCount = context.values.length;
    const percentages = context.values.map(
      (value) => convertValueToPercentage(value, context.min, context.max)
    );
    const offsetStart = valuesCount > 1 ? Math.min(...percentages) : 0;
    const offsetEnd = 100 - Math.max(...percentages);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-orientation": context.orientation,
        "data-disabled": context.disabled ? "" : void 0,
        ...rangeProps,
        ref: composedRefs,
        style: {
          ...props.style,
          [orientation.startEdge]: offsetStart + "%",
          [orientation.endEdge]: offsetEnd + "%"
        }
      }
    );
  }
);
SliderRange.displayName = RANGE_NAME;
var THUMB_NAME = "SliderThumb";
var SliderThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const getItems = useCollection(props.__scopeSlider);
    const [thumb, setThumb] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setThumb(node));
    const index = reactExports.useMemo(
      () => thumb ? getItems().findIndex((item) => item.ref.current === thumb) : -1,
      [getItems, thumb]
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SliderThumbImpl, { ...props, ref: composedRefs, index });
  }
);
var SliderThumbImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSlider, index, name, ...thumbProps } = props;
    const context = useSliderContext(THUMB_NAME, __scopeSlider);
    const orientation = useSliderOrientationContext(THUMB_NAME, __scopeSlider);
    const [thumb, setThumb] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setThumb(node));
    const isFormControl = thumb ? context.form || !!thumb.closest("form") : true;
    const size = useSize(thumb);
    const value = context.values[index];
    const percent = value === void 0 ? 0 : convertValueToPercentage(value, context.min, context.max);
    const label = getLabel(index, context.values.length);
    const orientationSize = size == null ? void 0 : size[orientation.size];
    const thumbInBoundsOffset = orientationSize ? getThumbInBoundsOffset(orientationSize, percent, orientation.direction) : 0;
    reactExports.useEffect(() => {
      if (thumb) {
        context.thumbs.add(thumb);
        return () => {
          context.thumbs.delete(thumb);
        };
      }
    }, [thumb, context.thumbs]);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        style: {
          transform: "var(--radix-slider-thumb-transform)",
          position: "absolute",
          [orientation.startEdge]: `calc(${percent}% + ${thumbInBoundsOffset}px)`
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.ItemSlot, { scope: props.__scopeSlider, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Primitive.span,
            {
              role: "slider",
              "aria-label": props["aria-label"] || label,
              "aria-valuemin": context.min,
              "aria-valuenow": value,
              "aria-valuemax": context.max,
              "aria-orientation": context.orientation,
              "data-orientation": context.orientation,
              "data-disabled": context.disabled ? "" : void 0,
              tabIndex: context.disabled ? void 0 : 0,
              ...thumbProps,
              ref: composedRefs,
              style: value === void 0 ? { display: "none" } : props.style,
              onFocus: composeEventHandlers(props.onFocus, () => {
                context.valueIndexToChangeRef.current = index;
              })
            }
          ) }),
          isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            SliderBubbleInput,
            {
              name: name ?? (context.name ? context.name + (context.values.length > 1 ? "[]" : "") : void 0),
              form: context.form,
              value
            },
            index
          )
        ]
      }
    );
  }
);
SliderThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "RadioBubbleInput";
var SliderBubbleInput = reactExports.forwardRef(
  ({ __scopeSlider, value, ...props }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevValue = usePrevious(value);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(inputProto, "value");
      const setValue = descriptor.set;
      if (prevValue !== value && setValue) {
        const event = new Event("input", { bubbles: true });
        setValue.call(input, value);
        input.dispatchEvent(event);
      }
    }, [prevValue, value]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        style: { display: "none" },
        ...props,
        ref: composedRefs,
        defaultValue: value
      }
    );
  }
);
SliderBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getNextSortedValues(prevValues = [], nextValue, atIndex) {
  const nextValues = [...prevValues];
  nextValues[atIndex] = nextValue;
  return nextValues.sort((a, b) => a - b);
}
function convertValueToPercentage(value, min, max) {
  const maxSteps = max - min;
  const percentPerStep = 100 / maxSteps;
  const percentage = percentPerStep * (value - min);
  return clamp(percentage, [0, 100]);
}
function getLabel(index, totalValues) {
  if (totalValues > 2) {
    return `Value ${index + 1} of ${totalValues}`;
  } else if (totalValues === 2) {
    return ["Minimum", "Maximum"][index];
  } else {
    return void 0;
  }
}
function getClosestValueIndex(values, nextValue) {
  if (values.length === 1) return 0;
  const distances = values.map((value) => Math.abs(value - nextValue));
  const closestDistance = Math.min(...distances);
  return distances.indexOf(closestDistance);
}
function getThumbInBoundsOffset(width, left, direction) {
  const halfWidth = width / 2;
  const halfPercent = 50;
  const offset = linearScale([0, halfPercent], [0, halfWidth]);
  return (halfWidth - offset(left) * direction) * direction;
}
function getStepsBetweenValues(values) {
  return values.slice(0, -1).map((value, index) => values[index + 1] - value);
}
function hasMinStepsBetweenValues(values, minStepsBetweenValues) {
  if (minStepsBetweenValues > 0) {
    const stepsBetweenValues = getStepsBetweenValues(values);
    const actualMinStepsBetweenValues = Math.min(...stepsBetweenValues);
    return actualMinStepsBetweenValues >= minStepsBetweenValues;
  }
  return true;
}
function linearScale(input, output) {
  return (value) => {
    if (input[0] === input[1] || output[0] === output[1]) return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}
function getDecimalCount(value) {
  return (String(value).split(".")[1] || "").length;
}
function roundValue(value, decimalCount) {
  const rounder = Math.pow(10, decimalCount);
  return Math.round(value * rounder) / rounder;
}
var Root = Slider$1;
var Track = SliderTrack;
var Range = SliderRange;
var Thumb = SliderThumb;
function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}) {
  const _values = reactExports.useMemo(
    () => Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max],
    [value, defaultValue, min, max]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Root,
    {
      "data-slot": "slider",
      defaultValue,
      value,
      min,
      max,
      className: cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Track,
          {
            "data-slot": "slider-track",
            className: cn(
              "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
            ),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Range,
              {
                "data-slot": "slider-range",
                className: cn(
                  "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
                )
              }
            )
          }
        ),
        Array.from({ length: _values.length }, (value2, _) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Thumb,
          {
            "data-slot": "slider-thumb",
            className: "border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
          },
          `${value2}`
        ))
      ]
    }
  );
}
function FilterSidebar({
  filters,
  categories,
  onFilterChange,
  onReset
}) {
  var _a;
  const { t, lang } = useLanguage();
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  const activeCount = [
    filters.categoryId,
    filters.state,
    filters.city,
    filters.minRating && filters.minRating > 1 ? filters.minRating : void 0,
    filters.isVerified
  ].filter(Boolean).length;
  const hasActiveFilters = activeCount > 0;
  const filterContent = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "filter-sidebar", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "filter-category",
          className: "text-xs font-semibold text-foreground uppercase tracking-wider",
          children: t("services.filter.category")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: ((_a = filters.categoryId) == null ? void 0 : _a.toString()) ?? "all",
          onValueChange: (val) => onFilterChange({
            ...filters,
            categoryId: val === "all" ? void 0 : BigInt(val)
          }),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                id: "filter-category",
                className: "h-9 text-sm",
                "data-ocid": "filter-category",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: t("common.all") })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: t("common.all") }),
              categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: cat.id.toString(), children: lang === "hi" ? cat.name.hi : cat.name.en }, cat.id.toString()))
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "filter-state",
          className: "text-xs font-semibold text-foreground uppercase tracking-wider",
          children: t("services.filter.state")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: filters.state ?? "all",
          onValueChange: (val) => onFilterChange({
            ...filters,
            state: val === "all" ? void 0 : val,
            city: void 0
          }),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                id: "filter-state",
                className: "h-9 text-sm",
                "data-ocid": "filter-state",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: t("common.all") })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "max-h-64", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: t("common.all") }),
              INDIAN_STATES.map((state) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: state, children: state }, state))
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "filter-city",
          className: "text-xs font-semibold text-foreground uppercase tracking-wider",
          children: t("services.filter.city")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: "filter-city",
          type: "text",
          value: filters.city ?? "",
          onChange: (e) => onFilterChange({ ...filters, city: e.target.value || void 0 }),
          placeholder: t("services.filter.city"),
          className: "w-full h-9 px-3 text-sm rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
          "data-ocid": "filter-city"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground uppercase tracking-wider", children: lang === "hi" ? "न्यूनतम रेटिंग" : "Min Rating" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded", children: [
          filters.minRating ?? 1,
          "★"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Slider,
        {
          min: 1,
          max: 5,
          step: 1,
          value: [filters.minRating ?? 1],
          onValueChange: ([val]) => onFilterChange({
            ...filters,
            minRating: val === 1 ? void 0 : val
          }),
          className: "w-full",
          "data-ocid": "filter-min-rating"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "1★" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "2★" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "3★" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "4★" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "5★" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "label",
        {
          htmlFor: "filter-verified",
          className: "flex items-center gap-1.5 text-xs font-semibold text-foreground uppercase tracking-wider cursor-pointer",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { size: 13, className: "text-secondary" }),
            lang === "hi" ? "सत्यापित ही" : "Verified Only"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Switch,
        {
          id: "filter-verified",
          checked: !!filters.isVerified,
          onCheckedChange: (checked) => onFilterChange({ ...filters, isVerified: checked || void 0 }),
          "data-ocid": "filter-verified"
        }
      )
    ] }),
    hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "ghost",
        size: "sm",
        className: "w-full text-muted-foreground hover:text-destructive",
        onClick: onReset,
        "data-ocid": "filter-reset",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14, className: "mr-1" }),
          t("services.filter.reset")
        ]
      }
    )
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden lg:block w-56 shrink-0 space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-24 bg-card rounded-xl border border-border p-5 shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { size: 16, className: "text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground", children: t("common.filter") }),
        hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-xs text-primary font-semibold bg-primary/10 px-1.5 py-0.5 rounded-full", children: activeCount })
      ] }),
      filterContent
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => setMobileOpen(true),
          className: "gap-2",
          "data-ocid": "filter-mobile-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { size: 14 }),
            t("common.filter"),
            hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs text-primary font-semibold bg-primary/10 px-1.5 py-0.5 rounded-full", children: activeCount })
          ]
        }
      ),
      mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm",
            onClick: () => setMobileOpen(false),
            onKeyUp: (e) => {
              if (e.key === "Enter") setMobileOpen(false);
            },
            role: "presentation"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-2xl p-6 pb-8 shadow-elevated overflow-y-auto max-h-[85vh]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { size: 16, className: "text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground", children: t("common.filter") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setMobileOpen(false),
                className: "p-2 rounded-md hover:bg-muted",
                "aria-label": "Close filters",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 })
              }
            )
          ] }),
          filterContent,
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "w-full mt-6",
              onClick: () => setMobileOpen(false),
              "data-ocid": "apply-filters-mobile",
              children: lang === "hi" ? "फ़िल्टर लागू करें" : "Apply Filters"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function SearchBar({
  value,
  onChange,
  placeholder,
  debounceMs = 300,
  className = "",
  size = "md"
}) {
  const { t } = useLanguage();
  const [localValue, setLocalValue] = reactExports.useState(value);
  const timerRef = reactExports.useRef(void 0);
  reactExports.useEffect(() => {
    setLocalValue(value);
  }, [value]);
  const handleChange = (e) => {
    const val = e.target.value;
    setLocalValue(val);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onChange(val);
    }, debounceMs);
  };
  const handleClear = () => {
    setLocalValue("");
    onChange("");
  };
  const inputHeight = size === "lg" ? "h-12" : size === "sm" ? "h-8 text-sm" : "h-10";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative flex items-center ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Search,
      {
        size: size === "sm" ? 14 : 16,
        className: "absolute left-3 text-muted-foreground pointer-events-none",
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        type: "search",
        value: localValue,
        onChange: handleChange,
        placeholder: placeholder ?? t("common.search"),
        className: `pl-9 pr-8 ${inputHeight} bg-background border-input`,
        "aria-label": placeholder ?? t("common.search"),
        "data-ocid": "search-input"
      }
    ),
    localValue && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: handleClear,
        className: "absolute right-2.5 text-muted-foreground hover:text-foreground transition-colors",
        "aria-label": "Clear search",
        type: "button",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
      }
    )
  ] });
}
const PAGE_SIZE = BigInt(12);
function FilterChip({
  label,
  onRemove
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Badge,
    {
      variant: "secondary",
      className: "flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/25 hover:bg-primary/20 transition-smooth cursor-default",
      children: [
        label,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onRemove,
            "aria-label": `Remove ${label} filter`,
            className: "ml-0.5 hover:text-primary/70 transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 11 })
          }
        )
      ]
    }
  );
}
function SkeletonCard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-1 w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-card" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-secondary" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-14 rounded-xl shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-2/3" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-24 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 flex-1 rounded-md" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 flex-1 rounded-md" })
      ] })
    ] })
  ] });
}
function EmptyState({
  onReset,
  hasFilters
}) {
  const { lang } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      className: "flex flex-col items-center justify-center py-24 text-center gap-6 rounded-2xl border border-dashed border-border bg-muted/20",
      "data-ocid": "no-results",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 32, className: "text-muted-foreground/60" }) }),
          hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-1 -right-1 w-7 h-7 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 12, className: "text-primary" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 max-w-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold font-display text-foreground", children: lang === "hi" ? "कोई प्रदाता नहीं मिला" : "No providers found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: hasFilters ? lang === "hi" ? "अलग फ़िल्टर आज़माएं या सभी फ़िल्टर हटाएं।" : "Try different filters or clear all to see all providers." : lang === "hi" ? "अभी कोई सेवा प्रदाता उपलब्ध नहीं है।" : "No service providers are available right now." })
        ] }),
        hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            onClick: onReset,
            className: "gap-2",
            "data-ocid": "empty-state-reset",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 }),
              lang === "hi" ? "सभी फ़िल्टर हटाएं" : "Clear all filters"
            ]
          }
        )
      ]
    }
  );
}
function ServicesPage() {
  var _a;
  const { lang } = useLanguage();
  const navigate = useNavigate({ from: "/services" });
  const search = useSearch({ from: "/services" });
  const [filters, setFilters] = reactExports.useState({
    categoryId: search.category ? BigInt(search.category) : void 0,
    state: search.state ?? void 0,
    city: search.city ?? void 0,
    search: search.search ?? void 0
  });
  const [sort, setSort] = reactExports.useState(
    search.sort ?? "rating"
  );
  const [page, setPage] = reactExports.useState(BigInt(0));
  const { data: categories } = useCategories();
  const {
    data: providersPage,
    isLoading,
    isError,
    refetch
  } = useProviders(
    {
      categoryId: filters.categoryId,
      state: filters.state,
      city: filters.city
    },
    page,
    PAGE_SIZE
  );
  const totalPages = providersPage ? Math.ceil(Number(providersPage.total) / Number(PAGE_SIZE)) : 0;
  reactExports.useEffect(() => {
    void navigate({
      search: (prev) => {
        var _a2;
        return {
          ...prev,
          category: (_a2 = filters.categoryId) == null ? void 0 : _a2.toString(),
          state: filters.state,
          city: filters.city,
          search: filters.search || void 0,
          sort: sort !== "rating" ? sort : void 0
        };
      },
      replace: true
    });
  }, [filters, sort, navigate]);
  const handleFilterChange = reactExports.useCallback((next) => {
    setFilters(next);
    setPage(BigInt(0));
  }, []);
  const handleReset = reactExports.useCallback(() => {
    setFilters({});
    setSort("rating");
    setPage(BigInt(0));
  }, []);
  const displayItems = (() => {
    var _a2;
    if (!(providersPage == null ? void 0 : providersPage.items)) return [];
    let items = [...providersPage.items];
    if ((_a2 = filters.search) == null ? void 0 : _a2.trim()) {
      const q = filters.search.trim().toLowerCase();
      items = items.filter(
        (p) => p.businessName.toLowerCase().includes(q) || p.ownerName.toLowerCase().includes(q)
      );
    }
    if (filters.minRating && filters.minRating > 1) {
      items = items.filter((p) => p.averageRating >= (filters.minRating ?? 1));
    }
    if (filters.isVerified) {
      items = items.filter((p) => p.isVerified);
    }
    if (sort === "rating") {
      items.sort((a, b) => b.averageRating - a.averageRating);
    } else if (sort === "reviews") {
      items.sort((a, b) => Number(b.reviewCount) - Number(a.reviewCount));
    } else {
      items.sort((a, b) => a.id < b.id ? 1 : a.id > b.id ? -1 : 0);
    }
    return items;
  })();
  const activeChips = [];
  if (filters.categoryId !== void 0) {
    const cat = categories == null ? void 0 : categories.find((c) => c.id === filters.categoryId);
    const label = cat ? lang === "hi" ? cat.name.hi : cat.name.en : `#${filters.categoryId}`;
    activeChips.push({
      key: "category",
      label,
      onRemove: () => handleFilterChange({ ...filters, categoryId: void 0 })
    });
  }
  if (filters.state) {
    activeChips.push({
      key: "state",
      label: filters.state,
      onRemove: () => handleFilterChange({ ...filters, state: void 0, city: void 0 })
    });
  }
  if (filters.city) {
    activeChips.push({
      key: "city",
      label: filters.city,
      onRemove: () => handleFilterChange({ ...filters, city: void 0 })
    });
  }
  if (filters.search) {
    activeChips.push({
      key: "search",
      label: `"${filters.search}"`,
      onRemove: () => handleFilterChange({ ...filters, search: void 0 })
    });
  }
  if (filters.minRating && filters.minRating > 1) {
    activeChips.push({
      key: "minRating",
      label: `${filters.minRating}★+`,
      onRemove: () => handleFilterChange({ ...filters, minRating: void 0 })
    });
  }
  if (filters.isVerified) {
    activeChips.push({
      key: "verified",
      label: lang === "hi" ? "सत्यापित" : "Verified",
      onRemove: () => handleFilterChange({ ...filters, isVerified: void 0 })
    });
  }
  const resultCount = ((_a = filters.search) == null ? void 0 : _a.trim()) ? displayItems.length : providersPage ? Number(providersPage.total) : 0;
  const hasFilters = activeChips.length > 0;
  const sortLabels = {
    rating: ["By Rating", "रेटिंग के अनुसार"],
    newest: ["Newest First", "नवीनतम पहले"],
    reviews: ["Most Reviewed", "सर्वाधिक समीक्षित"]
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-8 sm:py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl sm:text-3xl font-display font-bold text-foreground mb-0.5", children: lang === "hi" ? "सेवा प्रदाता खोजें" : "Find Service Providers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: lang === "hi" ? "भारत भर में विश्वसनीय पेशेवर सेवाएं" : "Trusted professional services across India" })
        ] }),
        providersPage && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-primary/8 px-3 py-1.5 rounded-lg border border-primary/20 self-start mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { size: 14, className: "text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-primary", children: [
            resultCount,
            " ",
            lang === "hi" ? "प्रदाता" : "providers"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        SearchBar,
        {
          value: filters.search ?? "",
          onChange: (val) => handleFilterChange({
            ...filters,
            search: val || void 0
          }),
          placeholder: lang === "hi" ? "नाम, व्यवसाय से खोजें..." : "Search by name, business...",
          size: "lg",
          "data-ocid": "services-search"
        }
      ) })
    ] }) }),
    (hasFilters || providersPage) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-2 flex-wrap flex-1 min-w-0",
          "data-ocid": "active-filter-chips",
          children: [
            activeChips.map((chip) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              FilterChip,
              {
                label: chip.label,
                onRemove: chip.onRemove
              },
              chip.key
            )),
            activeChips.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleReset,
                className: "text-xs text-muted-foreground hover:text-destructive underline underline-offset-2 transition-colors",
                "data-ocid": "clear-all-filters",
                children: lang === "hi" ? "सभी हटाएं" : "Clear all"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArrowDownAZ,
          {
            size: 14,
            className: "text-muted-foreground hidden sm:block"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: sort,
            onValueChange: (v) => {
              setSort(v);
              setPage(BigInt(0));
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "h-8 text-xs w-40 border-input bg-background",
                  "data-ocid": "sort-select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ["rating", "newest", "reviews"].map(
                (opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt, className: "text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                  opt === "rating" && /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 11, className: "text-primary" }),
                  opt === "newest" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px]", children: "🆕" }),
                  opt === "reviews" && /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { size: 11, className: "text-secondary" }),
                  lang === "hi" ? sortLabels[opt][1] : sortLabels[opt][0]
                ] }) }, opt)
              ) })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FilterSidebar,
        {
          filters,
          categories: categories ?? [],
          onFilterChange: handleFilterChange,
          onReset: handleReset
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between lg:hidden mb-5 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FilterSidebar,
            {
              filters,
              categories: categories ?? [],
              onFilterChange: handleFilterChange,
              onReset: handleReset
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 ml-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: sort,
                onValueChange: (v) => {
                  setSort(v);
                  setPage(BigInt(0));
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "h-8 text-xs w-36 border-input bg-background",
                      "data-ocid": "sort-select-mobile",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ["rating", "newest", "reviews"].map(
                    (opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt, className: "text-xs", children: lang === "hi" ? sortLabels[opt][1] : sortLabels[opt][0] }, opt)
                  ) })
                ]
              }
            ),
            providersPage && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground whitespace-nowrap", children: [
              resultCount,
              " ",
              lang === "hi" ? "प्रदाता" : "found"
            ] })
          ] })
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5",
            "data-ocid": "loading-skeleton",
            children: ["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, k))
          }
        ) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-center gap-4 rounded-2xl border border-dashed border-border bg-muted/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl", children: "⚠️" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: lang === "hi" ? "कुछ गलत हुआ" : "Something went wrong" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: lang === "hi" ? "डेटा लोड नहीं हो सका।" : "Could not load providers." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => refetch(), children: lang === "hi" ? "पुनः प्रयास करें" : "Retry" })
        ] }) : displayItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { onReset: handleReset, hasFilters }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5",
              "data-ocid": "providers-grid",
              children: displayItems.map((provider, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: {
                    delay: Math.min(i * 0.05, 0.35),
                    duration: 0.28
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ServiceCard,
                    {
                      provider,
                      categories: categories ?? []
                    }
                  )
                },
                `provider-${provider.id}`
              ))
            }
          ),
          displayItems.some((p) => p.isVerified) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-xs text-muted-foreground flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { size: 12, className: "text-secondary" }),
            lang === "hi" ? "सत्यापित प्रदाता की पहचान है।" : "Verified badge indicates identity-verified providers."
          ] }),
          totalPages > 1 && !filters.search && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-center gap-3 mt-10",
              "data-ocid": "pagination",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => setPage((p) => BigInt(Math.max(0, Number(p) - 1))),
                    disabled: page === BigInt(0),
                    "data-ocid": "prev-page",
                    className: "gap-1.5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 15 }),
                      lang === "hi" ? "पिछला" : "Previous"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: Array.from(
                  { length: Math.min(totalPages, 5) },
                  (_, i) => {
                    const pageNum = totalPages <= 5 ? i : Math.max(
                      0,
                      Math.min(
                        Number(page) - 2 + i,
                        totalPages - 5 + i
                      )
                    );
                    const isActive = BigInt(pageNum) === page;
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setPage(BigInt(pageNum)),
                        className: `w-8 h-8 text-xs rounded-md font-medium transition-smooth ${isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`,
                        "aria-current": isActive ? "page" : void 0,
                        "data-ocid": `page-${pageNum}`,
                        children: pageNum + 1
                      },
                      `page-${pageNum}`
                    );
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => setPage((p) => p + BigInt(1)),
                    disabled: Number(page) + 1 >= totalPages,
                    "data-ocid": "next-page",
                    className: "gap-1.5",
                    children: [
                      lang === "hi" ? "अगला" : "Next",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 15 })
                    ]
                  }
                )
              ]
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  ServicesPage as default
};
