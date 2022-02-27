import { Button, Card, CardContent, Checkbox, FormControl, GridList, GridListTile, GridListTileBar, Input, InputLabel, ListItemText, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'

import Header from "../../common/header/Header"
import Heading from "../../common/heading/Heading"
import ReleasedMovies from "./ReleasedMovies"

import "./Home.css"

const useStyles = makeStyles(theme => ({
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

    cardComponent: {
        minWidth: "240px !important",
        maxWidth: "240px",
        margin: theme.spacing.unit,
        width: "100%",
        marginTop: "20px !important"
    },

    cardContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },

    cardHeading: {
        color: theme.palette.primary.light + " !important",
        textTransform: "uppercase"
    }
}))

const Home = () => {

    const [movies, setMovies] = useState([])
    const [displayedMovies, setDisplayedMovies] = useState([])
    const [movieChoice, setMovieChoice] = useState("")
    const [genres, setGenres] = useState([])
    const [genreChoice, setGenreChoice] = useState([])
    const [artists, setArtists] = useState([])
    const [artistChoice, setArtistChoice] = useState([])
    const [releaseStartDate, setReleaseStartDate] = useState("")
    const [releaseEndDate, setReleaseEndDate] = useState("")

    useEffect(() => {
        async function fetchData() {
            let rawResponse = await fetch("/api/v1/movies")
            let payload = await rawResponse.json()
            setMovies(payload.movies)
            setDisplayedMovies(payload.movies)

            rawResponse = await fetch("/api/v1/genres")
            payload = await rawResponse.json()
            setGenres(payload.genres)

            rawResponse = await fetch("/api/v1/artists")
            payload = await rawResponse.json()
            setArtists(payload.artists)
        }
        fetchData()
    }, [])

    const handleGenreChange = (event) => {
        setGenreChoice(event.target.value)
    }

    const handleArtistChange = (event) => {
        setArtistChoice(event.target.value)
    }

    const classes = useStyles()

    const ITEM_HEIGHT = 48
    const ITEM_PADDING_TOP = 8
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    }

    const filterHandler = () => {
        const startDate = new Date(releaseStartDate).getTime()
        const endDate = new Date(releaseEndDate).getTime()

        let displayedMovies = movies.filter(movie => {
            return movie.title.toLowerCase().indexOf(movieChoice.toLowerCase()) > -1
        })
        displayedMovies = displayedMovies.filter(movie => {
            const releaseDate = new Date(movie.release_date).getTime()
            if (isNaN(startDate) && isNaN(endDate))
                return true
            else if (isNaN(endDate))
                return startDate <= releaseDate
            else if (isNaN(startDate))
                return releaseDate <= endDate
            else
                return (startDate <= releaseDate && releaseDate <= endDate)
        })

        displayedMovies = displayedMovies.filter(movie => {
            return genreChoice.every(genre => movie.genres.includes(genre))
        })

        displayedMovies = displayedMovies.filter(movie => {
            return artistChoice.every(artist => movie.artists.includes(artist))
        })
        setDisplayedMovies(displayedMovies)
    }

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
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
            <div className="second-section">
                <div className="released-movies">
                    <ReleasedMovies movies={displayedMovies} />
                </div>
                <div className='filter-form'>
                    <Card>
                        <CardContent className={classes.cardContent}>
                            <Typography className={classes.cardHeading}>find movies by:</Typography>
                            <FormControl className={classes.cardComponent} >
                                <TextField id="standard-basic" label="Movie Name" value={movieChoice} onChange={(event) => setMovieChoice(event.target.value)} />
                            </FormControl>
                            <FormControl className={classes.cardComponent}>
                                <InputLabel htmlFor="genres">Genres</InputLabel>
                                <Select
                                    labelid="genres-label"
                                    multiple
                                    value={genreChoice}
                                    onChange={handleGenreChange}
                                    renderValue={selected => selected.join(', ')}
                                    input={<Input id="genres" />}
                                    MenuProps={MenuProps}
                                >
                                    {genres.map(genre => (
                                        <MenuItem key={genre.id} value={genre.genre}>
                                            <Checkbox color="primary" checked={genreChoice.indexOf(genre.genre) > -1} />
                                            <ListItemText primary={genre.genre} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.cardComponent}>
                                <InputLabel htmlFor="artists">Artists</InputLabel>
                                <Select
                                    labelid="artists-label"
                                    multiple
                                    value={artistChoice}
                                    onChange={handleArtistChange}
                                    renderValue={selected => selected.join(', ')}
                                    input={<Input id='artists' />}
                                    MenuProps={MenuProps}
                                >
                                    {artists.map(artist => (
                                        <MenuItem
                                            key={artist.id}
                                            value={artist.first_name + " " + artist.last_name}
                                        >
                                            <Checkbox color="primary" checked={artistChoice.indexOf(artist.first_name + " " + artist.last_name) > -1} />
                                            <ListItemText primary={artist.first_name + " " + artist.last_name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.cardComponent}>
                                <TextField
                                    name="Release Date Start"
                                    type="date"
                                    value={releaseStartDate}
                                    onChange={e => setReleaseStartDate(e.target.value)}
                                    label="Release Date Start"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </FormControl>
                            <FormControl className={classes.cardComponent}>
                                <TextField
                                    name="Release Date End"
                                    type="date"
                                    label="Release Date End"
                                    value={releaseEndDate}
                                    onChange={e => setReleaseEndDate(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </FormControl>
                            {/* <div> */}
                            <FormControl className={classes.cardComponent}>
                                <Button variant="contained" name="Apply" color="primary" onClick={filterHandler}>
                                    Apply
                                </Button>
                            </FormControl>
                            {/* </div> */}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home