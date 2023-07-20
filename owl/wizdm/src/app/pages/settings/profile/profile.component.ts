import { UserProfile, UserData } from 'app/utils/user';
import { Component } from '@angular/core';
import * as IronWeb from "@ironcorelabs/ironweb";

// initialize ironweb sdk
const getJwt = async () => {
  const resp = await fetch(
    "https://us-central1-test7-8a527.cloudfunctions.net/generateJwt"
  );
  const text = await resp.text();
  return text;
};

@Component({
  selector: 'wm-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(private user: UserProfile) {} 

  /** The new user data */
  private data: UserData = {};

  /* The current user profile data */
  get profile(): UserData {
    return this.user.data; 
  }
  set profile(data: Partial<UserData>) {

    // Combines the profile and preferences change into a new profile data object
    this.data = { ...this.data, ...data };
  }

  /** Updates the profile data */
  public async updateProfile() {
    await IronWeb.initialize(getJwt, () => Promise.resolve("testpassword"));

    // const encrypteduserName = await IronWeb.document.encrypt(IronWeb.codec.utf8.toBytes(this.data.userName));

    const encryptedlastName = await IronWeb.document.encrypt(IronWeb.codec.utf8.toBytes(this.data.lastName));
    // const encryptedname = await IronWeb.document.encrypt(IronWeb.codec.utf8.toBytes(this.data.name));
    const encryptedemail = await IronWeb.document.encrypt(IronWeb.codec.utf8.toBytes(this.data.email));

    // this.data.userName = btoa(String.fromCharCode.apply(null, encrypteduserName.document));

    // this.data.name = btoa(String.fromCharCode.apply(null, encryptedname.document));
    this.data.email = btoa(String.fromCharCode.apply(null, encryptedemail.document));

    this.data.lastName = btoa(String.fromCharCode.apply(null, encryptedlastName.document));

    return this.user.update(this.data);
  }

  /** Updates the profile photo */
  public updatePhoto(photo: string) {
    return this.user.update({ photo });
  }
}
