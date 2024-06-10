import * as cheerio from 'cheerio';

const BASE_URL = 'https://ollama.com';

async function getModelsFromPage({
  page = 1
}: {
  page?: number
}) {
  const res = await fetch(`${BASE_URL}/search?p=${page}`);
  const html = await res.text()

  const $ = cheerio.load(html);
  const lastPage = Number($('#repo > nav > ul').children().eq(-2).text().trim());

  const models = $('#repo > ul').children().map((_, el) => {
    const name = $(el).find('h2').text().trim();

    return name;
  }).get();

  return {
    models,
    lastPage,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < lastPage ? page + 1 : null,
  }
}

async function getAllModels() {
  const { models: firstPageModels, lastPage } = await getModelsFromPage({});

  const promises = Array
    .from({ length: lastPage - 1 }, (_, i) => i + 2)
    .map(page => getModelsFromPage({ page }));

  const allModels = await Promise.all(promises).then(res => res.map(({ models }) => models).flat());

  return [...firstPageModels, ...allModels]
}

async function getModelFromName({
  name
}: {
  name: string
}) {

  let url = BASE_URL;

  if (name.includes('/')) {
    url += `/${name}`;
  } else {
    url += `/library/${name}`;
  }

  const res = await fetch(url);
  const html = await res.text()

  const $ = cheerio.load(html);

  const description = $('body > div > main > section.flex.flex-col > h2').text().trim();
  const pullsSpan = $('body > div > main > section.flex.flex-col > p > span:nth-child(1)').text().trim();
  const pulls = pullsSpan.toLowerCase().includes('pull') ? pullsSpan.split('\n')[0] : '0';
  const lastUpdate = $('#updated').text().trim().replace('Updated ', '');

  const fileExplorer = $('#file-explorer > section > div > div')

  const modelRow = fileExplorer.children().filter((_, el) => $(el).find('div').first().text().trim() === 'model')
  const family = modelRow.find('span').eq(1).text().trim();

  const systemRow = fileExplorer.children().filter((_, el) => $(el).find('div').first().text().trim() === 'system')
  const system = systemRow.find('div').eq(1).text().trim();

  const primaryTags = $('#primary-tags').children().map((_, el) => {
    const name = $(el).find('span').first().text().trim();
    const size = $(el).find('span').eq(-1).text().trim();
    return { name, size };
  }).get();

  const secondaryTags = $('#secondary-tags').children().map((_, el) => {
    const name = $(el).find('span').first().text().trim();
    const size = $(el).find('span').eq(-1).text().trim();
    return { name, size };
  }).get();

  return {
    name,
    url,
    description,
    pulls,
    lastUpdate,
    family,
    system,
    primaryTags,
    secondaryTags
  }
}

export {
  getModelsFromPage,
  getAllModels,
  getModelFromName
}