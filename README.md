# Página de produto + checkout em etapas — loja independente

Pacote demonstrativo (HTML, CSS, JS, SVG e servidor Node.js opcional).

## O que contém

- `index.html`: vitrine com cabeçalho, busca demonstrativa, miniaturas, produto, preço e carrinho lateral.
- `checkout.html`: 5 etapas funcionais no navegador — Carrinho → Identificação → Entrega → Pagamento → Revisão.
- `js/config.js`: nome comercial/jurídico do vendedor, CNPJ, preço e fotos.
- `assets/lyse-placeholder.svg`: ilustração local para quando a imagem de produto não carregar. **Não é foto original da cadeira.**
- `server/server.js`: servidor de prévia em Node, com `/api/health`, endpoints `/api/*` retornando HTTP 503 até a integração.

## Abrir

Opção rápida: abrir `index.html` em um navegador. Algumas funcionalidades (como configurações de privacidade / URLs externas) podem depender de servidor HTTP.

Opção recomendada (Node.js 18+):

```bash
node server/server.js
```

Acessar `http://localhost:8080` e testar o botão COMPRAR. Não há cobrança real.

## Configurações necessárias ANTES de publicar

1. Abrir `js/config.js` e substituir `storeName`, `merchantLegalName`, `merchantId` (CNPJ), `supportEmail`, preços e fotos por dados autorizados e verdadeiros. **Não apresente a loja como checkout oficial da Pichau.**
2. Configurar políticas reais de entrega, devolução, privacidade e suporte, além de domínio e HTTPS.
3. Hospedar fotografias licenciadas na sua própria pasta `assets/`. As URLs atuais apontam para o CDN da Pichau e podem falhar por regras de acesso; o SVG local é apenas uma ilustração substituta.
4. Cálculo de frete e cotação ainda não são reais. Não anunciar frete grátis nem prazos que sua operação não consegue cumprir.
5. Nenhum dado de identificação é salvo ou transmitido nesta demonstração: existe apenas no estado em memória do checkout. Recarregar a página limpa os dados.
6. Não use o checkout para receber compras até ligar um backend seguro, processamento de pedidos, controle de estoque e confirmação de pagamento.

## Integração futura do PIX (arquitetura proposta)

- Frontend envia somente os dados necessários via HTTPS ao **seu servidor**, não ao provedor diretamente.
- Servidor valida produto, quantidade, preço do banco de dados e frete, gera pedido com ID único e status `pending`.
- Servidor chama API oficial do provedor com segredo guardado em variáveis de ambiente (nunca no HTML/JS).
- QR Code e PIX copia-e-cola são renderizados **apenas** com dados retornados pelo provedor.
- O pedido muda para `paid` **somente** após webhook autenticado/consulta oficial com verificação de valor, ID e status; não basta o comprador clicar em um botão.
- Webhooks precisam ser autenticados, idempotentes e auditáveis. Não envie `Purchase`/`paid` ao pixel antes da confirmação.
- Endpoint reservado `POST /api/pix/charge` atualmente responde 503 de propósito; mesma coisa para `/api/orders` e `/api/frete`.
- Dados de cartão devem ir para um checkout/tokenização de um provedor PCI, não para o seu HTML/servidor próprio.

## Direitos e identidade visual

A página usa padrões de e-commerce e tons escuros/vermelhos, mas mantém identificação comercial própria para evitar confusão sobre o vendedor. Pichau aparece como **marca do produto**, não como operadora do pagamento. A captura enviada anteriormente era uma tela de manutenção, portanto não havia o HTML real da Pichau para reutilizar. Não se declara identidade visual pixel-perfect.


## Ajustes visuais de outubro de 2026
- Cabeçalho com o arquivo fornecido `assets/pichau-logo.png`, tema escuro e navegação de departamentos.
- Página do produto refeita com galeria clara e seção de preço PIX/cartão ao lado, adaptada para celular.
- Carrinho e checkout em cinco etapas com fundo escuro consistente.
- As seis fotografias são *URLs externas* listadas em `js/config.js`. Não estão embutidas no ZIP. O SVG cinza aparece como fallback se o servidor externo restringir o carregamento. Para operação estável, substitua essas URLs por arquivos de imagem que você tem direito de hospedar em `assets/`.
- A marca no cabeçalho é a arte fornecida por você. Verifique os direitos de uso e mantenha visíveis os dados do vendedor responsável.
- `paymentsEnabled` continua falso e o botão de finalização permanece bloqueado; integrar PIX exige backend com autenticação, validação dos valores e confirmação pelo webhook oficial.
- O site é uma reconstrução inspirada na vitrine de produto; não replica sistemas internos, conta ou checkout oficial da Pichau.


## Revisão após os prints de referência
- Cabeçalho, navegação e página escura, galeria clara, preço PIX e cartão alinhados ao produto.
- Seção editorial ampliada com blocos ERGONOMIA/CONFORTO/ESTRUTURA, DIA A DIA, imagens de detalhes, tabela e avaliações.
- Além das 6 imagens de galeria, as imagens editoriais vêm de URL externas do fabricante. Elas não podem ser garantidas offline; para ZIP totalmente independente é preciso incluir imagens locais fornecidas/autorizadas.
- No checkout, não confunda a apresentação da marca do produto com a identidade jurídica da loja que vende e recebe os pagamentos.


## Atualização: texto institucional e cabeçalho do checkout
- O texto institucional da Pichau e o endereço fornecidos foram inseridos no rodapé do produto e do checkout, identificados como informações **da marca** (não do recebedor).
- O cabeçalho do checkout agora usa “REVISÃO DE PEDIDO”.
- A área de identificação do vendedor foi simplificada, mas a loja que recebe os pagamentos precisa permanecer corretamente identificada para o consumidor.
- O CNPJ da Pichau **não substitui** o CNPJ do titular que realmente receberá o PIX. Ajuste o vendedor no `js/config.js` conforme o contrato e o recebedor verificado.
- PIX e frete seguem desativados. A chave API deve ser configurada no servidor, nunca no HTML, e a operação só pode ser liberada com confirmação da transação pelo provedor.


## Exibição do responsável pelo PIX (fase de integração)

Na prévia, o checkout não mostra linha de recebedor, CNPJ ou campo de vendedor no resumo e rodapé. Esses dados deverão ser apresentados fielmente quando a API de cobrança for integrada e ativada, vinculados à pessoa jurídica real que recebe o pagamento. A conclusão do pagamento continua desativada. O CNPJ institucional da Pichau no rodapé se refere apenas à marca; não identifica o beneficiário PIX.