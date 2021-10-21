import { catType } from './catSlice'

export const fetchCatRequestAPI = async (): Promise<catType> => {
    const response = await fetch(
        'https://api.thecatapi.com/v1/images/search?mime_types=gif&size=med',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': '2aae974e-1039-408d-aff1-d839557f017a',
            },
        }
    )

    const jsonResponse = await response.json()
    const { errors } = jsonResponse
    // check if we got a correct response
    if (response.ok) {
        const cat = jsonResponse[0]
        // Check if we got a cat inside the response
        if (cat) {
            return cat
        } else {
            return Promise.reject(new Error(`No cat fetched`))
        }
        // If response not correct, we concat all error messages into a new one
    } else {
        const error = new Error(
            errors?.map((e: Error) => e.message).join('\n') ?? 'unknown'
        )
        return Promise.reject(error)
    }
}
