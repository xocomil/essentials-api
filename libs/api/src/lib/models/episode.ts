/**
 *
 * Key  Type  Description
 * id  int  The id of the episode.
 * name  string  The name of the episode.
 * air_date  string  The air date of the episode.
 * episode  string  The code of the episode.
 * characters  array (urls)  List of characters who have been seen in the episode.
 * url  string (url)  Link to the episode's own endpoint.
 * created  string  Time at which the episode was created in the database.
 */

/*
{
    "count": 51,
    "pages": 3,
    "next": "https://rickandmortyapi.com/api/episode?page=2",
    "prev": null
}
 */
export type EpisodeInfo = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string[];
  created: string;
};

export type EpisodeResponse = {
  info: EpisodeInfo;
  results: Episode[];
};

export const emptyEpisode = () => ({
  id: -1,
  name: 'Empty Episode',
  air_date: 'never',
  episode: 'unaired',
  characters: [],
  url: [],
  created: 'never',
});
