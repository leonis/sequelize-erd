"use strict";

const values = require('object.values');
const Vis = require('./graphvis');
const ModelTemplate = require('./lib/templates/model');
const AssociationTemplate = require('./lib/templates/association');

module.exports = (path) => {
  const db = typeof path === 'string' ? require(path) : path;
  const models = values(db.models);
  const modelTemplate = new ModelTemplate();
  const associationTemplate = new AssociationTemplate();
  return Vis(`
    digraph models_diagram {
      graph[overlap=false, splines=true]
      ${modelTemplate.render(models)}
      ${associationTemplate.render(models)}
  }`, {
    format: 'svg',
    engine: 'dot'
  });
};
