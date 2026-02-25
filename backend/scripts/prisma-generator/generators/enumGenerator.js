export function generateEnum(en) {
  const values = en.values
    .map(v => `    case ${v.name.toUpperCase()} = '${v.name}';`)
    .join("\n");

  return `<?php

namespace App\\DTO;

enum ${en.name}: string
{
${values}
}
`;
}