import { Song } from "./song";

export interface Album {
    _id: string,
    title: string,
    description: string,
    artists: [string],
    songs: [Song],
    genres: [string]
}
