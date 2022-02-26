import { GridList, GridListTile, GridListTileBar, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'

import Header from "../../common/header/Header"
import Heading from "../../common/heading/Heading"
import ReleasedMovies from "./ReleasedMovies"

import "./Home.css"

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        marginBottom: "15px",
    },
    gridList: {
        flexWrap: "nowrap !important",
        transform: "translateZ(0)",
    },

    titleBar: {
        background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%) !important",
    },
})

const Home = () => {

    const [movies, setMovies] = useState([])

    useEffect(() => {
        fetch("/api/v1/movies")
            .then((response) => response.json())
            .then((payload) => setMovies(payload.movies))
    })

    const classes = useStyles()

    return (
        <React.Fragment>
            <Header bookShow={false}></Header>
            <Heading />
            <div className={classes.root}>
                <GridList className={classes.gridList} cols={6} cellHeight={250}>
                    {movies.map((tile) => (
                        <GridListTile key={tile.id}>
                            <img src={tile.poster_url} alt={tile.title} />
                            <GridListTileBar
                                title={tile.title}
                                classes={{
                                    root: classes.titleBar,
                                    title: classes.title,
                                }}
                                actionIcon={<IconButton aria-label={`star ${tile.title}`} />}
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
            <div className="second-section">
                <div className="released-movies">
                    <ReleasedMovies movies={movies} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home