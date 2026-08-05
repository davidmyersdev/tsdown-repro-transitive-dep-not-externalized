# tsdown-repro-transitive-dep-not-externalized

## Problem

When building with `tsdown`, the build fails with errors indicating that certain exports are missing from dependencies like `ignore` and `typescript`. These errors originate from `@nuxt/schema`, a dependency of `@nuxt/kit`. This is unexpected though, because `@nuxt/kit` is listed as a peer dependency and therefore should be externalized and not bundled.

## Reproduction

To see the changes I made on top of the repro template, look at [this commit](https://github.com/davidmyersdev/tsdown-repro-transitive-dep-not-externalized/commit/main).

```sh
npm install
npm run build
```

```
 ERROR  Error: Build failed with 4 errors:

[MISSING_EXPORT] "Ignore" is not exported by "node_modules/ignore/index.d.ts".
    ╭─[ node_modules/@nuxt/schema/dist/index.d.ts:12:10 ]
    │
 12 │ import { Ignore, Options } from 'ignore';
    │          ───┬──
    │             ╰──── Missing export
    │
    │ Note: If you meant to import a type rather than a value, make sure to add the `type` modifier (e.g. `import { type Foo } from 'ignore'`).
────╯

[MISSING_EXPORT] "Options" is not exported by "node_modules/ignore/index.d.ts".
    ╭─[ node_modules/@nuxt/schema/dist/index.d.ts:12:18 ]
    │
 12 │ import { Ignore, Options } from 'ignore';
    │                  ───┬───
    │                     ╰───── Missing export
    │
    │ Note: If you meant to import a type rather than a value, make sure to add the `type` modifier (e.g. `import { type Foo } from 'ignore'`).
────╯

[MISSING_EXPORT] "CompilerOptions" is not exported by "node_modules/typescript/lib/typescript.d.ts".
   ╭─[ node_modules/pkg-types/dist/index.d.ts:2:10 ]
   │
 2 │ import { CompilerOptions, TypeAcquisition } from 'typescript';
   │          ───────┬───────
   │                 ╰───────── Missing export
   │
   │ Note: If you meant to import a type rather than a value, make sure to add the `type` modifier (e.g. `import { type Foo } from 'typescript'`).
───╯

[MISSING_EXPORT] "TypeAcquisition" is not exported by "node_modules/typescript/lib/typescript.d.ts".
   ╭─[ node_modules/pkg-types/dist/index.d.ts:2:27 ]
   │
 2 │ import { CompilerOptions, TypeAcquisition } from 'typescript';
   │                           ───────┬───────
   │                                  ╰───────── Missing export
   │
   │ Note: If you meant to import a type rather than a value, make sure to add the `type` modifier (e.g. `import { type Foo } from 'typescript'`).
───╯

    at aggregateBindingErrorsIntoJsError (file:///private/tmp/tsdown-starter-stackblitz/node_modules/rolldown/dist/shared/error-nLggAzpQ.mjs:48:18)
    at unwrapBindingResult (file:///private/tmp/tsdown-starter-stackblitz/node_modules/rolldown/dist/shared/error-nLggAzpQ.mjs:18:128)
    at #build (file:///private/tmp/tsdown-starter-stackblitz/node_modules/rolldown/dist/shared/rolldown-D23fYgSS.mjs:132:34)
    at async build (file:///private/tmp/tsdown-starter-stackblitz/node_modules/rolldown/dist/index.mjs:48:22)
    at async Promise.all (index 0)
    at async buildSingle (file:///private/tmp/tsdown-starter-stackblitz/node_modules/tsdown/dist/build-D_enfyvD.mjs:806:19)
    at async Promise.all (index 0)
    at async buildWithConfigs (file:///private/tmp/tsdown-starter-stackblitz/node_modules/tsdown/dist/build-D_enfyvD.mjs:762:18)
    at async CAC.<anonymous> (file:///private/tmp/tsdown-starter-stackblitz/node_modules/tsdown/dist/run.mjs:21:2)
    at async runCLI (file:///private/tmp/tsdown-starter-stackblitz/node_modules/tsdown/dist/run.mjs:45:3)
```
