import { Logger } from './Logger.js';

/**
 * Interface base para classes que usam logging
 */
export interface WithLogger {
  readonly logger: Logger;
}

/**
 * Interface para construtores com logging estático
 */
export interface WithStaticLogger {
  readonly logger: Logger;
}

/**
 * Tipo que combina classe original com capacidades de logging
 */
export type LoggableClass<T extends new (...args: any[]) => any> = T &
  WithStaticLogger &
  (new (...args: any[]) => InstanceType<T> & WithLogger);

/**
 * Decorator que adiciona logging automático com type safety completo
 *
 * Uso:
 * @Loggable
 * export class MinhaClasse extends LoggableBase {
 *   someMethod() {
 *     this.logger.info('Mensagem'); // ✅ Type safe
 *   }
 *
 *   static staticMethod() {
 *     this.logger.info('Mensagem estática'); // ✅ Type safe
 *   }
 * }
 */
export function Loggable<T extends new (...args: any[]) => any>(
  constructor: T,
): LoggableClass<T> {
  const LoggableClass = class extends constructor implements WithLogger {
    // Logger estático por classe - criado apenas uma vez
    private static _logger: Logger;

    /**
     * Getter para métodos de instância - type safe
     */
    get logger(): Logger {
      const ctor = this.constructor as typeof LoggableClass;
      if (!ctor._logger) {
        ctor._logger = Logger.getContextLogger(ctor.name);
      }
      return ctor._logger;
    }

    /**
     * Getter estático para métodos estáticos - type safe
     */
    static get logger(): Logger {
      if (!this._logger) {
        this._logger = Logger.getContextLogger(this.name);
      }
      return this._logger;
    }
  };

  // Preserva o nome da classe original
  Object.defineProperty(LoggableClass, 'name', { value: constructor.name });

  return LoggableClass as LoggableClass<T>;
}

/**
 * Classe base que pode ser estendida para ter logging automático
 * Alternativa ao decorator para casos onde herança é preferível
 */
export abstract class LoggableBase implements WithLogger {
  private static _loggerCache = new Map<string, Logger>();

  get logger(): Logger {
    const className = this.constructor.name;
    if (!LoggableBase._loggerCache.has(className)) {
      LoggableBase._loggerCache.set(className, Logger.getContextLogger(className));
    }
    return LoggableBase._loggerCache.get(className)!;
  }
}

/**
 * Decorator alternativo que permite especificar contexto customizado
 *
 * Uso:
 * @LoggableWithContext('MeuContextoCustom')
 * export class MinhaClasse {
 *   // logger terá contexto 'MeuContextoCustom' ao invés de 'MinhaClasse'
 * }
 */
export function LoggableWithContext(context: string) {
  return function <T extends new (...args: any[]) => {}>(constructor: T) {
    return class extends constructor {
      private static _logger: Logger;

      protected get logger(): Logger {
        const ctor = this.constructor as any;
        if (!ctor._logger) {
          ctor._logger = Logger.getContextLogger(context);
        }
        return ctor._logger;
      }

      protected static get logger(): Logger {
        if (!this._logger) {
          this._logger = Logger.getContextLogger(context);
        }
        return this._logger;
      }
    };
  };
}
