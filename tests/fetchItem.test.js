require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function')
  })
  it('função fetchItem com o argumento do item "MLB1615760527", se fetch foi chamada', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })
  it('verifica se o url passado por parametro esta correto', async () => {
    const url = 'https://api.mercadolibre.com/items/MLB1615760527'
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledWith(url);
  })
  it('se o retorno é igual o item', async () => {
    const response = await fetchItem('MLB1615760527')
    expect(response).toEqual(item)
  })
  it('se ao chamar a função fetchItem sem argumento retorna um erro', async () => {
    const response = await fetchItem();
    expect(response).toEqual(new Error('You must provide an url'))
  })
});
