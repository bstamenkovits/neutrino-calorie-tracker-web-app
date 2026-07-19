import { api } from '../lib/api'

export const dataService = {
  async getIngredients() {
    return api.get('food/list-ingredients')
  },
}
