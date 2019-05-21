((window, COMPONENTS) => {
  const template = document.createElement('template');

  template.innerHTML = `
    <a href="#">
      <slot>This is the link content.</slot>
    </a>
  `;

  // -------------------------------------------------------------------
  // 1. Define the abstract class.
  //
  // This class will be responsible for setting the encapsulation-related
  // logic, and for defining the behaviour that the derived classes will
  // inherit.
  // -------------------------------------------------------------------
  class AbstractLink extends window.HTMLElement {
    constructor(opts = {}) {
      super();

      const { isCustomComponent } = opts;

      this.root = !isCustomComponent
        ? this.attachShadow({ mode: 'open' })
        : this;
    }

    connectedCallback() {
      this.root.appendChild(template.content.cloneNode(true));
    }
  }

  // -------------------------------------------------------------------
  // 2. Define the default `Link` class.
  //
  // The class is encapsulated, meaning that its template and styles
  // are not accessible outside of the component itself.
  // -------------------------------------------------------------------
  COMPONENTS.Link = class Link extends AbstractLink {}

  // -------------------------------------------------------------------
  // 3. Define the `CustomLink` class.
  //
  // This class represents a Custom Element, rather than a Web Component.
  // Following instantiation, the template and styles of this class
  // will be accessible outside the component itself.
  // -------------------------------------------------------------------
  COMPONENTS.CustomLink = class CustomLink extends AbstractLink {
    constructor() {
      super({ isCustomComponent: true });
    }
  }
})(window, (window.__COMPONENTS__ = window.__COMPONENTS__ || {}));
