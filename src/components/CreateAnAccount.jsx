export default function CreateAnAccount() {
  return (
    <>
      <h1>Forme</h1>

      <form>
        <fieldset>
          <legend>Personalne informacije</legend>

          <input type="text" name="ImeKorisnika" id="name" placeholder="Ime" />
          <br />
          <br />

          <input type="text" name="PrezimeKorisnika" id="LastName" placeholder="Prezime" />
          <br />
          <br />

          <label htmlFor="eml">Email: </label>
          <input type="email" name="Email" id="eml" />
          <br />
          <br />

          <label htmlFor="pwd">Lozinka: </label>
          <input type="password" name="Lozinka" id="pwd" />
          <br />
          <br />

          <label htmlFor="city">Grad (skraćeni naziv): </label>
          <input type="text" name="grad" id="city" size="10" maxLength="2" />
        </fieldset>
        <br />
        <br />

        <fieldset>
          <legend>Detalji narudžbine</legend>

          <label htmlFor="qty">Unesite količinu (između 1 i 5): </label>
          <input type="number" name="kolicina" id="qty" min="1" max="5" />
          <br />
          <br />

          <label htmlFor="cars">Automobil: </label>
          <select name="automobil" id="cars">
            <option disabled selected>
              Izaberite...
            </option>
            <option>Volvo</option>
            <option>Fiat</option>
            <option>Audi</option>
            <option>Saab</option>
            <option>Zastava</option>
          </select>
          <br />
          <br />

          <label htmlFor="birthday">Rođendan: </label>
          <input type="date" name="rodjendan" id="birthday" />
          <input type="time" name="vreme" />
          <br />
          <br />

          <p>Izaberi pol:</p>
          <input type="radio" name="pol" id="male" value="muski" />
          <label htmlFor="male">Muški</label>
          <input type="radio" name="pol" id="female" value="zenski" />
          <label htmlFor="female">Ženski</label>
          <input type="radio" name="pol" id="other" value="drugo" />
          <label htmlFor="other">Drugo</label>
          <br />
          <br />

          <p>Izaberite vozilo:</p>
          <input type="checkbox" name="vozilo1" id="bike" value="bicikl" />
          <label htmlFor="bike">Bicikl</label>
          <br />
          <br />

          <input type="checkbox" name="vozilo2" id="car" value="automobil" />
          <label htmlFor="car">Automobil</label>
          <br />
          <br />

          <textarea name="komentar" placeholder="Vaš komentar..." cols="30" rows="10"></textarea>
          <br />
          <br />
        </fieldset>

        <input type="file" multiple />
        <input type="range" />
        <br />
        <br />

        <input type="reset" value="Poništi sva polja" />
        <input type="submit" value="Pošalji" />
      </form>
    </>
  );
}
