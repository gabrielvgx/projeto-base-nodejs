export function mapPHPType(field) {
  if (field.isList) return "Collection";

  switch (field.type) {
    case "String":
      return "string";
    case "Int":
      return "int";
    case "Float":
      return "float";
    case "Boolean":
      return "bool";
    case "DateTime":
      return "\\DateTimeImmutable";
    default:
      return field.type + "Entity";
  }
}

export function mapDoctrineType(field) {
  switch (field.type) {
    case "String":
      return "string";
    case "Int":
      return "integer";
    case "Float":
      return "float";
    case "Boolean":
      return "boolean";
    case "DateTime":
      return "datetime_immutable";
    default:
      return "string";
  }
}