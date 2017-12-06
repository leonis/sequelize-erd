"use strict";

const createAssociation = (association) => {
  const typeString = {
    BelongsTo: `[arrowtail=crow, arrowhead=odot, dir=both]`,
    BelongsToMany: `[arrowtail=crow, arrowhead=crow, dir=both, label="${association.as}"]`
  }[association.associationType];
  if (typeString) {
    return `"${association.source.name}" -> "${association.target.name}" ${typeString}`;
  }
};

module.exports = class AssociationTemplate {
  render(models) {
    return models.map((model) => {
      return Object.values(model.associations).map(createAssociation).join('\n')
    }).join('\n');
  }
};
