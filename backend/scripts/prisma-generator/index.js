import fs from "fs";
import path from "path";
import pkg from '@prisma/generator-helper';
import { ensureDir } from "./utils.js";
import { generateEntity } from "./generators/entityGenerator.js";
import { generateDTO } from "./generators/dtoGenerator.js";
import { generateEnum } from "./generators/enumGenerator.js";

const { generatorHandler } = pkg;

generatorHandler({
  onManifest() {
    return {
      prettyName: "Advanced Prisma Doctrine Generator",
      defaultOutput: "../src"
    };
  },

  async onGenerate(options) {
    const output = options.generator.output.value;

    const entityDir = path.join(output, "Entity");
    const dtoDir = path.join(output, "DTO");

    ensureDir(entityDir);
    ensureDir(dtoDir);

    const models = options.dmmf.datamodel.models;
    const enums = options.dmmf.datamodel.enums;

    // enums
    for (const en of enums) {
      fs.writeFileSync(
        path.join(dtoDir, `${en.name}.php`),
        generateEnum(en)
      );
    }

    // DTOs
    for (const model of models) {
      fs.writeFileSync(
        path.join(dtoDir, `${model.name}DTO.php`),
        generateDTO(model)
      );
    }

    // Entities
    for (const model of models) {
      fs.writeFileSync(
        path.join(entityDir, `${model.name}Entity.php`),
        generateEntity(model, models)
      );
    }
  }
});