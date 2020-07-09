# README (SCSS Styling)

This README is intended to explain how SCSS code is arranged in the project, and simplify the process to decide where to put new code added, and find existing code.

## Styling files


### Entrypoints

These files are loaded by the framework as starting points for SCSS across application. It's important to note that the individual SCSS files of the components are also loaded automatically as the components are rendered.

- src/global.scss: Declares the *imports* of SCSS files we add through the project.
- src/theme/definitions.scss: Declares theming variables, mixins, fonts and other definitions. They are imported from the "Definitions" section below.
- src/app/app.scss: Basic styles applying across application. Do not use it unless is really a general style and it doesn't fit to any of the categorized SCSS files.

### Definitions

These files define concepts that are used across the application SCSS files.

- assets/styles/scss/fonts.scss: Lists imported fonts
- src/assets/stylesheets/definitions/mixins.scss: Defines mixins
- src/assets/stylesheets/definitions/variables.scss: Defines variables

### Project base components

The files under the folder below group base styles for reusable components across application. (UI components, not Angular components)

- src/assets/stylesheets/base-components/

### Project pages

The files under the folder below group styling for specific pages or sections in the application. They cover a module, and not specifically an Angular Page object, cause those have their own SCSS file associated. For example: Sessions module, which is comprised by several pages.

- src/assets/stylesheets/pages/

### Other

- src/assets/stylesheets/texts.scss: Styling regarding all kinds of text bodies.
- src/assets/stylesheets/styles.scss: Global styles across application. At the moment duplicates app.scsss, the later will soon be deprecated.


## Layout

### Cards