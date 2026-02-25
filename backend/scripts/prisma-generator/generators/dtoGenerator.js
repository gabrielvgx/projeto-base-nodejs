import { mapPHPType } from "../typeMapper.js";
import { isScalar } from "../prismaHelpers.js";

export function generateDTO(model) {
  const fields = model.fields
    .filter(f => isScalar(f) && !f.isId)
    .map(field => {
      let type = mapPHPType(field);

      if (field.kind === "enum") {
        type = field.type;
      }

      return `        public ?${type} $${field.name} = null`;
    })
    .join(",\n");

  return `<?php

namespace App\\DTO;

class ${model.name}DTO
{
    public function __construct(
${fields}
    ) {}
}
`;
}