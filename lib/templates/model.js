"use strict";

const values = require('object.values');

module.exports = class ModelTemplate {
  createAttribute(attribute) {
    const nil = attribute.allowNull === true ? '-' : '+';
    return `${nil} ${attribute.fieldName} :${attribute.type.toString()}\\l\\`;
  }

  createModel(model) {
    const attributes = values(model.attributes).map((attribute) => {
      return this.createAttribute(attribute);
    }).join('\n');
    return `"${model.name}" [shape=record, fontname="helvetica", label="{${model.name}|\ ${attributes}"]`;
  }

  render(models) {
    return models.map(this.createModel.bind(this)).join('\n');
  }
};
