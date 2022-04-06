import { useState } from 'react';
import Button from '../Button';
import './style.css';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../Input';
import { searchTrack } from '../../lib/api';

function SearchBar({ onSuccess, onClearSearch }) {
  const accessToken = useSelector(state => state.auth.accessToken);

  const [text, setText] = useState('');
  const [isClear, setIsClear] = useState(true);

  const handleInput = (e) => {
    setText(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await searchTrack(text, accessToken);

      const tracks = response.tracks.items;
      onSuccess(tracks);
      setIsClear(false);
    } catch (error) {
      console.log(error, "Error nih!");
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
