# QDR Integrators

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) and base on Egret admin template

# Requirement development mode
- Node js v10.15.0

## Default switch to Node version, add this code to .bash_profile or .zshrc
```
# place this after nvm initialization!
autoload -U add-zsh-hook
load-nvmrc() {
  if [[ -f .nvmrc && -r .nvmrc ]]; then
    nvm use
  elif [[ $(nvm version) != $(nvm version default)  ]]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

# Template documentation

[Egret Document](http://demos.ui-lib.com/egret-doc/)

# Template demo
[Egret Demo](http://egret.ui-lib.com/dashboard/analytics)

## Development

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
Run specify 1 scenario, use syntax `fdescribe` and `fit` for scenarios you want

## Jasmine cheat sheet
[CHEAT SHEET - MATCHERS](https://github.com/JamieMason/Jasmine-Matchers)

## Source code structure
```
+ src
  |_ app
    |_ modules
      |_ sessions ( sign_in, sign_up, logout, forgot password, etc ... )
        |_ components, services ( for sessions module only )
      |_ dashboard ( signed in )
        |_ components, services ( for dashboard only )
      |_services ( for this project only, not for shared all projects )
      |_ shared ( this is shared repository Github, will be shared through all projects )
        |_ spec ( unit test for shared )
    |_ helpers ( should not put injectable class here )
    |_
  |_ environments (environments configuration)
  |_ assets ( javascripts, stylesheets, images )
  |_ spec ( unit test for this project only )

```


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
