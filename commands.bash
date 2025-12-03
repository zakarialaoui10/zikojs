find src/ -name '*.js' -print0 | xargs -0 cat | wc -l

find types/ -name '*.d.ts' -print0 | xargs -0 cat | wc -l