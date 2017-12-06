"use strict";

const values = require('object.values');

module.exports = class ModelTemplate {
  createAttribute(attribute) {
    const nil = attribute.allowNull === true ? '(N)' : '(NN)';
    return `${attribute.fieldName}: ${attribute.type.toString()} ${nil}\\l\\`;
  }

  createModel(model) {
    const attributes = values(model.attributes).map((attribute) => {
      return this.createAttribute(attribute);
    }).join('\n');
    return `"${model.name}" [shape=record, fontsize=7, fontname="helvetica", label="{${model.name}|\\\n${attributes}\n}"]`;
  }

  render(models) {
    return models.map(this.createModel.bind(this)).join('\n');
  }
};
