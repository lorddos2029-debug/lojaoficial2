/* Dados do vendedor informados pelo responsável. Estoque, contato e pagamentos ainda precisam ser validados. */
window.STORE_CONFIG = Object.freeze({
  storeName: 'BOSS MARKETPLACE',
  merchantLegalName: 'BOSS MARKETPLACE LTDA',
  merchantId: '69.217.430/0001-66',
  supportEmail: 'Contato não informado',
  productName: 'Cadeira Pichau Office Lyse, Full Mesh, Braço 5D, Base Alumínio, Cinza',
  productSku: 'PCH-LYS-GY',
  productPricePix: 1699.99,
  productPriceCard: 1999.99,
  productPriceOld: 2399.99,
  currency: 'BRL',
  photos: [
    'https://media.pichau.com.br/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/p/c/pch-lys-gy2_1.jpg',
    'https://media.pichau.com.br/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/p/c/pch-lys-gy_1.jpg',
    'https://media.pichau.com.br/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/p/c/pch-lys-gy1_1.jpg',
    'https://media.pichau.com.br/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/p/c/pch-lys-gy5_1.jpg',
    'https://media.pichau.com.br/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/p/c/pch-lys-gy6_1.jpg',
    'https://media.pichau.com.br/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/p/c/pch-lys-gy4_1.jpg'
  ],
  paymentsEnabled: false, // habilite SOMENTE depois de integrar/validar seu backend
  deliveryEnabled: false // habilite SOMENTE depois de integrar cálculo real de frete
});
