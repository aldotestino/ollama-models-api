import { getModelFromName, getModelsFromPage } from "@/scraper";

const models = await getModelsFromPage({ page: 2 })
const model = await getModelFromName({ name: models.models[2] })

console.log(models)
console.log(model)