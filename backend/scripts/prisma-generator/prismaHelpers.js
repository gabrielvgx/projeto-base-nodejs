export function isRelation(field) {
  return field.kind === "object";
}

export function isScalar(field) {
  return field.kind === "scalar" || field.kind === "enum";
}

export function isId(field) {
  return field.isId;
}