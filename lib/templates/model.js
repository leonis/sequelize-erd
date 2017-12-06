"use strict";

const values = require('object.values');

module.exports = class ModelTemplate {
  constructor(Sequelize) {
    this.Sequelize = Sequelize;
  }

  getTypeName(columnType) {
    const DataTypes = this.Sequelize.DataTypes;
    for(let name in DataTypes) {
      if (!DataTypes.hasOwnProperty(name)) continue;
      if(columnType instanceof DataTypes[name] && name !== 'ABSTRACT') {
        return name;
      }
    }
  }

  createAttribute(attribute) {
    return `${attribute.fieldName} :${this.getTypeName(attribute.type)}\\l\\`;
  }

  createModel(model) {
    const attributes = values(model.attributes).map(this.createAttribute).join('\n');
    return `"${model.name}" [shape=record, fontname="helvetica", label="{${model.name}|\ ${attributes}"]`;
  }

  render(models) {
    return models.map(this.createModel).join('\n');
  }
};
