import Vue, { VNodeDirective } from 'vue';

interface ClickOutsideBindingArgs {
  handler: (e: Event) => void;
  closeConditional?: (e: Event) => boolean;
  include?: () => HTMLElement[];
}

interface ClickOutsideDirective extends VNodeDirective {
  value?: ((e: Event) => void) | ClickOutsideBindingArgs;
}

function defaultConditional() {
  return true;
}

/**
 * @param {ClickOutsideDirective} binding.value - If its a
 *  the value of the binding can be a function or an object which has properties defined above in ClickOutsideBindingArgs.
 *  [1] binding.value === 'function':
 *    Whenever the user click outside, the function that passed through here will be executed
 *  [2] binding.value === 'object':
 *    We check 2 properties here: `handler` & `closeConditional`.
 *    If the `closeConditional` is true, then it will execute the handler function.
 */
function directive(
  e: PointerEvent,
  el: HTMLElement,
  binding: ClickOutsideDirective
): void {
  const handler =
    typeof binding.value === 'function'
      ? binding.value
      : binding.value!.handler;
  const isActive =
    (typeof binding.value === 'object' && binding.value.closeConditional) ||
    defaultConditional;
  /**
   * The include element callbacks below can be expensive
   * so we should avoid calling them when we're not active.
   * Explicitly check for false to allow fallback compatibility
   * with non-toggleable components
   */
  if (!e || isActive(e) === false) return;

  /**
   * Check if additional elements were passed to be included in check
   * (click must be outside all included elements, if any)
   */
  const elements = (
    (typeof binding.value === 'object' && binding.value.include) ||
    (() => [])
  )();
  // Add the root element for the component this directive was defined on
  elements.push(el);

  /**
   * Check if it's a click outside our elements, and then if our callback returns true.
   * Non-toggleable components should take action in their callback and return falsy.
   * Toggleable can return true if it wants to deactivate.
   * Note that, because we're in the capture phase, this callback will occur before
   * the bubbling click event on any outside elements.
   */
  !elements.some((el) => el.contains(e.target as Node)) &&
    setTimeout(() => {
      isActive(e) && handler && handler(e);
    }, 0);
}

const directiveClickOutside = {
  inserted(el: HTMLElement, binding: ClickOutsideDirective) {
    const onClick = (e: Event) => directive(e as PointerEvent, el, binding);

    const container = document.querySelector('#__layout');
    container!.addEventListener('click', onClick, true);
    (el as any)._clickOutside = onClick;
  },

  unbind(el: HTMLElement) {
    if (!(el as any)._clickOutside) return;

    const container = document.querySelector('#__layout');
    container!.removeEventListener('click', (el as any)._clickOutside, true);
    delete (el as any)._clickOutside;
  },
};

Vue.directive('click-outside', directiveClickOutside);
