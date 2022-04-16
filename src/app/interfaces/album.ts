import { Song } from "./song";

export interface Album {
    id: string,
    title: string,
    description: string,
    artists: [string],
    songs: [Song],
    genres: [string],
    favouritesNo: number
}
