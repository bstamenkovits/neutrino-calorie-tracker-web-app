import { useEffect } from 'react'
import { dataService } from '../services/dataService'

function LogPage() {
  useEffect(() => {
    const loadIngredients = async () => {
      try {
        const data = await dataService.getIngredients()
        console.log('Ingredients data:', data)
      } catch (error) {
        console.error('Failed to load ingredients:', error)
      }
    }

    loadIngredients()
  }, [])

  return <div>Log</div>
}

export default LogPage
