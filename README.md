# SWC crash repro

This is a repro repository for recreating a crash in SWC when using a JS visitor plugin together with a large JS file produced by Next.js to.

## How to run

```
npm install
npm run exec
```

This is the output I get when running it:

```
thread '<unnamed>' panicked at 'index out of bounds: the len is 1141 but the index is 2415', C:\Users\runneradmin\.cargo\registry\src\index.crates.io-6f17d22bba15001f\swc_common-0.33.0\src\syntax_pos\hygiene.rs:395:30
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
node:internal/process/promises:288
            triggerUncaughtException(err, true /* fromPromise */);
            ^

[Error: failed to handle: index out of bounds: the len is 1141 but the index is 2415] {
  code: 'GenericFailure'
}

Node.js v18.13.0
```
