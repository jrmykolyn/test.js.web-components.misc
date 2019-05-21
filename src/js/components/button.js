((window, COMPONENTS) => {
  // --------------------------------------------------
  // Define helper functions.
  // --------------------------------------------------
  /**
   * Given an object of data, convert it into a string
   * of CSS rules.
   *
   * @param {Object}
   * @return {string}
   */
  const toRules = (data) => {
    return Object.keys(data)
      .map((k) => `${k} { ${toDeclarations(data[k])} }`)
      .join('\n\n');
  };

  /**
   * Given an object of data, convert it into a string
   * of CSS declarations.
   *
   * @param {Object}
   * @return {string}
   */
  const toDeclarations = (data) => {
    return Object.keys(data)
      .map((k) => `${k}: ${data[k]};`)
      .join('\n');
  };

  // --------------------------------------------------
  // Define component 'style maps', including:
  // - Default styles.
  // - Themed styles.
  // - Consolidated styles.
  // --------------------------------------------------
  const DEFAULT = {
    'button': {
      'color': 'red',
    },
  };

  const THEMED = {
    ':host(.themed) button': {
      'color': 'blue',
    },
  };

  const STYLES = {
    ...DEFAULT,
    ...THEMED,
  };

  // --------------------------------------------------
  // Define component template.
  // --------------------------------------------------
  const template = document.createElement('template');

  template.innerHTML = `
    <slot name="styles">
      <style>
        ${toRules(STYLES)}
      </style>
    </slot>
    <slot name="content">
      <button>
        <slot name="inner">
          <span>
            My Button
          </span>
        </slot>
      </button>
    </slot>
  `;

  // --------------------------------------------------
  // Define component.
  // --------------------------------------------------
  COMPONENTS.Button = class Button extends HTMLElement {
    constructor() {
      super();

      this.root = this.attachShadow({ mode: 'open' });
      this.root.appendChild(template.content.cloneNode(true));
      this.slots = this.getSlots();
    }

    connectedCallback() {
      this.render();
    }

    /**
     * Get a reference to each of the component's slots;
     * return the result as an object dictionary in the
     * form of:
     * {
     *   <slot-name>: <HTMLElement>,
     *   ...
     * }
     *
     * @return {Object}
     */
    getSlots() {
      return [...this.root.querySelectorAll('slot') || []]
        .reduce((acc, node) => {
          return {
            ...acc,
            [node.getAttribute('name')]: node,
          };
        }, {});
    }

    /**
     * Given a slot name, return whether or not the component
     * consumer has provided content for that slot.
     *
     * @param {string} name
     * @return {boolean}
     */
    hasSlotContent(name) {
      return [...this.children].some((node) => node.getAttribute('slot') === name);
    }

    /**
     * Render the component.
     */
    render() {
      // Render 'content'.
      if (!this.hasSlotContent('content')) {
        const buttonElem = document.createElement('button');
        buttonElem.appendChild(this.slots.inner);
        this.slots.content.innerHTML = '';
        this.slots.content.appendChild(buttonElem);
      }

      // Render 'inner'.
      if (!this.hasSlotContent('inner')) {
        const spanElem = document.createElement('span');
        spanElem.innerText = 'My Button';
        this.slots.inner.innerHTML = '';
        this.slots.inner.appendChild(spanElem);
      }
    }
  }
})(window, (window.__COMPONENTS__ = window.__COMPONENTS__ || {}));
