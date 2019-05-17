((window, COMPONENTS) => {
  const template = document.createElement('template');

  template.innerHTML = `
    <style></style>
    <slot name="content">
      <button>
        <slot name="inner">
          My Button
        </slot>
      </button>
    </slot>
  `;

  COMPONENTS.Button = class Button extends HTMLElement {
    constructor() {
      super();

      this.root = this.attachShadow({ mode: 'open' });
      this.root.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
      console.log('__ `Button#connectedCallback()`');
    }
  }
})(window, (window.__COMPONENTS__ = window.__COMPONENTS__ || {}));