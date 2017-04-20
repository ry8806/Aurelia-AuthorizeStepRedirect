export class ApiService {
	public IsLoggedIn: boolean = false;
	public RouteFragment: string;

	public Login(username: string, password: string) {
		// TODO: Make a proper service call to an API

		this.IsLoggedIn = true;
	}

	public GetSong(id: number) {
		// TODO: Make a proper service call to an API
		let song = new Song();

		song.Id = id;
		song.Album = "Blur";
		song.Artist = "Blur";
		song.Name = "Song" + id;
		song.Duration = 122;
		song.Rating = 2;

		return song;
	}
}

export class Song {
	Id: number;
	Artist: string;
	Album: string;
	// In seconds
	Duration: number;
	Name: string;
	Rating: number;
}