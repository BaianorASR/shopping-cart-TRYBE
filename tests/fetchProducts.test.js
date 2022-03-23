require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('verifica se fetchProduct é uma função', () => {
    expect(typeof fetchProducts).toBe('function')
  })
  it('verifica se fetch foi chamada', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled()
  })
  it('verifica se ao fetch é chamado o endpoint correto', async () => {
    const url = "https://api.mercadolibre.com/sites/MLB/search?q=computador";
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url)
  })
  it('verifica se o retorno é igual ao objeto computadorSearch', async () => {
    const response = await fetchProducts('computador');
    expect(response).toEqual(computadorSearch)
  })
  it('verifica error ao chamar sem parametros', async () => {
    const response = await fetchProducts();
    expect(response).toEqual(new Error('You must provide an url'))
  })
});
