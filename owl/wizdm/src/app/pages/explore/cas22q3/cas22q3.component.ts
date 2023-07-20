import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { query, stream, onSnapshot, where, orderBy, limit, endBefore, docs, snap } from '@wizdm/connect/database/collection/operators';
import { DatabaseGroup, QueryDocumentSnapshot } from '@wizdm/connect/database/collection';
import { DatabaseService } from '@wizdm/connect/database';
import { PostData } from 'app/pages/explore/feed/post/post.component';
import { filter, take, map, expand, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService, User } from '@wizdm/connect/auth';

import { EmojiUtils } from '@wizdm/emoji/utils';
import { MediaObserver } from '@angular/flex-layout';
import { UserProfile, UserData } from 'app/utils/user';

@Component({
  selector: 'wm-cas22q3',
  templateUrl: './cas22q3.component.html',
  styleUrls: ['./cas22q3.component.scss']
})
export class cas22q3Component extends DatabaseGroup<PostData> {

  readonly posts$: Observable<QueryDocumentSnapshot<PostData>[]>;
  authenticated: any;

  // Media queries to switch between desktop/mobile views
  public get mobile(): boolean { return this.media.isActive('xs'); }
  public get desktop(): boolean { return !this.mobile; }

  pdfSrc = "https://firebasestorage.googleapis.com/v0/b/test7-8a527.appspot.com/o/posts%2FEn1XnCLPTCb56BLK4phP%2F2020.06.27%20--%20Digital%20Alpha%20June%202020%20LP%20Newsletter_Final%20%20-%20%20Read-Only.pdf?alt=media&token=235b5f56-30a8-483c-ab41-8a98bbbec11e";

  constructor (db: DatabaseService, private utils: EmojiUtils,
    private media: MediaObserver, public user: UserProfile<UserData>,) {

    super(db, 'posts');

    /** 
     * We de-structure the stream() operator gainng finer access control to the data coming from the database
     */
    this.posts$ = this.pipe(

      // Query for the public posts in descending order by creation date
      // where('users', 'array-contains', this.user.uid),
      where('users', 'array-contains', this.user.data.userName),

      where('categories', '==', 'CAS22Q3'),


      // Custom operator
      source => source.pipe(

        // Let's read up to 50 old posts
        limit(50), snap(),

        // Let's pre-pend the new posts
        expand(oldOnes => source.pipe(

          // Streams the latest document snapshot
          endBefore(oldOnes[0]), onSnapshot(this.db.zone),

          // Filters out not only the empty emissions but also the local ones (still having pending writes).
          filter(newOnes => newOnes.size > 0 && !newOnes.metadata.hasPendingWrites),

          // Extracts the document snapshots from the query snapshot and proceedes
          docs(), take(1),

          map(newOnes => newOnes.concat(oldOnes))
        ))
      )
    );
  }
  userEmail(arg0: string, arg1: string, userEmail: any): import("rxjs").OperatorFunction<import("../../../../../../connect/src/lib/database/collection").QueryRef<PostData>, import("../../../../../../connect/src/lib/database/collection").QueryRef<PostData>> {
    throw new Error('Method not implemented.');
  }

  // public get userId(): string {
  //   return this.authenticated ? this.user.uid : '';
  // }



  public get userImage(): string {
    return this.user.data.photo || '';
  }

  public get userFirstName(): string {
    let displayName = this.user?.data?.userName?.split('-').slice().pop();
    return displayName || '';
  }

  get profile(): UserData { return this.user.data; }


  // public get userEmail(): string{
  //   return this.userEmail || '';

  // }

}
