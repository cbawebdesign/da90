import { DatabaseCollection, QueryDocumentSnapshot } from '@wizdm/connect/database/collection';
import { DatabaseDocument, DocumentData } from '@wizdm/connect/database/document';
import { map, tap, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { DistributedCounter } from '@wizdm/connect/database/counter';
import { Component, Input, HostBinding, ViewChild, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Observable, BehaviorSubject, merge } from 'rxjs';
import { DatabaseService } from '@wizdm/connect/database';
import { AuthService } from '@wizdm/connect/auth';
import { UserProfile, UserData } from 'app/utils/user';
import * as IronWeb from "@ironcorelabs/ironweb";
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import WebViewer from '@pdftron/webviewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

export interface PostData extends DocumentData {
  channel?: string;
  title?  : string;
  text?   : string; 
  photo?  : string;
  author? : string; 
  tags?   : string[]; 
};
const getJwt = async () => {
  const resp = await fetch(
    "https://us-central1-test7-8a527.cloudfunctions.net/generateJwt"
  );
  const text = await resp.text();
  return text;
};
@Component({
  selector: 'wm-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent  extends DatabaseDocument<PostData>  implements OnInit, AfterViewInit{
  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  @ViewChild('viewer') viewer: ElementRef;

  private _favorite$ = new BehaviorSubject<boolean>(false);  
  private likers: DatabaseCollection<any>;
  public page = 1;
 
  public pageLabel!: string;
  public favorite$: Observable<boolean>;
  public likes: DistributedCounter;
  public data: PostData;
  newdata: string;
  newtext: string;
  newdatab: string;
  renderText = true;
  originalSize = false;
  fitToPage = false;
  showAll = true;
  autoresize = false;
  showBorders = true;
  renderTextModes = [0, 1, 2];
  renderTextMode = 1;
  rotation = 0;
  zoom = 1;
  zoomScale = 'page-width';
  zoomScales = ['page-width', 'page-fit', 'page-height'];
  pdfQuery = '';
  totalPages: number;
  @ViewChild(PdfViewerComponent) private pdfComponent: PdfViewerComponent;
  wvInstance: any;
  /** Returns the current authenticated userId or 'unknown' */
  get me(): string { return this.auth.userId || 'unknown'; }
  /** Returns true thenever the place is favorite */
  get favorite(): boolean {  return this._favorite$.value; }


  /** Returns true whenever the current user is authenticated */
  get authenticated(): boolean { return this.authenticated; }
  ngOnInit() {
    this.wvDocumentLoadedHandler = this.wvDocumentLoadedHandler.bind(this);
  }

  async ngAfterViewInit(): Promise<void> {
        await IronWeb.initialize(getJwt, () => Promise.resolve("testpassword"));
    const encrypteddownloadurlbytes = new Uint8Array(atob(this.data.downloadURL).split("").map((c) => c.charCodeAt(0)));
    
    IronWeb.document.getDocumentIDFromBytes(encrypteddownloadurlbytes).then(
      (documentId) => IronWeb.document.decrypt(documentId, encrypteddownloadurlbytes)
    ).then(
      (decryptedpostdata) => {
        const decryptedtext = IronWeb.codec.utf8.fromBytes(decryptedpostdata.data);
        console.log(decryptedtext);
        this.newdata = decryptedtext;


     
   
  });
  
  const encryptedimage = new Uint8Array(atob(this.data.image).split("").map((c) => c.charCodeAt(0)));
    
  IronWeb.document.getDocumentIDFromBytes(encryptedimage).then(
    (documentId) => IronWeb.document.decrypt(documentId, encryptedimage)
  ).then(
    (decryptedpostdata) => {
      const decryptedtext = IronWeb.codec.utf8.fromBytes(decryptedpostdata.data);
      console.log(decryptedtext);
      this.newdatab = decryptedtext;
      
      
      const newtext = this.data.test;
      this.newtext = newtext;

});

  }

  

  saveit() {
    let url = this.newdata; 
    // window.open(url, '_blank');
    setTimeout(() => {
      console.log(url);
      window.open(url);
    }, 1000);

}
  constructor(db: DatabaseService, private auth: AuthService, private user: UserProfile<UserData>) { 
    super(db)
  }
//   async ngOnInit() {

//     await IronWeb.initialize(getJwt, () => Promise.resolve("testpassword"));
//     const encrypteddownloadurlbytes = new Uint8Array(atob(this.data.downloadURL).split("").map((c) => c.charCodeAt(0)));
    
//     IronWeb.document.getDocumentIDFromBytes(encrypteddownloadurlbytes).then(
//       (documentId) => IronWeb.document.decrypt(documentId, encrypteddownloadurlbytes)
//     ).then(
//       (decryptedpostdata) => {
//         const decryptedtext = IronWeb.codec.utf8.fromBytes(decryptedpostdata.data);
//         console.log(decryptedtext);
//         this.newdata = decryptedtext;


//   });
  


// }
  @Input() set post(snapshot: QueryDocumentSnapshot<PostData>) { 

    // Unwraps the document data and reference
    this.data = this.unwrap(snapshot);
    
    // Gets the likes distributed counter
    this.likes = this.counter('likes');
    
     // Gets the collection of likers
    this.likers = this.collection('likers');
    
    // Builds the favorite flag
    this.favorite$ = this.initFavorite();   
 }

  /** Builds the favorite flag Observable */
  private initFavorite(): Observable<boolean> {
    
    return merge(
      // Here the local copy 
      this._favorite$,
      // Resolves the user
      this.auth.user$.pipe( 
        // Gets the current user id
        map(user => !!user ? user.uid : 'unknown'),
        // Seeks for the user id within the collection of likers
        switchMap( me => this.isLikedBy(me) ),
        // Syncs the local copy
        tap( favorite => this._favorite$.next(favorite) ),
      )
      // Distinct changes to avoid unwanted flickering
    ).pipe( distinctUntilChanged() );
  }

  /** Checks if the specified userId is among the likers */
  private isLikedBy(userId: string): Observable<boolean> {

    // Searches among the collection of likers
    return this.likers
      // Matches for the document named upon the userId
      .stream( ref => ref.where(this.db.sentinelId, "==", userId ) )
      // Returns true if such document exists
      .pipe( map( docs => docs.length > 0 ),
       );
  }
  
  /** Toggles the favorite status */
  public toggleFavorite(event) {

    // Negates the curret favorite value
    const favorite = !this.favorite;

    // Updates the local favorite flag copy for improved reactivity
    this._favorite$.next(favorite);

    // Adds the user to the collection of likers....
    if(favorite) { this.likers.document(this.me).set({}); }
    // ...or removes it according to the request
    else { this.likers.document(this.me).delete(); }

    // Updates the likes counter accordingly
    this.likes.update( favorite ? 1 : -1 );
  }

  public get userImage(): string {
    return this.user.data.photo || '';
  }


  public get userFirstName(): string {
    let displayName = this.user?.data?.userName?.split('-').slice().pop();
    return displayName || '';
  }
  wvDocumentLoadedHandler(): void {
    // you can access docViewer object for low-level APIs
    // and access classes defined in the WebViewer iframe
    // const { Annotations, annotManager, docViewer } = this.wvInstance;
    // const rectangle = new Annotations.RectangleAnnotation();
    // rectangle.PageNumber = 1;
    // rectangle.X = 100;
    // rectangle.Y = 100;
    // rectangle.Width = 250;
    // rectangle.Height = 250;
    // rectangle.StrokeThickness = 5;
    // rectangle.Author = annotManager.getCurrentUser();
    // annotManager.addAnnotation(rectangle);
    // annotManager.drawAnnotations(rectangle.PageNumber);
    // see https://www.pdftron.com/api/web/WebViewer.html for the full list of low-level APIs
  }
}



function saveit() {
  throw new Error('Function not implemented.');
}

