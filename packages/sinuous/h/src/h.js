/* Adapted from Hyper DOM Expressions - The MIT License - Ryan Carniato */
import { EMPTY_ARR } from './constants.js';
import { insert } from './insert.js';
import { assign } from './utils.js';

/**
 * Create a sinuous `h` tag aka hyperscript.
 * @param  {object} api
 * @param {Function} [api.subscribe] - Function that listens to state changes.
 * @param {Function} [api.cleanup] - Add the given function to the cleanup stack.
 * @return {Function} `h` tag.
 */
export function context(api) {
  api = assign(
    {
      bindings: {},
      context,
      insert
    },
    api
  );

  function h() {
    const args = EMPTY_ARR.slice.call(arguments);
    const multi = isMultiExpression(args);
    let el;

    function item(arg) {
      const type = typeof arg;
      if (arg == null);
      else if (
        type === 'string' ||
        type === 'number' ||
        type === 'boolean'
      ) {
        if (el) {
          el.appendChild(document.createTextNode('' + arg));
        } else {
          el = parseClass(arg);
        }
      } else if (Array.isArray(arg)) {
        // Support Fragments
        if (!el) el = document.createDocumentFragment();
        if (multi) {
          arg.forEach(item);
        } else {
          h.insert(h.subscribe, el, arg);
        }
      } else if (arg instanceof Node) {
        if (el) {
          if (multi) {
            const marker = el.appendChild(document.createTextNode(''));
            h.insert(h.subscribe, el, arg, marker);
          } else {
            el.appendChild(arg);
          }
        } else {
          // Support updates
          el = arg;
        }
      } else if (type === 'object') {
        parseNested(h, el, arg, parseKeyValue);
      } else if (type === 'function') {
        if (el) {
          const marker = multi && el.appendChild(document.createTextNode(''));
          if (arg._flow) {
            arg(h, el, marker);
          } else {
            if (arg.$t) {
              const insertAction = createInsertAction(h);
              insertAction(el, '');
              arg.$t(el, insertAction);
            } else {
              h.insert(h.subscribe, el, arg, marker);
            }
          }
        } else {
          // Support Components
          el = arg.apply(null, args.splice(0));
        }
      }
    }

    while (args.length) {
      item(args.shift());
    }
    return el;
  }

  return assign(h, api);
}

export default context();

/**
 * Create an insert action for a `template` tag.
 *
 * Subsequent `insert`'s of strings can be optimized by setting
 * `Text.data` instead of Element.textContent.
 *
 * @param  {Function} h
 * @param  {*} current
 * @return {Function}
 */
function createInsertAction(h, current = '') {
  return (element, value) => {
    current = h.insert(h.subscribe, element, value, null, current);
  };
}

export function parseNested(h, el, obj, callback) {
  for (let name in obj) {
    const val = obj[name];
    // Create scope for every entry.
    const propAction = function(element, value) {
      if (typeof value === 'function') {
        if (name === 'ref') {
          value(el);
        } else {
          if (value.$t) {
            value.$t(element, propAction);
          } else {
            const isEvent = name[0] === 'o' && name[1] === 'n';
            h.subscribe(() =>
              // Functions added as event handlers are not executed on render
              // unless they have an observable indicator.
              callback(name, isEvent && !value.$o ? value : value(), h, element)
            );
          }
        }
      } else {
        callback(name, value, h, element);
      }
    };
    propAction(el, val);
  }
}

export function parseKeyValue(name, value, h, el) {
  let prefix;
  if (name === 'class' || name === 'className') {
    el.className = value;
  } else if (
    (prefix = name.slice(0, 5)) &&
    (prefix === 'data-' || prefix === 'aria-')
  ) {
    el.setAttribute(name, value);
  } else if (name[0] === 'o' && name[1] === 'n') {
    handleEvent(h, el, name, value);
  } else if (name === 'style') {
    if (typeof value === 'string') {
      el.style.cssText = value;
    } else {
      parseNested(h, el, value, (n, v) => el.style.setProperty(n, v));
    }
  } else if (name === 'attrs') {
    parseNested(h, el, value, (n, v) => el.setAttribute(n, v));
  } else if (name[0] === '$') {
    h.bindings[name.slice(1)](el, value);
  } else {
    el[name] = value;
  }
}

export function isMultiExpression(item) {
  return Array.isArray(item)
    ? item.some(isMultiExpression)
    : typeof item === 'function';
}

function handleEvent(h, el, name, value) {
  const useCapture = name !== (name = name.replace(/Capture$/, ''));
  const kLower = name.toLowerCase();
  name = (kLower in el ? kLower : name).slice(2);

  const removeListener = h.cleanup(() =>
    el.removeEventListener(name, eventProxy, useCapture)
  );

  if (value) {
    el.addEventListener(name, eventProxy, useCapture);
  } else {
    removeListener();
  }

  (el._listeners || (el._listeners = {}))[name] = value;
}

/**
 * Proxy an event to hooked event handlers.
 * @param {Event} e - The event object from the browser.
 * @return {Function}
 */
function eventProxy(e) {
  // eslint-disable-next-line
  return this._listeners[e.type](e);
}

export function parseClass(string) {
  let el;
  // Our minimal parser doesn’t understand escaping CSS special
  // characters like `#`. Don’t use them. More reading:
  // https://mathiasbynens.be/notes/css-escapes .
  const m = string.split(/([.#]?[^\s#.]+)/);
  if (m[1][0] === '.' || m[1][0] === '#') {
    el = document.createElement('div');
  }

  for (let i = 0; i < m.length; i++) {
    const v = m[i];
    const s = v.slice(1);
    if (!v) continue;
    if (!el) el = document.createElement(v);
    else if (v[0] === '.') el.classList.add(s);
    else if (v[0] === '#') el.setAttribute('id', s);
  }

  return el;
}
