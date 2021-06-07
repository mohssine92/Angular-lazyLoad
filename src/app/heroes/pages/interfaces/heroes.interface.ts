export interface Heroe {
  id?:               string; /* para no dar error , el ide se crea en DB  */
  superhero:        string;
  publisher:        Publisher;
  alter_ego:        string;
  first_appearance: string;
  characters:       string;
  alt_img?:         string;

}

export enum Publisher {
  DCComics = "DC Comics",
  MarvelComics = "Marvel Comics",
}


export interface HeroreAndLength {
  Lenght : number | undefined ,
  url: string | undefined
};
