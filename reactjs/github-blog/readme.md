<div align="center">
  <img src=".github/cover.png" alt="Logo mostrando o nome do app GitHub Blog" />
</div>

## Descrição

A ideia deste projeto é utilizar as issues do github como um sistema de blog. Cada issue corresponde a uma postagem em nosso GitHub Blog. Todas as postagens se encontram neste repositório, [veja](https://github.com/lhmoreno/github-blog/issues).

## Preview de como ficou

<div align="center">
  <img width="800px" src=".github/preview.gif" alt="Uma amostra do funcionamento do app" />
</div>

## Tecnologias utilizadas

- [react](https://github.com/facebook/react) - para desenvolver o frontend web
- [vite](https://github.com/vitejs/vite) - para configurar e otimizar nosso projeto ReactJS
- [typeScript](https://github.com/microsoft/TypeScript) - para adicionar tipagem ao nosso código javascript
- [phosphor-react](https://github.com/phosphor-icons/react) - para adicionar icones
- [date-fns](https://github.com/date-fns/date-fns) - para lidar com a renderização das datas
- [react-markdown](https://github.com/remarkjs/react-markdown) - para transformar arquivo markdown em elementos no react
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) - para estilizar e destacar amostras de código no markdown
- [react-query](https://github.com/TanStack/query) - para criar um cache das nossas requisições ao GitHub

## Funcionalidades

- [x] **Página inicial**
  - [x] Mostrar as informações da minha conta do GitHub
  - [x] Listar issues (posts)
  - [x] Buscar posts 
- [x] **Post**
  - [x] Mostrar dados principais do post
  - [x] Mostrar markdown do post (tema oneDark)
- [x] **Performance**
  - [x] Criar cache dos posts (react-query)

<br />

Feito com 💙 por [lhmoreno](https://github.com/lhmoreno)
