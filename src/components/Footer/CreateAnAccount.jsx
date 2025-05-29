export default function CreateAnAccount() {
  return (
    <>
      <form>
        <fieldset>
          <div className="fieldset">

            <h2>Create an account</h2>

            <label htmlFor="name">Name: </label>
            <input type="text" name="name" id="name" placeholder="Name" />

            <label htmlFor="lastName">Last Name: </label>
            <input type="text" name="lastName" id="lastName" placeholder="Last name" />

            <label htmlFor="eml">Email: </label>
            <input type="email" name="email" id="eml" />

            <label htmlFor="username">Username: </label>
            <input type="text" name="username" id="username" />

            <label htmlFor="pwd">Password: </label>
            <input type="password" name="password" id="pwd" />

            <label htmlFor="city">City: </label>
            <input type="text" name="city" id="city" />

            <label htmlFor="phone">Phone number: </label>
            <input type="text" name="phone" id="phone" />

            <label htmlFor="birthday">Birthday: </label>
            <input type="date" name="birthday" id="birthday" />

            <label htmlFor="vertical">Vertical: </label>
            <select name="vertical" id="vertical">
              <option disabled selected>
                Choose...
              </option>
              <option>Accessories</option>
              <option>Automotive</option>
              <option>Books/Media</option>
              <option>Education</option>
              <option>Gambling</option>
              <option>Sport & Fitness</option>
            </select>


            <p>Gender:</p>
            <div className="radioCheck">
              <input type="radio" name="gender" id="male" value="male" />
              <label htmlFor="male">Male</label>
              <input type="radio" name="gender" id="female" value="female" />
              <label htmlFor="female">Female</label>
              <input type="radio" name="gender" id="other" value="other" />
              <label htmlFor="other">Other</label>
            </div>

            <textarea name="comment" placeholder="Tell us about yourself..." cols="10" rows="5"></textarea>

            <input type="file" multiple />

            <input type="reset" value="Reset all fields" />
            <input type="submit" value="Send" />
          </div>
        </fieldset>
      </form>
    </>
  );
}
