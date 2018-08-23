<div align="center">
  <a href="https://github.com/qasimsoomro/koa-es7-swagger-rest" title="Koa REST API Boilerplate">
    <img alt="Koa REST API Boilerplate" src="http://crocodillon.com/images/blog/2015/asynchronous-callbacks-in-koa--twitter.png" width="240px" />
  </a>
  <br />
  <h1>Koa REST API Boilerplate</h1>
</div>

<p align="center">
  Proof of Concept

  Boilerplate for Node.js Koa RESTful API application with TypeScript, Docker, Swagger, Jest, Coveralls, and Circle CI
</p>

<div align="center">
  <a href="https://coveralls.io/github/qasimsoomro/koa-es7-swagger-rest">
    <img src="https://coveralls.io/repos/github/qasimsoomro/koa-es7-swagger-rest/badge.svg" alt='Coverage Status' />
  </a>
  <a href="https://opensource.org/licenses/mit-license.php">
    <img alt="MIT Licence" src="https://badges.frapsoft.com/os/mit/mit.svg?v=103" />
  </a>
  <a href="https://github.com/ellerbrock/open-source-badge/">
    <img alt="Open Source Love" src="https://badges.frapsoft.com/os/v1/open-source.svg?v=103" />
  </a>
</div>

<br />

**Koa REST API Boilerplate** is a highly opinionated boilerplate template for building RESTful API application with TypeScript & Koa. This template comes loosely-typed. Please note that routes are auto generated.

This boilerplate include the following features:

- [TSOA](https://github.com/lukeautry/tsoa) for OpenAPI compliant documentation and routes generation
- Style and linting with [Google TypeScript style](https://github.com/google/ts-style)
- Multi-process clustering with production-ready process manager [PM2](http://pm2.keymetrics.io/)
- Log rotation and log management using [Winston](https://github.com/winstonjs/winston)
- A super small and optimized [Docker](https://www.docker.com/) image based on Alpine image
- [Swagger](https://swagger.io/) API documentation based on JSDoc
- Continuous integration and delivery using [CircleCI](https://circleci.com/)
- Unit Test and Integration Test along with Test Coverage using [Jest](https://facebook.github.io/jest/) testing framework


## Getting Started

```zsh
$ git clone https://github.com/qasimsoomro/koa-es7-swagger-rest your-project-name
$ cd your-project-name
$ rm -rf .git && git init
```

```zsh
$ yarn
$ yarn build
$ yarn start
```

To rebuild TSOA, simply run `yarn run routes-gen`, this is usually taken care of by pre build scripts.


## Commands


### Run

```zsh
# Run normally
$ yarn start
# Run the application with Docker for development with Nodemon
$ docker-compose up
$ curl localhost:7070/v1/spec
$ curl localhost:7070/v1/health
```

### Test

```zsh
# Test
$ yarn test                           # Run all test
$ yarn test:unit                      # Run only unit test
$ yarn test:integration               # Run only integration test
# Test (Watch Mode for development)
$ yarn test:watch                     # Run all test with watch mode
$ yarn test:watch:unit                # Run only unit test with watch mode
$ yarn test:watch:integration         # Run only integration test with watch mode
# Test Coverage
$ yarn test:coverage                  # Calculate the coverage of all test
$ yarn test:coverage:unit             # Calculate the coverage of unit test
$ yarn test:coverage:integration      # Calculate the coverage of integration test
# Test consistent coding style (Lint)
$ yarn lint                           # Lint all sourcecode
```

### Archive

```zsh
$ yarn pack
```


## Contributing

This project follows the [**Contributor Covenant**](http://contributor-covenant.org/version/1/4/) Code of Conduct.


#### Bug Reports & Feature Requests

Please use the [issue tracker](https://github.com/qasimsoomro/koa-es7-swagger-rest/issues) to report any bugs or ask feature requests.


## License

Provided under the terms of the [MIT License](https://github.com/qasimsoomro/koa-es7-swagger-rest/blob/master/LICENSE).

Copyright © 2018, [Qasim Soomro](https://www.holonis.com/q).
