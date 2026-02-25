export function generateRelations(model) {
  return model.fields
    .filter(f => f.kind === "object")
    .map(field => {
      if (field.isList) {
        return `
    #[ORM\\OneToMany(mappedBy: "${field.relationFromFields?.[0] ?? ''}", targetEntity: ${field.type}Entity::class)]
    private Collection $${field.name};`;
      }

      return `
    #[ORM\\ManyToOne(targetEntity: ${field.type}Entity::class)]
    private ?${field.type}Entity $${field.name} = null;`;
    })
    .join("\n");
}