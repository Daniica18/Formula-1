export default function CreateAnAccount() {
  return (
    <>
      <form>
        <fieldset>
          <legend>Create an account</legend>

          <input type="text" name="name" id="name" placeholder="Name" />
          <br />
          <br />

          <input type="text" name="lastName" id="lastName" placeholder="Last name" />
          <br />
          <br />

          <label htmlFor="eml">Email: </label>
          <input type="email" name="email" id="eml" />
          <br />
          <br />

          <label htmlFor="username">Username: </label>
          <input type="text" name="username" id="username" />
          <br />
          <br />

          <label htmlFor="pwd">Password: </label>
          <input type="password" name="password" id="pwd" />
          <br />
          <br />

          <label htmlFor="city">City: </label>
          <input type="text" name="city" id="city" />
          <br />
          <br />

          <label htmlFor="phone">Phone number: </label>
          <input type="text" name="phone" id="phone" />
          <br />
          <br />

          <label htmlFor="birthday">Birthday: </label>
          <input type="date" name="birthday" id="birthday" />
          <input type="time" name="time" />
          <br />
          <br />

          <label htmlFor="qty">Years: </label>
          <input type="number" name="years" id="qty" min="18" max="70" />
          <br />
          <br />

          <label htmlFor="vertical">Vertical: </label>
          <select name="vertical" id="vertical">
            <option disabled selected>
              Choose...
            </option>
            <option>Accessories</option>
            <option>Art/Photo/Music</option>
            <option>Automotive</option>
            <option>Baby</option>
            <option>Beauty</option>
            <option>Books/Media</option>
            <option>Education</option>
            <option>Gambling</option>
            <option>Medical</option>
            <option>Pets</option>
            <option>Sport & Fitness</option>
            <option>Web services</option>
          </select>
          <br />
          <br />

          <p>Gender:</p>
          <input type="radio" name="gender" id="male" value="male" />
          <label htmlFor="male">Male</label>
          <input type="radio" name="gender" id="female" value="female" />
          <label htmlFor="female">Female</label>
          <input type="radio" name="gender" id="other" value="other" />
          <label htmlFor="other">Other</label>
          <br />
          <br />

          <textarea name="comment" placeholder="Add comment..." cols="20" rows="7"></textarea>
          <br />
          <br />

          <input type="file" multiple />

          <br />
          <br />

          <input type="reset" value="Reset all fields" />
          <input type="submit" value="Send" />
        </fieldset>
        <br />
        <br />
      </form>
    </>
  );
}
