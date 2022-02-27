import React from "react"
import { makeStyles } from '@material-ui/styles'
import { GridList, GridListTile, GridListTileBar } from "@material-ui/core"
import { Link } from "react-router-dom"

const useStyles = makeStyles({
    titleBar: {
        background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%) !important",
    }
})

const ReleasedMovies = ({ movies }) => {
    const classes = useStyles()

    return (
        <div>
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
                                    classes={{
                                        root: classes.titleBar
                                    }}>
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