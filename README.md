To install dependencies:
```sh
bun install
```

To run:
```sh
bun run dev
```

open http://localhost:3000

## Summary Endpoint

You can retrieve a short summary and estimated read time for any article URL using:

```sh
curl "http://localhost:3000/summary?url=<ARTICLE_URL>"
```

The response contains `summary` and `read_time` fields.
