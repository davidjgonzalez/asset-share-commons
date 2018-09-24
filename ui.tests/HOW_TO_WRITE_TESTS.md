
# Asset Share Commons `ui.tests` conventions

This provides a brief outline of how to write ui.tests for Asset Share Commons.

## HTL considerations

As seen below, the tests should only interact with the DOM elements via BEM classes. This will require in many instances adding BEM classes to HTL scripts to support test writing.

## Folder organization

Tests are broken out by component and follow the `/apps/asset-share-commons/components/..` structure, meaning each component has its own specs folder.

For example:

```
/test/specs/components/search/sort ← Tests for the Search Sort component
/test/specs/components/search/filterToggle ← Tests for the Search Filter Toggle component
/test/specs/components/structure/searchPage ← Tests for the Search Page component
```

## Component organization

Each component (including pages) are broken out into:

* The spec's `ComponentObject` (following the webdriver.io [PageObject pattern](http://webdriver.io/guide/testrunner/pageobjects.html)) which acts as a getter for the DOM elements for that component. 

This ComponentObject should remain dumb and simply model the content of the component and provide no validation of its own.

* The **ComponentObject** 
	* *Required*
	* `test/specs/.../<component-name>/<ComponentName>.component.js`
* The **Initial** spec which tests the initial load state of the component.
	* *Required*
	* `test/specs/.../<component-name>/<componentName>.initial.spec.js`
* The **Reload** spec which tests the component state after reloading the state with query parameters
	* *Optional*
	* `test/specs/.../<component-name>/<componentName>.reload.spec.js`
* The **Action** spec which tests user interactions with the component (clicks, focus, change, etc.)
	* *Optional*
	* `test/specs/.../<component-name>/<componentName>.action.spec.js`

> TBD If others are to be added.

The spec's ~always need a `PageObject` to issue the browser request, which should be imported from the appropriate `test/specs/structure/<component-name>/<ComponentName>.component.js`

## Page components

Page components are currently in isolation however we will likely want to create an inheritance/prototype pattern to re-use page logic across page types/use-cases.

> This inheritance pattern is TBD.

### Cross-spec Component use

In the context of search, components will have to often inspect the results of other components; specially the Search Results component, to ensure the expected results appear based on the component configuration.

> This pattern is TBD.

## Helpers

Bem.js helps construct BEM-style constructors, which are what should be used to target all elements in the ui.tests specs. 

This should only be used in the the `xxx.component.js` as this is the only abstraction that should know how to find elements in the DOM.

## Examples!

Ok, just one... the `./test/specs/example` is an example of the common structure of a component's tests.

