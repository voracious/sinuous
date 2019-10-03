import { h, hs, api } from 'sinuous';

export const EMPTY_ARR = [];
export const _ = {};

let isHydrated;

/**
 * Create a sinuous `treeify` function.
 * @param  {boolean} isSvg
 * @return {Function}
 */
export function context(isSvg) {
  function treeify() {
    if (isHydrated) {
      // Hydrate on first pass, create on the rest.
      return (isSvg ? hs : h).apply(null, arguments);
    }

    const args = EMPTY_ARR.slice.call(arguments);
    const tree = { _children: [] };

    function item(arg) {
      if (isSvg) tree._isSvg = isSvg;
      if (arg == null);
      else if (arg === _) {
        addChild(tree, arg);
      } else if (typeof arg === 'string') {
        if (tree.type) {
          addChild(tree, { type: null, _props: arg });
        } else {
          tree.type = arg;
        }
      } else if (Array.isArray(arg)) {
        arg.forEach(item);
      } else if (typeof arg === 'object') {
        if (arg.type) {
          addChild(tree, arg);
        } else {
          tree._props = arg;
        }
      } else if (typeof arg === 'function') {
        addChild(tree, arg);
      }
    }

    function addChild(parent, child) {
      parent._children.push(child);
      child._parent = parent;
    }

    args.forEach(item);

    return tree.type
      ? tree
      : tree._children[1]
      ? tree._children
      : tree._children[0];
  }

  return treeify;
}

/**
 * Hydrates the root node with a passed delta tree structure.
 *
 * `delta` looks like:
 * {
 *   type: 'div',
 *   _props: { class: '' },
 *   _children: []
 * }
 *
 * @param  {object} delta
 * @param  {Node} root
 * @return {Node} Returns the `root`.
 */
export function hydrate(delta, root) {
  const args = [root, delta._props, delta._children || delta];
  let el;

  function item(arg) {
    if (arg instanceof Node) {
      el = arg;
      // Keep a child pointer for multiple hydrate calls per element.
      el._index = el._index || 0;
    } else if (Array.isArray(arg)) {
      arg.forEach(item);
    } else if (el) {
      let target = filterChildNodes(el)[el._index];
      if (target) {
        // Skip placeholder underscore.
        if (arg === _) {
          el._index++;
        } else if (typeof arg === 'object') {
          if (arg.type === null) {
            el._index++;

            // This is a text vnode, add noskip so spaces don't get skipped.
            target._noskip = true;

            // Leave whitespace alone.
            if (target.data.trim() !== arg._props.trim()) {
              if (
                target.nodeType === 3 &&
                arg._parent._children.length !== filterChildNodes(el).length
              ) {
                // If the parent's virtual children length don't match the DOM's,
                // it's probably adjacent text nodes stuck together. Split them.
                target.splitText(
                  target.data.indexOf(arg._props) + arg._props.length
                );
              }
              // Leave whitespace alone.
              if (target.data.trim() !== arg._props.trim()) {
                target.data = arg._props;
              }
            }
          } else if (arg.type) {
            hydrate(arg, target);
            el._index++;
          } else {
            for (let name in arg) {
              api.property(name, arg[name], el, delta._isSvg);
            }
          }
        } else if (typeof arg === 'function') {
          let hydrated;
          let current = target.data;
          let prefix = '';
          let marker;
          let startNode;
          api.subscribe(function() {
            isHydrated = hydrated;

            let result = arg();
            const isStringable =
              typeof result === 'string' || typeof result === 'number';
            result = isStringable ? prefix + result : result;
            if (hydrated) {
              current = api.insert(el, result, marker, current, startNode);
            } else {
              if (isStringable) {
                el._index++;

                if (
                  target.nodeType === 3 &&
                  arg._parent._children.length !== filterChildNodes(el).length
                ) {
                  // If the parent's virtual children length don't match the DOM's,
                  // it's probably adjacent text nodes stuck together. Split them.
                  target.splitText(target.data.indexOf(result) + result.length);
                  // Leave prefix whitespace intact.
                  prefix = current.match(/^\s*/)[0];
                }
              } else {
                if (Array.isArray(result)) {
                  startNode = target;
                  target = el;
                }
                hydrate(result, target);
                current = [];
              }

              // IE9 requires an explicit `null` as second argument.
              marker = el.insertBefore(
                document.createTextNode(''),
                filterChildNodes(el)[el._index] || null
              );
            }

            isHydrated = false;
            hydrated = true;
          });
        }
      }
    }
  }

  args.forEach(item);

  return el;
}

/**
 * Filter out whitespace text nodes unless it has a noskip indicator.
 *
 * Don't use `parent.childNodes` here to keep support for IE9, it has a
 * bug where `childNodes` returns incorrectly after `child.splitText()`.
 *
 * @param  {Node} parent
 * @return {Array}
 */
function filterChildNodes(parent) {
  let el = parent.firstChild;
  let arr = [];
  while (el) {
    if (el.nodeType !== 3 || el.data.trim() || el._noskip) {
      arr.push(el);
    }
    el = el.nextSibling;
  }
  return arr;
}
