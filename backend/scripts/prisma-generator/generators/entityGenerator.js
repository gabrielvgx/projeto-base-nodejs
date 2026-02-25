import { mapPHPType, mapDoctrineType } from "../typeMapper.js";
import { isScalar, isRelation } from "../prismaHelpers.js";
import { generateRelations } from "./relationGenerator.js";

function generateScalarFields(model) {
  return model.fields
    .filter(isScalar)
    .map(field => {
      if (field.isId) {
        return `
    #[ORM\\Id]
    #[ORM\\Column(type: "string")]
    private ?string $${field.name} = null;`;
      }

      if (field.kind === "enum") {
        return `
    #[ORM\\Column(type: "string")]
    private string $${field.name};`;
      }

      const doctrineType = mapDoctrineType(field);
      const phpType = mapPHPType(field);

      return `
    #[ORM\\Column(type: "${doctrineType}", nullable: ${field.isRequired ? "false" : "true"})]
    private ${phpType} $${field.name};`;
    })
    .join("\n");
}

function generateConstructor(model) {
  const assignments = model.fields
    .filter(f => isScalar(f) && !f.isId)
    .map(field => {
      if (field.name === "createdAt") {
        return `        $this->createdAt = new \\DateTimeImmutable();`;
      }

      return `        if ($dto->${field.name} !== null) {
            $this->${field.name} = $dto->${field.name};
        }`;
    })
    .join("\n");

  return `
    public function __construct(${model.name}DTO $dto = new ${model.name}DTO())
    {
        $this->id = \\Symfony\\Component\\Uid\\Uuid::v7()->toRfc4122();
${assignments}
    }
`;
}

function generateGettersSetters(model) {
  return model.fields
    .map(field => {
      const name =
        field.name.charAt(0).toUpperCase() + field.name.slice(1);

      let type = mapPHPType(field);
      if (field.kind === "enum") type = field.type;

      return `
    public function get${name}(): ${type}
    {
        return $this->${field.name};
    }

    public function set${name}(${type} $value): void
    {
        $this->${field.name} = $value;
    }`;
    })
    .join("\n");
}

export function generateEntity(model) {
  const scalarFields = generateScalarFields(model);
  const relations = generateRelations(model);
  const constructor = generateConstructor(model);
  const getters = generateGettersSetters(model);

  return `<?php

namespace App\\Entity;

use Doctrine\\ORM\\Mapping as ORM;
use Doctrine\\Common\\Collections\\ArrayCollection;
use Doctrine\\Common\\Collections\\Collection;
use App\\DTO\\${model.name}DTO;

#[ORM\\Entity]
class ${model.name}Entity
{

${scalarFields}

${relations}

${constructor}

${getters}

}
`;
}