import { Checkbox, FormControlLabel, FormGroup, Slider } from "@mui/material"
import { Dispatch, SetStateAction } from "react"
import styles from "./movieFilter.module.css"
import { useGetGenresQuery } from "../../store/kinopoiskApi";

type Props = {
  years: [number, number],
  setYears: Dispatch<SetStateAction<[number, number]>>,
  genres: string[],
  setGenres: Dispatch<SetStateAction<string[]>>,
  rating: [number, number],
  setRating: Dispatch<SetStateAction<[number, number]>>,
}

const minDistance = 1;

const MoviesFilter = (props: Props) => {
  const genreList = useGetGenresQuery();

  const handleYearsChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {

    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      props.setYears([Math.min(newValue[0], props.years[1] - minDistance), props.years[1]]);
    } else {
      props.setYears([props.years[0], Math.max(newValue[1], props.years[0] + minDistance)]);
    }
  };

  const handleGenresChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.name;
    if (event.target.checked) {
      props.setGenres([
        ...props.genres,
        value
      ]);
    } else {
      props.setGenres(props.genres.filter(genre => genre !== value));
    }
  };

  const handleRatingChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {

    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      props.setRating([Math.min(newValue[0], props.rating[1] - minDistance), props.rating[1]]);
    } else {
      props.setRating([props.rating[0], Math.max(newValue[1], props.rating[0] + minDistance)]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <span className={styles.label}>Год выхода</span>
        <Slider
          value={props.years}
          onChange={handleYearsChange}
          valueLabelDisplay="auto"
          min={1990}
          max={2024}
          disableSwap
        />
      </div>
      <div className={styles.block}>
        <span className={styles.label}>Жанр</span>
        {genreList.status === 'fulfilled' &&
        <FormGroup className={styles.genres}>
          {genreList.data && genreList.data.map(e =>
            <FormControlLabel
            key={e.slug}
              control={<Checkbox
              name={e.name}
              onChange={handleGenresChange}
            />}
              label={e.name}
            />
          )}
        </FormGroup>}
      </div>
      <div className={styles.block}>
        <span className={styles.label}>Рейтинг</span>
        <Slider
          value={props.rating}
          onChange={handleRatingChange}
          valueLabelDisplay="auto"
          min={1}
          max={10}
          disableSwap
        />
      </div>
    </div>
  )
}

export default MoviesFilter