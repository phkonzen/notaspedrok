# Site do professor

Este site Jekyll é publicado em <https://notaspedrok.com.br/prof/>. O domínio
e o prefixo de caminho estão definidos em `_config.yml` (`url` e `baseurl`).

## Desenvolvimento local

Instale as dependências uma vez e inicie o servidor local:

```sh
export BUNDLE_PATH="$HOME/.bundle/gems/prof"
bundle install
bundle exec jekyll serve --livereload --baseurl ""
```

Abra <http://127.0.0.1:4000/>. O `baseurl` vazio é usado apenas na prévia local.

## Publicação

O repositório principal publica o conteúdo de `docs/` do repositório
`phkonzen/notaspedrok`. Para publicar este site em `docs/prof/`, execute
`pub/deploy.sh` na raiz deste repositório. O script compila o site com o bundle
compatível com GitHub Pages (instalando dependências que estiverem faltando) e
envia os arquivos gerados para esse diretório.