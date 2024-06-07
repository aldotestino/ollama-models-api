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

async function getModelFromName({
  name
}: {
  name: string
}) {
  const res = await fetch(`${BASE_URL}/library/${name}`);
  const html = await res.text()

  const $ = cheerio.load(html);

  const description = $('body > div > main > section.flex.flex-col > h2').text().trim();
  const pulls = $('body > div > main > section.flex.flex-col > p > span:nth-child(1)').text().trim().split('\n')[0];
  const lastUpdate = $('#updated').text().trim().replace('Updated ', '');

  const fileExplorer = $('#file-explorer > section > div > div')

  const modelRow = fileExplorer.children().filter((_, el) => $(el).find('div').first().text().trim() === 'model')
  const family = modelRow.find('span').eq(1).text().trim();

  const systemRow = fileExplorer.children().filter((_, el) => $(el).find('div').first().text().trim() === 'system')
  const system = systemRow.find('div').eq(1).text().trim();

  const primaryTags = $('#primary-tags').children().map((_, el) => {
    const tagName = $(el).find('span').first().text().trim();
    const tagSize = $(el).find('span').eq(-1).text().trim();
    return { tagName, tagSize };
  }).get();

  const secondaryTags = $('#secondary-tags').children().map((_, el) => {
    const tagName = $(el).find('span').first().text().trim();
    const tagSize = $(el).find('span').eq(-1).text().trim();
    return { tagName, tagSize };
  }).get();

  return {
    name,
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
  getModelFromName
}