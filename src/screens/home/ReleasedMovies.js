import React from "react"
import { makeStyles } from '@material-ui/styles'
import { GridList, GridListTile, GridListTileBar, IconButton } from "@material-ui/core"
import { Link } from "react-router-dom"

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
    },
    gridList: {
        width: 1000,
        height: 1050,
    },
    icon: {
        color: "rgba(255, 255, 255, 0.54)",
    },
})

const ReleasedMovies = ({ movies }) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <GridList cellHeight={350} cols={4}>
                {
                    movies.map((tile) => {
                        let expectedDate = new Date(tile.release_date).toDateString()
                        return (
                            <GridListTile key={tile.id}>
                                <Link to={"/movie-details/" + tile.id}>
                                    <img
                                        src={tile.poster_url}
                                        alt={tile.title}
                                        style={{
                                            width: "100%",
                                            alignItems: "center",
                                            margin: "0px",
                                        }}
                                    />
                                </Link>
                                <GridListTileBar
                                    title={tile.title}
                                    subtitle={<span>Release Date: {expectedDate}</span>}
                                    actionIcon={
                                        <IconButton
                                            aria-label={`info about ${tile.title}`}
                                            className={classes.root} />
                                    }>
                                </GridListTileBar>
                            </GridListTile>
                        )
                    })
                }
            </GridList>
        </div>
    )
}

export default ReleasedMovies