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

export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string[];
  created: string;
};
