# Test - JS - Web Components - Misc.

## Table of Contents
- [About](#about)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Findings](#findings)
- [Documentation](#documentation)

## About
The purpose of this repository is to explore the following:
- Styles
  - How are Web Components styled?
  - How can Web Components be styled based on context (ie. based on the presence or absence of supplementary attributes)?
  - How can a Web Component consumer provide custom or override-type styles?
- Encapsulation
  - How can a Web Component make use of the Shadow DOM for encapsulation?
  - How can a Web Component opt-out of the Shadow DOM?
- Child Nodes
  - How do Web Components capture/expose child nodes?
  - How do Web Components handle Element-type nodes?
  - How do Web Components handle Text-type nodes?

## Prerequisites
In order to run this project, please ensure that both Node and npm are installed on your system.

## Installation
To install this project, as well as its dependencies, complete the following steps:
  - Download or clone the repository to your local file system.
  - Using the command line, navigate to the root of the repository.
  - Run `npm install`.

## Usage
To start this project, open the `src/index.html` file in the browser of your choice. From here you may select an experiment to review.

An overview of the experiments contained within this repository, as well as which questions each experiment relates to, has been included below:

### Button
These experiments relate to styling Web Components. For additional details, see the [About](#about) section above.

### Link
These experiments relate to Web Components and encapsulation. For additional details, see the [About](#about) section above.

### Paragraph
These experiments explore the following:
- Web Components and encapsulation.
- Web Components and child notes (specifically Element and Text-type nodes).

For additional details, see the [About](#about) section above.

## Findings

- Styles defined outside of a given Web Component are not applied to elements within the component's template, even if the selector for a given rule matches an element within the Web Component.
- Styles defined outside of a given Web Component ARE applied to transcluded elements (ie. elements inserted into a given Web Component using the 'slot' API), providing that they match the selector.
- Styles defined within a given Web Component are applied to the contents of that component, providing that:
  - The contents match the selector.
  - The contents were not inserted using transclusion (ie. the 'slot' API).
- Styles defined within a given Web Component are not applied to existing elements outside of the component.
- In the case where a <style> tag is inserted via the 'slot' API, rules and declarations ARE NOT applied to the contents of the Web Component, even if the selector for a given rule matches an element within the Web Component.

## Documentation
Currently, this project does not include any external documentation.

For an overview of the project's evolution, please consult the CHANGELOG.
