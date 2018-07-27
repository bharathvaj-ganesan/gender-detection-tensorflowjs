# gender-detection

Detect gender using tensorflowjs.

![alt text](./preview.jpg)

> Uses [Gender classification model](https://github.com/arunponnusamy/gender-classification) by [arunponnusamy](https://github.com/arunponnusamy)

## Processing Steps

1.  Detects Face using [Tracking.js](https://trackingjs.com) for more accuracy.
2.  Loads gender model using [Tensorflow.js](https://js.tensorflow.org)
3.  Based on the confidence value we choose Man / woman

## Notes

Gender detection model is not a well trained model. So accuracy will be a bit low.

## Project setup

```
yarn install
``


### Compiles and hot-reloads for development
```

yarn run serve

```
### Compiles and minifies for production
```

yarn run build

```
### Lints and fixes files
```

yarn run lint

```

```
