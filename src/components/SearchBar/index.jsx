import { useState } from 'react';
import Button from '../Button';
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../Input';
import { searchTrack } from '../../lib/api';
import {setLogout} from '../../redux/authReducer';

function SearchBar({ onSuccess, onClearSearch }) {
  const accessToken = useSelector(state => state.auth.accessToken);

  const [text, setText] = useState('');
  const [isClear, setIsClear] = useState(true);

  const dispatch = useDispatch();
  
  const handleInput = (e) => {
    setText(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await searchTrack(text, accessToken);

      const tracks = response.tracks.items;
      onSuccess(tracks, text);
      setIsClear(false);
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(setLogout());
      }else{
        console.log(error, "Error nih!");
      }
    }
  }

  const handleClear = () => {
    onClearSearch();
    setText('');
    setIsClear(true);
  }

  return (
    <div>
      <form className="form-search" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Cari..."
          className="form-search__input"
          required
          value={text}
          onChange={handleInput}
        />
        <Button type="submit">Search</Button>
      </form>

      {!isClear && (
        <Button variant="text" onClick={handleClear} className="mt-1">Clear search</Button>
      )}
    </div>
  )
}

export default SearchBar

SearchBar.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onClearSearch: PropTypes.func.isRequired,
}
