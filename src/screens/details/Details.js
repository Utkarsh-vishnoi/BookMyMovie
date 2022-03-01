import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/styles"
import { Link } from "react-router-dom"
import { Typography } from "@material-ui/core"
import YouTube from "react-youtube"
import GridList from "@material-ui/core/GridList"
import GridListTile from "@material-ui/core/GridListTile"
import GridListTileBar from "@material-ui/core/GridListTileBar"
import { Fragment } from "react"

import "./Details.css"
import Header from "../../common/header/Header"
import StarRating from "../../common/starRatingBar/starRatingBar"

const Details = ({ match }) => {
    const id = match.params.id
    const [movieData, setMovieData] = useState("")
    const [genres, setGenres] = useState([])
    const [youtubeUrl, setYouttubeUrl] = useState("")
    const [actors, setActors] = useState([])
    const [rating, setRating] = useState(0)
    const [userRating, setUserRating] = useState(0)

    useEffect(() => {
        fetch(`/api/v1/movies/${id}`)
            .then(response => response.json())
            .then(data => {
                setMovieData(data)
                setGenres(data.genres)
                setYouttubeUrl(data.trailer_url)
                setActors(data.artists)
                setRating(data.rating)
            })
    }, [])

    const useStyles = makeStyles({
        gridList: {
            marginLeft: "auto",
            marginRight: "auto",
            margin: "0 !important"
        },
        icon: {
            color: "rgba(255, 255, 255, 0.54)",
        },
    })

    var releaseDate = new Date(movieData.release_date).toDateString()

    let youtubeId = youtubeUrl.split("=")[1]

    let opts = {
        height: "390",
        width: "640",
        playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            origin: "http://localhost:3000",
        },
    }

    const classes = useStyles()

    return (
        <Fragment>
            <Header bookShow={true} bookShowID={id} />
            <Typography style={{ marginTop: "10px" }}>
                <Link to="/" className="back-link">
                    <span className="back-to-home">&#60; Back to Home</span>
                </Link>
            </Typography>
            <div className="details-content">
                <div className="main-content">
                    {/* First Section */}
                    <div className="first-container">
                        <img className="movie-poster" src={movieData.poster_url} alt={movieData.title} />
                    </div>
                    {/* Second Section */}
                    <div className="mid-container">
                        <div style={{
                            marginRight: "auto",
                            width: "95%"
                        }}>
                            <Typography variant="headline" component="h2" gutterBottom>
                                {movieData.title}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                <b>Genre: </b>
                                {/* {genres.map((genre) => `${genre}, `)} */}{genres.join(", ")}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                <b>Duration: </b>
                                {movieData.duration}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                <b>Release Date: </b>
                                {releaseDate}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                <b>Rating: </b>
                                {rating}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                gutterBottom
                                style={{ marginTop: "16px" }}
                            >
                                <b>
                                    Plot:&nbsp;
                                    (<a href={movieData.wiki_url} target="_blank">
                                        Wiki Link
                                    </a>)
                                </b>
                                {" " + movieData.storyline}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                gutterBottom
                                style={{ marginTop: "16px" }}
                            >
                                <b>Trailer:</b>
                                <YouTube
                                    containerClassName="youtube-container"
                                    videoId={youtubeId}
                                    autoplay
                                    opts={opts}
                                    onReady={(event) => {
                                        event.target.pauseVideo()
                                    }}
                                />
                            </Typography>
                        </div>
                    </div>
                    {/* Third section */}
                    <div className="last-container">
                        <div style={{ marginLeft: "0px" }}>
                            <Typography variant="subtitle1" gutterBottom>
                                <b>Rate this movie:</b>
                            </Typography>
                            <StarRating rating={userRating} onRatingChange={rating => setUserRating(rating)} />

                            <Typography
                                variant="subtitle1"
                                gutterBottom
                                style={{ margin: "16px 0px" }}
                            >
                                <b>Artists: </b>
                            </Typography>
                            <GridList className={classes.gridList}>
                                {actors ? (
                                    actors.map((actor) => (
                                        <GridListTile key={actor.id} className="artist-tile">
                                            <img src={actor.profile_url} alt={actor.first_name + " " + actor.last_name} />
                                            <GridListTileBar
                                                title={actor.first_name + " " + actor.last_name}
                                            />
                                        </GridListTile>
                                    ))
                                ) : (
                                    <h6>No actor data available</h6>
                                )}
                            </GridList>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Details