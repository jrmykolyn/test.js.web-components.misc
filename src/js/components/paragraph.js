((window, COMPONENTS) => {
  // --------------------------------------------------
  // Define component template.
  // --------------------------------------------------
  const template = document.createElement('template');

  template.innerHTML = `
    <p>
      <slot></slot>
    </p>
  `;

  // --------------------------------------------------
  // Define component.
  // --------------------------------------------------
  COMPONENTS.Paragraph = class Paragraph extends window.HTMLElement {
    constructor() {
      super();
      this.isEncapsulated = !!this.attributes.encapsulated;
      this.root = this.isEncapsulated
        ? this.attachShadow({ mode: 'open' })
        : this;
    }

    connectedCallback() {
      this.render();
    }

    /**
     * Render the component.
     */
    render() {
      this.isEncapsulated
        ? this.renderEncapsulated()
        : this.renderExposed();
    }

    /**
     * Render the component in 'encapsulated' mode.
     */
    renderEncapsulated() {
      this.root.innerHTML = '';
      this.root.appendChild(template.content.cloneNode(true));
    }

    /**
     * Render the component in 'exposed' mode.
     */
    renderExposed() {
      const textElem = document.createElement('p');

      [...this.childNodes].forEach((node, i) => {
        textElem.appendChild(node.cloneNode(true));
      });

      this.root.innerHTML = '';

      this.root.appendChild(textElem);
    }
  }
})(window, (window.__COMPONENTS__ = window.__COMPONENTS__ || {}));
