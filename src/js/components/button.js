((window, COMPONENTS) => {
  const template = document.createElement('template');

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

  const toRules = (data) => {
    return Object.keys(data)
      .map((k) => `${k} { ${toDeclarations(data[k])} }`)
      .join('\n\n');
  };

  const toDeclarations = (data) => {
    return Object.keys(data)
      .map((k) => `${k}: ${data[k]};`)
      .join('\n');
  };

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

    getSlots() {
      return [...this.root.querySelectorAll('slot') || []]
        .reduce((acc, node) => {
          return {
            ...acc,
            [node.getAttribute('name')]: node,
          };
        }, {});
    }

    hasSlotContent(name) {
      return [...this.children].some((node) => node.getAttribute('slot') === name);
    }

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
