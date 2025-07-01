# Part 15: Conceitos Avançados de TypeScript

---

## 1. O que são tipos condicionais e como usá-los?

```ts
type IsString<T> = T extends string ? true : false;
```

Permite transformar tipos com base em uma condição. São base de muitos utilitários nativos (como `Exclude`).

---

## 2. Como funciona `infer` e o que ele resolve?

```ts
type Return<T> = T extends (...args: any[]) => infer R ? R : never;
```

`infer` extrai parte de um tipo (ex: retorno de função, parâmetro, etc). Útil para introspecção de tipos.

---

## 3. Como criar um tipo recursivo?

```ts
type JSONValue = string | number | boolean | JSONObject | JSONArray;
type JSONObject = { [k: string]: JSONValue };
type JSONArray = JSONValue[];
```

Údeal para validar ou tipar estruturas como JSON dinâmico.

---

## 4. Como criar tipos que validam strings com prefixo/sufixo?

```ts
type Brand = `brand-${string}`;
const slug: Brand = 'brand-nike';
```

Literal templates types permitem validação de strings estruturadas.

---

## 5. Como usar `satisfies` para tipagem segura sem perder inferência?

```ts
const user = {
  name: 'Ana',
  age: 28,
} satisfies User;
```

Garante conformidade sem fixar o tipo (mantém autocomplete e inferência). Útil em objetos de config, mocks e schemas.

---

## 6. Como tipar funções currificadas?

```ts
function add(a: number): (b: number) => number {
  return (b) => a + b;
}
```

Pode ser tipado com generics e tipos inline.

---

## 7. O que é distributivity em tipos condicionais?

```ts
type Nullable<T> = T extends any ? T | null : never;
```

Se `T = A | B`, então `T extends X ? Y : Z` é aplicado a cada parte da union. Use wrappers (ex: `[T]`) para evitar.

---

## 8. Como criar tipo que extrai apenas propriedades readonly de um objeto?

```ts
type ReadonlyKeys<T> = {
  [K in keyof T]-?: IfEquals<
    { [Q in K]: T[K] },
    { -readonly [Q in K]: T[K] },
    never,
    K
  >
}[keyof T];
```

Complexo, mas ú til para libs que precisam introspecção completa (ex: type-safe ORM).

---

## 9. Como criar tipo DeepPartial (recursivo)?

```ts
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
```

Aplica `Partial` recursivamente em objetos aninhados.

---

## 10. Como usar Mapped Types com operadores?

```ts
type MakeOptional<T> = {
  [K in keyof T]?: T[K];
};
type MakeReadonly<T> = {
  readonly [K in keyof T]: T[K];
};
```

Permite transformação em massa de tipos.

---

## 11. Como usar Overloads corretamente?

```ts
function parse(input: string): string[];
function parse(input: number): number[];
function parse(input: any) {
  return [input];
}
```

Overloads permitem múltiplas assinaturas de função visíveis ao TS.

---

## 12. O que são tipos "branded"?

```ts
type UserId = string & { __brand: 'UserId' };
```

Evita confusão entre strings idênticas mas semanticamente diferentes (ex: UserId vs ProductId).

---

## 13. Como simular validação de schema em tempo de tipo?

```ts
type Schema = {
  name: string;
  age: number;
};
function createUser<T extends Schema>(input: T): T { return input; }
```

Usado por libs como `zod` + `as const` para gerar tipos validados.

---

## 14. Como criar um tipo que representa uma tupla de tamanho fixo?

```ts
type Tuple<T, N extends number, R extends unknown[] = []> =
  R['length'] extends N ? R : Tuple<T, N, [T, ...R]>;
```

Úteis para representar listas fixas (ex: RGB, coordenadas).

---

## 15. Como gerar enums "type-safe" e inferir seus valores?

```ts
const colors = {
  red: '#f00',
  green: '#0f0',
  blue: '#00f',
} as const;
type ColorKey = keyof typeof colors;
type ColorValue = (typeof colors)[ColorKey];
```

Permite enums com validação e autocompletar sem `enum` nativo.