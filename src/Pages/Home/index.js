import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Track from "../../components/Track";
import SearchBar from "../../components/SearchBar";
import config from "../../lib/config";
import Button from "../../components/Button";
import CreatePlaylistForm from "../../components/CreatePlaylistForm";
import { getUserProfile } from "../../lib/api";
import { setLogin } from "../../redux/authReducer";
import "./style.css";

function Home() {
  const [tracks, setTracks] = useState([]);
  const [selectedTracksUri, setSelectedTracksUri] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [isInSearch, setIsInSearch] = useState(false);

  const isAuthorize = useSelector((state) => state.auth.isAuthorize);
  const dispatch = useDispatch();

  useEffect(() => {
    const accessTokenParams = new URLSearchParams(window.location.hash).get(
      "#access_token"
    );

    if (accessTokenParams !== null) {
      const setUserProfile = async () => {
        try {
          const responseUser = await getUserProfile(accessTokenParams);

          dispatch(
            setLogin({ accessToken: accessTokenParams, user: responseUser })
          );
        } catch (error) {
          console.log(error, "Error nih!");
        }
      };

      setUserProfile();
    }
  }, []);

  useEffect(() => {
    if (!isInSearch) {
      setTracks(selectedTracks);
    }
  }, [selectedTracksUri, selectedTracks, isInSearch]);

  const getSpotifyLinkAuthorize = () => {
    const state = Date.now().toString();
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
  };

  const onSuccessSearch = (searchTracks) => {
    setIsInSearch(true);

    const selectedSearchTracks = searchTracks.filter((track) =>
      selectedTracksUri.includes(track.uri)
    );

    setTracks([...new Set([...selectedSearchTracks, ...searchTracks])]);
  };

  const clearSearch = () => {
    setTracks(selectedTracks);
    setIsInSearch(false);
  };

  const toggleSelect = (track) => {
    const uri = track.uri;

    if (selectedTracksUri.includes(uri)) {
      setSelectedTracksUri(selectedTracksUri.filter((item) => item !== uri));
      setSelectedTracks(selectedTracks.filter((item) => item.uri !== uri));
    } else {
      setSelectedTracksUri([...selectedTracksUri, uri]);
      setSelectedTracks([...selectedTracks, track]);
    }
  };

  return (
    <>
      {!isAuthorize && (
        <main className="center">
          <h1>Spotify Playlist Creator</h1>
          <Button href={getSpotifyLinkAuthorize()}>Login</Button>
        </main>
      )}

      {isAuthorize && (
        <main className="container" id="home">
          <CreatePlaylistForm uriTracks={selectedTracksUri} />

          <hr />

          <SearchBar onSuccess={onSuccessSearch} onClearSearch={clearSearch} />

          <div className="content">
            {tracks.length === 0 && <p>Tidak ada Tracks</p>}

            <div className="tracks">
              {tracks.map((track) => (
                <Track
                  key={track.id}
                  imageUrl={track.album.images[0].url}
                  title={track.name}
                  artist={track.artists[0].name}
                  select={selectedTracksUri.includes(track.uri)}
                  toggleSelect={() => toggleSelect(track)}
                />
              ))}
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default Home;
