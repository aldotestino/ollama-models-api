import { getAllModels, getModelFromName, getModelsFromPage } from "@/scraper";

// const models = await getModelsFromPage({ page: 0 })
// const model = await getModelFromName({ name: models.models[0] })

// const allModels = await getAllModels()
const allModels = await getAllModels()

console.log(allModels)