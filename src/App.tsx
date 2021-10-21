import React, { useEffect } from 'react'
import './App.css'
import Loader from './components/loader/loader'
import catError from './assets/img/error.png'
import { RootState } from './app/store'
import { fetchCatRequest, adoptCat } from './features/cat/catSlice'
import { useAppDispatch, useAppSelector } from './app/hooks'

const App = () => {
    const { cat, status, adoptedCats } = useAppSelector(
        (state: RootState) => state.cat
    )
    const dispatch = useAppDispatch()

    const fetchNewCat = () => dispatch(fetchCatRequest())
    const adoptCurrentCat = () => {
        dispatch(adoptCat())
        fetchNewCat()
    }

    useEffect(() => {
        dispatch(fetchCatRequest())
    }, [dispatch])

    return (
        <div className="App" data-testid="app">
            <div className="img-container">
                {status === 'loaded' && cat && (
                    <img alt="cat" src={cat?.url} data-testid="current-cat" />
                )}
                {status === 'loading' && <Loader />}
                {status === 'error' && (
                    <React.Fragment>
                        <img
                            src={catError}
                            alt="cat-error"
                            className="cat-error-img"
                            data-testid="error-img"
                        />
                        <div
                            className="error-message"
                            data-testid="error-message"
                        >
                            Déso, j'ai eu la flemme là frère. Réessaye.
                        </div>
                    </React.Fragment>
                )}
            </div>
            <div className="button-container">
                {status !== 'error' && (
                    <React.Fragment>
                        <button
                            disabled={status !== 'loaded'}
                            className="cat-button"
                            onClick={adoptCurrentCat}
                            data-testid="adopt-button"
                        >
                            Adopter ce chat
                        </button>
                        <button
                            className="cat-button nope"
                            onClick={fetchNewCat}
                            data-testid="fetch-button"
                        >
                            Voir un autre chat
                        </button>
                    </React.Fragment>
                )}
                {status === 'error' && (
                    <button
                        className="cat-button retry"
                        onClick={fetchNewCat}
                        data-testid="retry-button"
                    >
                        Réessayer
                    </button>
                )}
            </div>
            {adoptedCats.length > 0 && (
                <div
                    className="adopted-cats-container"
                    data-testid="collection"
                >
                    <h1>
                        {`Mes chats (`}
                        <span data-testid="adopted-cat-count">
                            {adoptedCats.length}
                        </span>
                        {`)`}
                    </h1>
                    <div className="adopted-cats">
                        {adoptedCats.map((cat) => (
                            <div
                                key={cat?.id}
                                className="adopted-cat"
                                data-testid="adopted-cat"
                            >
                                <img alt="adopted-cat" src={cat?.url} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
